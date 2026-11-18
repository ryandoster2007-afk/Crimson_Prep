(function () {
  "use strict";

  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");
  var CLUBS = window.CLUBS || [];
  var FEATURED = window.FEATURED || [];
  var CHAT_URL = "https://chatgpt.com/";
  var BEINVOLVED_URL = "https://beinvolved.indiana.edu/organization/";

  var FIELDS = [
    { id: "all", label: "All clubs" },
    { id: "priority", label: "Featured" },
    { id: "finance", label: "Finance & investing" },
    { id: "consulting", label: "Consulting" },
    { id: "marketing", label: "Marketing & sales" },
    { id: "fraternity", label: "Professional fraternities" },
    { id: "other", label: "Other" }
  ];

  var state = { query: "", field: "all" };

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function linkify(text) {
    return esc(text).replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, function (u) {
      return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + u + "</a>";
    });
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 3500);
  }

  function fieldOf(c) {
    var n = c.name.toLowerCase();
    if (FEATURED.indexOf(c.key) !== -1 && /alpha kappa psi|delta sigma pi|phi gamma nu|phi chi theta/.test(n)) return "fraternity";
    if (/fraternity|alpha kappa psi|delta sigma pi|pi sigma epsilon|rho epsilon|sigma eta pi|kappa theta pi|kappa omega|epsilon nu tau|mu beta lambda|phi gamma nu|kappa eta phi/.test(n)) return "fraternity";
    if (/consult|strategy|tamid|812|180 degrees/.test(n)) return "consulting";
    if (/invest|financ|capital|trading|banking|credit|equity|quant|asset|wealth|m&a|portfolio|distressed|fintech|ipo|actuar|real estate|scholars of finance|microfinance/.test(n)) return "finance";
    if (/market|sales|\bad club|advertis|brand|cosmetic/.test(n)) return "marketing";
    return "other";
  }

  function tracksFor(c) {
    var t = (window.CLUB_TRACKS || {})[c.key];
    if (t) return t;
    var f = fieldOf(c);
    if (f === "fraternity") return ["fraternity"];
    var n = c.name.toLowerCase();
    if (f === "consulting") return ["consulting"];
    if (/wealth/.test(n)) return ["pwm"];
    if (f === "finance") return ["investing"];
    if (f === "marketing") return ["marketing"];
    return ["business"];
  }

  function questionsFor(c) {
    var tr = tracksFor(c), technical = [], roleplay = [], labels = [];
    tr.forEach(function (id) {
      var t = window.TRACKS[id];
      if (!t) return;
      labels.push(t.label);
      (t.technical || []).slice(0, Math.ceil(7 / tr.length)).forEach(function (q) { technical.push(q); });
      (t.roleplay || []).forEach(function (q) { roleplay.push(q); });
    });
    return { behavioral: window.BEHAVIORAL.slice(0, 7), technical: technical.slice(0, 7), roleplay: roleplay, market: window.MARKET, labels: labels };
  }

  function findClub(key) {
    for (var i = 0; i < CLUBS.length; i++) if (CLUBS[i].key === key) return CLUBS[i];
    return null;
  }

  function buildScript(c) {
    var q = questionsFor(c);
    var isFinance = tracksFor(c).some(function (t) { return t === "ib" || t === "investing" || t === "pwm"; });
    function list(arr, n) { return arr.slice(0, n).map(function (x) { return "- " + x.q; }).join("\n"); }
    var lines = [];
    lines.push("You are a mock interviewer for \"" + c.name + "\" at Indiana University's Kelley School of Business. I am a first- or second-year student preparing for the real interview.");
    lines.push("");
    lines.push("About the club (from IU BeInvolved): " + (c.summary || c.description || "").replace(/\s+/g, " ").slice(0, 600));
    lines.push("");
    lines.push("Run a realistic mock interview using these rules:");
    lines.push("- This is a spoken conversation. Keep each of your turns under 3 sentences.");
    lines.push("- Ask ONE question at a time and wait for my answer. Never list several questions.");
    lines.push("- Start with a short greeting, then ask me to tell you about myself.");
    lines.push("- Mix behavioral and technical questions. Use the question bank below, and invent natural follow-ups based on my answers.");
    lines.push("- If my answer is vague or wrong, push back once like a real interviewer, then move on.");
    if (isFinance) lines.push("- Include 2 market-awareness questions. For market numbers, ask me what I think the current values are or use live information if you have it. Grade my reasoning, not memorized values.");
    if (q.roleplay.length) lines.push("- Include one role-play where you play a client and I play the advisor.");
    lines.push("- After about 8 questions, tell me the interview is over and give feedback: scores out of 5 for structure (STAR method), specificity, technical accuracy, clarity, and confidence; my strongest answer; my weakest answer with a better sample answer; and 3 things to practice.");
    lines.push("- If I say \"hint\" or \"pause\", help me before continuing.");
    lines.push("- These are practice questions based on typical interviews. Do not claim to know this club's actual questions.");
    lines.push("");
    lines.push("Question bank:");
    lines.push("Behavioral:");
    lines.push(list(q.behavioral, 8));
    if (isFinance) { lines.push("Market questions:"); lines.push(list(q.market, 10)); }
    else { lines.push("Technical (" + q.labels.join(" / ") + "):"); lines.push(list(q.technical, 12)); }
    if (q.roleplay.length) { lines.push("Role-play:"); lines.push(list(q.roleplay, 3)); }
    lines.push("");
    lines.push("Begin the interview now.");
    return lines.join("\n");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); } finally { document.body.removeChild(ta); }
    });
  }

  // ---------- views ----------
  function viewHome() {
    var html = '<section class="hero"><h1>Get Ready for Your Club Interviews</h1>' +
      "<p>Browse Kelley student organizations, see likely interview questions, find resume templates, and practice a mock interview with ChatGPT. Free, and no sign-in.</p></section>" +
      '<input class="search" id="search" type="search" placeholder="Search clubs, e.g. consulting, capital markets, fraternity" aria-label="Search clubs" value="' + esc(state.query) + '">' +
      '<div class="chips" id="chips"></div><div class="count" id="count"></div><div class="grid" id="grid"></div>';
    app.innerHTML = html;

    var chips = document.getElementById("chips");
    FIELDS.forEach(function (f) {
      var b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.textContent = f.label;
      b.setAttribute("aria-pressed", state.field === f.id ? "true" : "false");
      b.onclick = function () { state.field = f.id; renderGrid(); updateChips(); };
      b.dataset.id = f.id;
      chips.appendChild(b);
    });
    function updateChips() {
      Array.prototype.forEach.call(chips.children, function (b) {
        b.setAttribute("aria-pressed", b.dataset.id === state.field ? "true" : "false");
      });
    }
    document.getElementById("search").addEventListener("input", function (e) { state.query = e.target.value; renderGrid(); });
    renderGrid();
  }

  function renderGrid() {
    var q = state.query.trim().toLowerCase();
    var list = CLUBS.filter(function (c) {
      var f = fieldOf(c);
      if (state.field === "priority" && FEATURED.indexOf(c.key) === -1) return false;
      if (state.field !== "all" && state.field !== "priority" && f !== state.field) return false;
      if (!q) return true;
      return (c.name + " " + (c.shortName || "") + " " + c.summary).toLowerCase().indexOf(q) !== -1;
    });
    // featured first, then alphabetical
    list.sort(function (a, b) {
      var fa = FEATURED.indexOf(a.key) !== -1 ? 0 : 1, fb = FEATURED.indexOf(b.key) !== -1 ? 0 : 1;
      return fa - fb || a.name.localeCompare(b.name);
    });
    document.getElementById("count").textContent = list.length + " club" + (list.length === 1 ? "" : "s");
    var grid = document.getElementById("grid");
    grid.innerHTML = list.length ? list.map(function (c) {
      return '<a class="card" href="#/club/' + encodeURIComponent(c.key) + '"><h3>' + esc(c.name) + "</h3><p>" + esc(c.summary || "") + "</p></a>";
    }).join("") : "<p>No clubs match. Try a different word.</p>";
  }

  function qList(items, type) {
    return items.map(function (x) {
      return "<details><summary><span class=\"qtype\">" + type + "</span>" + esc(x.q) + "</summary><p>" + esc(x.tip) + "</p></details>";
    }).join("");
  }

  function viewClub(key) {
    var c = findClub(key);
    if (!c) { app.innerHTML = '<a class="back" href="#/clubs">&larr; All clubs</a><h1>Club Not Found</h1><p>Try going back to the <a href="#/clubs">club list</a>.</p>'; return; }
    var q = questionsFor(c);
    var isFeatured = FEATURED.indexOf(c.key) !== -1;
    var showMarket = tracksFor(c).some(function (t) { return t === "ib" || t === "investing" || t === "pwm"; });
    var html = '<a class="back" href="#/clubs">&larr; All clubs</a>' +
      "<h1>" + esc(c.name) + "</h1>" +
      '<p class="meta">Source: IU BeInvolved, fetched ' + esc(window.CLUBS_FETCHED_AT || "") + ' &middot; <a href="' + BEINVOLVED_URL + encodeURIComponent(c.key) + '" target="_blank" rel="noopener">View on BeInvolved</a></p>' +
      '<div class="panel"><h2 style="margin-top:0">About This Club</h2><div class="desc">' + linkify(c.description || c.summary || "No description on BeInvolved.") + "</div></div>" +
      '<div class="panel crimson" id="practice"><h2 style="margin-top:0">Practice with ChatGPT</h2>' +
      "<p>Get a mock interview with spoken questions and scored feedback, free. The script is tailored to this club.</p>" +
      '<button class="btn" id="open-chat" type="button">Copy script &amp; open ChatGPT</button>' +
      '<button class="btn secondary" id="copy" type="button">Copy script</button>' +
      '<button class="btn secondary" id="download" type="button">Download .txt</button>' +
      '<details><summary>New to ChatGPT? Step-by-step</summary><ol class="steps">' +
      "<li>Open <a href=\"" + CHAT_URL + '" target="_blank" rel="noopener">chatgpt.com</a>. Signing in with a free account works best for voice and saved chats. Free plans have limits, so voice may cut off.</li>' +
      "<li>Start a new chat (\"New chat\" on a computer, or the pencil icon on a phone).</li>" +
      "<li>Paste the script into the message box and press Enter. Don't edit it.</li>" +
      "<li>The AI will greet you and ask the first question. You can type your answers.</li>" +
      "<li>To talk instead, tap the voice icon next to the message box and allow microphone access. Tap again to end voice mode.</li>" +
      "<li>After about 8 questions you get scores and tips. Say \"ask me 3 harder questions\" to keep going.</li>" +
      "<li>No voice icon? Your plan or app may not offer voice. Just type. If the AI rambles, say \"keep it shorter.\"</li>" +
      "<li>Privacy: what you say goes to OpenAI under your own account. Don't share your student ID or phone number.</li>" +
      '</ol></details><details><summary>Preview the script</summary><textarea class="script" id="script" readonly></textarea></details></div>' +
      "<h2>Likely Interview Questions</h2>" +
      '<div class="banner">Likely questions based on typical interviews for this kind of club (' + esc(q.labels.join(" / ")) + '). <strong>Not official.</strong> Tap a question for a tip.' +
      (isFeatured ? " Technical themes reflect a student's recollection of what clubs like this ask." : "") + "</div>" +
      '<div class="panel"><h3>Technical</h3>' + (showMarket ? qList(q.market, "Market") +
        '<p class="banner">Market numbers change daily. Check these the morning of your interview and write down the current values:</p><ul>' +
        window.MARKET_SOURCES.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>"; }).join("") +
        "</ul>" : qList(q.technical, "Technical")) + "</div>" +
      (q.roleplay.length ? '<div class="panel"><h3>Role-play</h3>' + qList(q.roleplay, "Role-play") + "</div>" : "") +
      '<div class="panel"><h3>Behavioral</h3>' + qList(q.behavioral, "Behavioral") + "</div>" +
      '<div class="panel"><h3>Keep Preparing</h3><p>Build a tight story with the <a href="#/tools/star">STAR Answer Builder</a>, study the <a href="#/tools/cheatsheets">Cheat Sheets</a>, and run your <a href="#/resumes/checker">resume through the checker</a>. Want to talk to a member first? Use the <a href="#/outreach/' + encodeURIComponent(c.key) + '">Coffee Chat Email template</a>.</p></div>' +
      '<p class="meta">Know something we\'re missing about this club? Tell the site owner so it can be added.</p>';
    app.innerHTML = html;

    var script = buildScript(c);
    document.getElementById("script").value = script;
    document.getElementById("copy").onclick = function () {
      copyText(script).then(function () { toast("Script copied. Paste it into ChatGPT."); }, function () { toast("Couldn't copy. Open \"Preview the script\" and copy it by hand."); });
    };
    document.getElementById("open-chat").onclick = function () {
      copyText(script).then(function () { toast("Script copied. Paste it into the new ChatGPT chat."); }, function () { toast("Couldn't copy. Use \"Preview the script\" to copy by hand."); });
      window.open(CHAT_URL, "_blank", "noopener");
    };
    document.getElementById("download").onclick = function () {
      var blob = new Blob([script], { type: "text/plain" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = c.key + "-mock-interview-script.txt";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    };
  }

  function viewResumes() {
    app.innerHTML = '<h1>Resume Template</h1><p class="hero" style="color:var(--muted)">Start here for your club applications. Clubs can ask for their own format, so confirm with the club before you submit.</p>' +
      '<div class="banner"><strong>Edit your resume in Microsoft Word, not Google Docs.</strong> Google Docs often changes spacing and margins when you export. Download the Word version, edit it in Word, then save as a PDF to submit.</div>' +
      '<div class="grid single">' + window.RESUMES.map(function (r) {
        return '<div class="card"><h3>' + esc(r.title) + "</h3><p style=\"-webkit-line-clamp:unset\">" + esc(r.for) + "</p>" +
          '<a class="btn" href="' + esc(r.pdf) + '" target="_blank" rel="noopener">View PDF</a>' +
          (r.docx ? '<a class="btn secondary" href="' + esc(r.docx) + '" download>Download Word</a>' : "") + "</div>";
      }).join("") + "</div>" +
      '<div class="panel crimson"><h3>Check Your Resume</h3><p>Upload your resume as a PDF and get instant feedback on layout, verbs, numbers, and common mistakes. It stays on your computer.</p><a class="btn" href="#/resumes/checker">Open Resume Checker</a></div>' +
      "<h2>Resume Rules</h2>" + window.RESUME_RULES.map(function (g) {
        return '<div class="panel"><h3>' + esc(g.group) + "</h3><ul>" + g.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
      }).join("");
  }

  function viewAbout() {
    app.innerHTML = "<h1>About Crimson Prep</h1>" +
      '<div class="panel"><p>Crimson Prep is a free, unofficial student project for incoming IU business students who aren\'t sure how club recruiting and interviews work.</p>' +
      "<ul><li><strong>Club info</strong> comes from IU BeInvolved, the primary source. Always confirm deadlines and requirements with the club.</li>" +
      "<li><strong>Practice questions</strong> are guesses based on typical interviews for each type of club, plus a student's own recollection. They are not official and no club has endorsed them.</li>" +
      "<li><strong>The resume template</strong> is a student-built format with placeholder text. Kelley Undergraduate Career Services can review your resume and has its own templates.</li>" +
      "<li><strong>Mock interviews</strong> happen in ChatGPT under your own account, so this site never hears or stores your voice.</li></ul>" +
      "<p>Kelley Undergraduate Career Services also offers mock interviews and resume reviews with coaches. Use them too.</p>" +
      "<p>This site is not affiliated with Indiana University or the Kelley School of Business.</p></div>";
  }

  // ---------- cover (first page) ----------
  function viewCover() {
    app.innerHTML = '<section class="cover" aria-labelledby="cover-title">' +
      '<h1 id="cover-title">Crimson<span>Prep</span></h1>' +
      "<p class=\"cover-lede\"><span>Your guide to Kelley club interviews and resumes.</span></p>" +
      '<nav class="cover-nav" aria-label="Pages">' +
      '<a class="btn" href="#/clubs">Browse Clubs</a>' +
      '<a class="btn secondary" href="#/match">Club Matcher</a>' +
      '<a class="btn secondary" href="#/tools">Prep Tools</a>' +
      '<a class="btn secondary" href="#/resumes">Resumes</a>' +
      '<a class="btn secondary" href="#/about">About</a>' +
      "</nav></section>";
  }

  // ---------- router ----------
  function route() {
    var h = location.hash || "#/";
    var parts = h.replace(/^#\/?/, "").split("/");
    var page = parts[0] || "cover";
    var onCover = page === "cover";
    document.body.classList.toggle("is-cover", onCover);
    app.classList.toggle("cover-mode", onCover);
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) {
      a.classList.toggle("active", a.dataset.nav === (page === "club" ? "clubs" : page));
    });
    if (onCover) viewCover();
    else if (page === "clubs") viewHome();
    else if (page === "club" && parts[1]) viewClub(decodeURIComponent(parts[1]));
    else if (page === "resumes" && parts[1] === "checker") window.VIEWS.checker();
    else if (page === "resumes") viewResumes();
    else if (window.VIEWS && window.VIEWS[page]) window.VIEWS[page](parts.slice(1));
    else if (page === "about") viewAbout();
    else viewHome();
    window.scrollTo(0, 0);
    document.title = page === "club" && findClub(decodeURIComponent(parts[1] || "")) ? findClub(decodeURIComponent(parts[1])).name + " | Crimson Prep" : "Crimson Prep";
  }

  window.CP = { esc: esc, toast: toast, copyText: copyText, CLUBS: CLUBS };
  window.addEventListener("hashchange", route);
  route();
})();
