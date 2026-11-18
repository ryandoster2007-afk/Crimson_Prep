// Extra tools: Club Matcher, STAR Builder, Cheat Sheets, Resume Checker.
// Loaded before app.js. app.js sets window.CP (helpers) before the first route.
(function () {
  "use strict";
  var views = (window.VIEWS = {});
  function CP() { return window.CP; }
  function esc(s) { return CP().esc(s); }
  var app = function () { return document.getElementById("app"); };

  // ---------- safe storage ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
  }

  // =====================================================
  // TOOLS HUB
  // =====================================================
  window.TOOL_LIST = [
    { href: "#/match", title: "Club Matcher", text: "Answer 5 quick questions and get a shortlist of clubs that fit." },
    { href: "#/tools/star", title: "STAR Answer Builder", text: "Turn a story into a tight 60–90 second answer and save it to your story bank." },
    { href: "#/tools/cheatsheets", title: "Cheat Sheets", text: "DCF, three statements, valuation, macro, consulting cases, and SIE basics." },
    { href: "#/resumes/checker", title: "Resume Checker", text: "Upload your resume PDF and get feedback on layout and wording. Nothing leaves your browser." }
  ];

  views.tools = function (parts) {
    if (parts[0] === "star") return views.star();
    if (parts[0] === "cheatsheets") return views.cheatsheets(parts.slice(1));
    app().innerHTML = "<h1>Prep Tools</h1><p class=\"lead\">Everything runs in your browser. Nothing is uploaded or stored on a server.</p><div class=\"grid\">" +
      window.TOOL_LIST.map(function (t) {
        return '<a class="card" href="' + t.href + '"><h3>' + esc(t.title) + "</h3><p style=\"-webkit-line-clamp:unset\">" + esc(t.text) + "</p></a>";
      }).join("") + "</div>";
  };

  // =====================================================
  // CHEAT SHEETS
  // =====================================================
  views.cheatsheets = function (parts) {
    var sheets = window.CHEATSHEETS || [];
    var active = (parts && parts[0]) || sheets[0].id;
    var sheet = sheets.filter(function (s) { return s.id === active; })[0] || sheets[0];
    var html = '<a class="back" href="#/tools">&larr; Prep Tools</a><h1>Cheat Sheets</h1>' +
      '<div class="banner">General study notes, not official club material. Confirm exam details on official sites.</div>' +
      '<div class="chips" id="sheet-tabs">' + sheets.map(function (s) {
        return '<a class="chip" href="#/tools/cheatsheets/' + s.id + '" aria-pressed="' + (s.id === sheet.id) + '" style="text-decoration:none">' + esc(s.title) + "</a>";
      }).join("") + "</div>" +
      "<h2 style=\"margin-top:0\">" + esc(sheet.title) + '</h2><p class="lead">' + esc(sheet.tagline) + "</p>" +
      sheet.sections.map(function (sec) {
        var body = sec.steps ? "<ol class=\"steps\">" + sec.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>"
          : "<ul>" + (sec.items || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
        return '<div class="panel"><h3>' + esc(sec.h) + "</h3>" + body + "</div>";
      }).join("");
    if (sheet.id === "macro") html += marketSnapshotHTML();
    app().innerHTML = html;
    if (sheet.id === "macro") wireSnapshot();
  };

  var SNAP_FIELDS = [
    ["fed", "Fed funds target range", "e.g. 4.00%–4.25%"],
    ["ten", "10-year Treasury yield", "e.g. 4.1%"],
    ["spx", "S&P 500 level and year-to-date move", "e.g. 6,000, up 8%"],
    ["cpi", "Latest CPI inflation (year over year)", "e.g. 3.0%"],
    ["jobs", "Unemployment rate", "e.g. 4.2%"],
    ["trend", "One trend you're following (one sentence)", "e.g. AI spending and its effect on chips"],
    ["head", "A headline from this week and what it means", ""]
  ];
  function marketSnapshotHTML() {
    return '<div class="panel crimson"><h3>My Market Snapshot</h3><p class="meta">Fill this in the morning of your interview using the links on any finance club page. It saves in this browser only.</p>' +
      SNAP_FIELDS.map(function (f) {
        return '<label class="field"><span>' + esc(f[1]) + '</span><input type="text" id="snap-' + f[0] + '" placeholder="' + esc(f[2]) + '"></label>';
      }).join("") +
      '<p class="meta" id="snap-date"></p><button class="btn secondary" type="button" id="snap-clear">Clear snapshot</button></div>';
  }
  function wireSnapshot() {
    var data = load("cp_snapshot", {});
    SNAP_FIELDS.forEach(function (f) {
      var el = document.getElementById("snap-" + f[0]);
      el.value = data[f[0]] || "";
      el.addEventListener("input", function () {
        data[f[0]] = el.value; data._at = new Date().toLocaleString(); save("cp_snapshot", data);
        document.getElementById("snap-date").textContent = "Saved " + data._at;
      });
    });
    if (data._at) document.getElementById("snap-date").textContent = "Last saved " + data._at;
    document.getElementById("snap-clear").onclick = function () {
      data = {}; save("cp_snapshot", data);
      SNAP_FIELDS.forEach(function (f) { document.getElementById("snap-" + f[0]).value = ""; });
      document.getElementById("snap-date").textContent = "Cleared.";
    };
  }

  // =====================================================
  // STAR BUILDER
  // =====================================================
  var STAR_PROMPTS = [
    "Tell me about a time you led a team.",
    "Tell me about a time you failed.",
    "Describe a time you dealt with conflict.",
    "Tell me about a time you worked under pressure.",
    "Tell me about a time you took initiative.",
    "Tell me about a time you learned something quickly.",
    "Why do you want to join this club? (tell a story)"
  ];
  function words(s) { var m = (s || "").trim().match(/\S+/g); return m ? m.length : 0; }
  function sentence(s) {
    s = (s || "").trim().replace(/\s+/g, " ");
    if (!s) return "";
    return /[.!?]$/.test(s) ? s : s + ".";
  }

  views.star = function () {
    var draft = load("cp_star_draft", { prompt: STAR_PROMPTS[0], s: "", t: "", a: "", r: "", title: "" });
    var stories = load("cp_stories", []);
    function field(id, label, hint, rows) {
      return '<label class="field"><span>' + label + ' <em class="meta">' + hint + '</em></span><textarea id="star-' + id + '" rows="' + rows + '"></textarea></label>';
    }
    app().innerHTML = '<a class="back" href="#/tools">&larr; Prep Tools</a><h1>STAR Answer Builder</h1>' +
      '<p class="lead">Fill in the four parts of a story. The builder joins them into an answer, times it, and flags common problems.</p>' +
      '<div class="panel"><label class="field"><span>Question</span><select id="star-prompt">' +
      STAR_PROMPTS.map(function (p) { return "<option>" + esc(p) + "</option>"; }).join("") + "</select></label>" +
      field("s", "Situation", "Set the scene in 1–2 sentences.", 3) +
      field("t", "Task", "What was your responsibility or goal?", 2) +
      field("a", "Action", "What did YOU do? Use \"I.\" This should be the longest part.", 5) +
      field("r", "Result", "What happened? Add a number if you can.", 3) +
      '<label class="field"><span>Story name <em class="meta">(to save it)</em></span><input type="text" id="star-title" placeholder="e.g. Fundraiser at my high school"></label></div>' +
      '<div class="panel crimson"><h3>Your Answer</h3><div id="star-out" class="answer"></div><div id="star-stats" class="meta"></div>' +
      '<ul id="star-checks" class="checks"></ul>' +
      '<button class="btn" type="button" id="star-copy">Copy answer</button><button class="btn secondary" type="button" id="star-save">Save to story bank</button></div>' +
      '<h2>Story Bank</h2><div id="star-bank"></div>';

    var ids = ["s", "t", "a", "r"];
    function read() {
      return { prompt: document.getElementById("star-prompt").value, s: val("s"), t: val("t"), a: val("a"), r: val("r"), title: document.getElementById("star-title").value };
    }
    function val(id) { return document.getElementById("star-" + id).value; }
    function render() {
      var d = read(); save("cp_star_draft", d);
      var text = [d.s, d.t, d.a, d.r].map(sentence).filter(Boolean).join(" ");
      var out = document.getElementById("star-out");
      out.textContent = text || "Start typing and your answer appears here.";
      var wc = words(text), secs = Math.round(wc / 140 * 60);
      document.getElementById("star-stats").textContent = wc + " words · about " + Math.floor(secs / 60) + ":" + ("0" + (secs % 60)).slice(-2) + " spoken (aim for 60–90 seconds)";
      var checks = [];
      var wa = words(d.a), ws = words(d.s), wr = words(d.r);
      function add(ok, good, bad) { checks.push([ok, ok ? good : bad]); }
      if (wc > 0) {
        add(wc >= 120 && wc <= 230, "Length is in the sweet spot.", wc < 120 ? "A bit short. Add detail to the Action." : "Running long. Trim the Situation and Task.");
        add(wa >= wc * 0.4, "Action is the biggest part of the story.", "Spend more words on what you did. Interviewers care most about your actions.");
        add(ws <= wc * 0.3, "Situation is brief.", "Shorten the setup. Get to your actions faster.");
        var weI = (d.a.match(/\b(I|I'm|I've|I'd|my|me)\b/gi) || []).length, weWe = (d.a.match(/\b(we|we're|our|us)\b/gi) || []).length;
        add(weI >= weWe, "Action focuses on what you did.", "Too many 'we' statements. Say what YOU personally did.");
        add(/\d/.test(d.r), "Result includes a number.", "Add a number to the Result (people, dollars, percent, time saved).");
        add(wr >= 8, "Result is clear.", "Say more about the outcome and what changed.");
        add(!/\bum\b|\blike,\b|kind of|sort of/i.test(text), "No filler phrases spotted.", "Cut filler like 'kind of' and 'sort of'.");
      }
      document.getElementById("star-checks").innerHTML = checks.map(function (c) {
        return '<li class="' + (c[0] ? "ok" : "warn") + '">' + esc(c[1]) + "</li>";
      }).join("");
      return text;
    }
    function fill(d) {
      document.getElementById("star-prompt").value = STAR_PROMPTS.indexOf(d.prompt) > -1 ? d.prompt : STAR_PROMPTS[0];
      ids.forEach(function (i) { document.getElementById("star-" + i).value = d[i] || ""; });
      document.getElementById("star-title").value = d.title || "";
    }
    function renderBank() {
      var el = document.getElementById("star-bank");
      el.innerHTML = stories.length ? stories.map(function (s, i) {
        return '<div class="panel"><strong>' + esc(s.title || "Untitled story") + '</strong> <span class="meta">· ' + esc(s.prompt) + "</span>" +
          '<div><button class="btn secondary" type="button" data-load="' + i + '">Open</button><button class="btn secondary" type="button" data-del="' + i + '">Delete</button></div></div>';
      }).join("") : '<p class="meta">No saved stories yet. Save one and reuse it for several questions.</p>';
    }
    fill(draft); render(); renderBank();
    app().addEventListener("input", function (e) { if (e.target.id && e.target.id.indexOf("star-") === 0) render(); });
    document.getElementById("star-prompt").addEventListener("change", render);
    document.getElementById("star-copy").onclick = function () {
      var t = render();
      CP().copyText(t).then(function () { CP().toast("Answer copied."); }, function () { CP().toast("Couldn't copy. Select the text and copy it by hand."); });
    };
    document.getElementById("star-save").onclick = function () {
      var d = read();
      if (!words([d.s, d.t, d.a, d.r].join(" "))) { CP().toast("Write something first."); return; }
      if (!d.title.trim()) d.title = "Story " + (stories.length + 1);
      stories.push(d);
      if (save("cp_stories", stories)) CP().toast("Saved to your story bank in this browser."); else CP().toast("Couldn't save. Your browser may block storage.");
      document.getElementById("star-title").value = d.title; renderBank();
    };
    document.getElementById("star-bank").addEventListener("click", function (e) {
      var l = e.target.getAttribute("data-load"), x = e.target.getAttribute("data-del");
      if (l !== null) { fill(stories[+l]); render(); window.scrollTo(0, 0); }
      if (x !== null) { stories.splice(+x, 1); save("cp_stories", stories); renderBank(); }
    });
  };

  // =====================================================
  // CLUB MATCHER
  // =====================================================
  var QUIZ = [
    { id: "career", q: "What kind of career interests you?", multi: true, max: 3, opts: [
      ["ib", "Investment banking and capital markets", /investment bank|capital markets|m&a|merger|private equity|sales (&|and) trading|equity research|restructuring|valuation|financial model/],
      ["inv", "Investing and asset management", /invest|portfolio|asset management|hedge|\bstocks?\b|quantitative|\bcredit\b|\bipo\b|trading|equity/],
      ["cons", "Consulting and strategy", /consult|strategy group|case (competition|stud|interview)|management consulting/],
      ["mkt", "Marketing, sales, and brand", /marketing|sales|brand|advertis|cosmetic|entertainment|sports/],
      ["wm", "Wealth management and financial services", /wealth|financial planning|personal finance|financial services/],
      ["acct", "Accounting, tax, and analytics", /accounting|audit|actuar|tax|analytics|data/],
      ["re", "Real estate", /real estate/],
      ["ent", "Entrepreneurship, tech, and AI", /entrepreneur|startup|venture|innovation|fintech|blockchain|technology|\bai\b|\bllm/],
      ["ops", "Supply chain and operations", /supply chain|operations|logistics/]
    ] },
    { id: "goal", q: "What do you want most from a club?", multi: true, max: 2, opts: [
      ["tech", "Technical skills and training", /technical|workshop|financial model|bootcamp|curriculum|train|skills/],
      ["net", "Networking, alumni, and mentors", /network|alumni|mentor|professional|speaker/],
      ["lead", "Leadership roles", /leader|officer|executive|board/],
      ["proj", "Hands-on projects and real clients", /hands-on|project|client|real-world|\bfund\b|portfolio|case competition/],
      ["comm", "Community and friends", /community|social|family|brotherhood|inclusive|support|fraternity/]
    ] },
    { id: "year", q: "What year are you?", multi: false, opts: [
      ["fr", "Freshman", /freshm|first-year|first year|all majors|all years|accelerator|no experience/],
      ["so", "Sophomore or later", null]
    ] },
    { id: "apply", q: "How do you feel about competitive applications?", multi: false, opts: [
      ["comp", "Bring it on. I'll go for selective clubs.", "featured"],
      ["open", "I'd rather join something open to everyone.", /no (need|application|experience)|open to (all|anyone|everyone)|anyone|all students|all majors|welcome/],
      ["any", "No preference.", null]
    ] },
    { id: "who", q: "Any communities you want to connect with? (optional)", multi: true, max: 3, opts: [
      ["women", "Women in business", /women|female/],
      ["black", "Black students", /black|african/],
      ["latino", "Hispanic and Latino students", /hispanic|latino|latina/],
      ["asian", "Asian and South Asian students", /asian|indian|korean|chinese/],
      ["intl", "International students", /international/]
    ] }
  ];

  views.match = function () {
    var answers = load("cp_quiz", {});
    var step = 0;
    var box = app();
    function draw() {
      if (step >= QUIZ.length) return results();
      var q = QUIZ[step];
      var sel = answers[q.id] || [];
      box.innerHTML = '<h1>Club Matcher</h1><div class="progress" aria-label="Progress"><span style="width:' + Math.round(step / QUIZ.length * 100) + '%"></span></div>' +
        '<p class="meta">Question ' + (step + 1) + " of " + QUIZ.length + "</p>" +
        '<div class="panel"><h2 style="margin-top:0">' + esc(q.q) + "</h2>" + (q.multi ? '<p class="meta">Pick up to ' + q.max + ".</p>" : "") +
        '<div class="opts">' + q.opts.map(function (o) {
          return '<label class="opt"><input type="' + (q.multi ? "checkbox" : "radio") + '" name="q" value="' + o[0] + '"' + (sel.indexOf(o[0]) > -1 ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>";
        }).join("") + "</div></div>" +
        (step > 0 ? '<button class="btn secondary" type="button" id="q-back">Back</button>' : "") +
        '<button class="btn" type="button" id="q-next">' + (step === QUIZ.length - 1 ? "See my matches" : "Next") + "</button>";
      box.querySelector(".opts").addEventListener("change", function (e) {
        var cur = [].slice.call(box.querySelectorAll("input:checked")).map(function (i) { return i.value; });
        if (q.multi && cur.length > q.max) { e.target.checked = false; cur = cur.filter(function (v) { return v !== e.target.value; }); CP().toast("You can pick up to " + q.max + "."); }
        answers[q.id] = cur; save("cp_quiz", answers);
      });
      document.getElementById("q-next").onclick = function () { step++; draw(); window.scrollTo(0, 0); };
      var b = document.getElementById("q-back"); if (b) b.onclick = function () { step--; draw(); };
    }
    function results() {
      var clubs = CP().CLUBS, featured = window.FEATURED || [];
      var scored = clubs.map(function (c) {
        var text = (c.name + " " + c.summary + " " + c.description).toLowerCase();
        var score = 0, why = [];
        QUIZ.forEach(function (q) {
          (answers[q.id] || []).forEach(function (id) {
            var o = q.opts.filter(function (x) { return x[0] === id; })[0];
            if (!o || !o[2]) return;
            if (o[2] === "featured") { if (featured.indexOf(c.key) > -1) { score += 1; why.push("Selective, popular club"); } return; }
            if (o[2].test(text)) {
              var nameHit = o[2].test(c.name.toLowerCase());
              var w = q.id === "career" ? (nameHit ? 4 : 3) : q.id === "who" ? 4 : 2;
              score += w; why.push(o[1]);
            }
          });
        });
        return { c: c, score: score, why: why };
      }).filter(function (r) { return r.score > 0; }).sort(function (a, b) { return b.score - a.score || a.c.name.localeCompare(b.c.name); }).slice(0, 8);
      box.innerHTML = '<h1>Your Matches</h1><p class="lead">Ranked by how well each club\'s BeInvolved description fits your answers. This is a starting point, not a guarantee.</p>' +
        (scored.length ? '<div class="grid">' + scored.map(function (r, i) {
          return '<a class="card" href="#/club/' + encodeURIComponent(r.c.key) + '"><h3>' + (i + 1) + ". " + esc(r.c.name) + "</h3><p style=\"-webkit-line-clamp:3\">" + esc(r.c.summary) + "</p>" +
            '<span class="meta">Matches: ' + esc(r.why.slice(0, 3).join(" · ")) + "</span></a>";
        }).join("") + "</div>" : "<p>No strong matches. Try picking different options or browse all clubs.</p>") +
        '<p><button class="btn secondary" type="button" id="q-redo">Retake</button><a class="btn" href="#/clubs">Browse all clubs</a></p>';
      document.getElementById("q-redo").onclick = function () { answers = {}; save("cp_quiz", answers); step = 0; draw(); };
    }
    draw();
  };

  // =====================================================
  // RESUME CHECKER
  // =====================================================
  var VERBS = ("achieved analyzed built coached collaborated completed conducted coordinated created delivered designed developed directed drove earned edited established evaluated executed expanded facilitated founded generated grew guided identified implemented improved increased initiated launched led managed mentored negotiated organized oversaw owned partnered planned presented produced promoted raised recruited reduced researched resolved revamped saved scheduled secured served shaped simplified sold spearheaded streamlined strengthened supervised supported taught tracked trained translated unified updated wrote assisted advised audited balanced budgeted calculated captured cataloged chaired compiled consolidated contributed curated customized debated demonstrated deployed diagnosed documented drafted enhanced forecasted formulated fundraised handled hosted illustrated integrated interviewed investigated maintained modeled monitored motivated operated optimized orchestrated performed piloted prepared prioritized programmed proposed reviewed revised sourced standardized structured surveyed tested transformed tutored validated visualized volunteered won").split(" ");
  var WEAK = [/responsible for/i, /duties (included|were)/i, /helped (with|to)/i, /worked on/i, /assisted with/i, /participated in/i, /involved in/i, /various/i, /etc\.?/i, /team player/i, /hard.?working/i, /detail.?oriented/i];

  views.checker = function () {
    app().innerHTML = '<a class="back" href="#/resumes">&larr; Resumes</a><h1>Resume Checker</h1>' +
      '<p class="lead">Upload your resume as a PDF. It\'s read inside your browser and never uploaded anywhere.</p>' +
      '<div class="banner">Save your Word resume as a PDF first (File &rarr; Save As &rarr; PDF). The checker reads the PDF\'s text and layout: page count, how far down the page it reaches, margins, font size, and wording.</div>' +
      '<label class="drop" id="rc-drop" for="rc-file"><input type="file" id="rc-file" accept="application/pdf,.pdf"><strong>Choose your resume PDF</strong><span class="meta">or drag and drop it here</span></label>' +
      '<div id="rc-status" class="meta" role="status"></div><div id="rc-out"></div>';
    var input = document.getElementById("rc-file"), drop = document.getElementById("rc-drop"), status = document.getElementById("rc-status"), out = document.getElementById("rc-out");
    function handle(file) {
      out.innerHTML = "";
      if (!file) return;
      if (!/pdf$/i.test(file.type) && !/\.pdf$/i.test(file.name)) { status.textContent = "That isn't a PDF. In Word, use File, Save As, and choose PDF."; return; }
      if (file.size > 15 * 1024 * 1024) { status.textContent = "That file is over 15 MB. Export a smaller PDF."; return; }
      status.textContent = "Reading " + file.name + "...";
      file.arrayBuffer().then(readPdf).then(function (res) {
        status.textContent = "Checked " + file.name;
        out.innerHTML = analyze(res.text, res.layout);
      }).catch(function (err) {
        status.textContent = (err && err.userMessage) || "Couldn't read that PDF. Try exporting it again from Word.";
      });
    }
    input.addEventListener("change", function () { handle(input.files[0]); });
    ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("over"); }); });
    drop.addEventListener("drop", function (e) { handle(e.dataTransfer.files[0]); });
    window.CP_checkBuffer = function (buf) { return readPdf(buf).then(function (r) { out.innerHTML = analyze(r.text, r.layout); return r; }); };
  };

  // ---- PDF reading (pdf.js, bundled in /vendor) ----
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = "vendor/pdf.min.js";
      s.onload = function () { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js"; res(window.pdfjsLib); };
      s.onerror = function () { rej({ userMessage: "The PDF reader didn't load. Check your connection and refresh." }); };
      document.head.appendChild(s);
    });
  }

  function readPdf(buf) {
    return loadPdfJs().then(function (pdfjs) {
      return pdfjs.getDocument({ data: buf }).promise;
    }).then(function (pdf) {
      var pages = pdf.numPages, chain = Promise.resolve(), allLines = [], lay = { pages: pages, last: null, minFont: 99, smallChars: 0, totalChars: 0, left: 99, right: 99 };
      function doPage(n) {
        return pdf.getPage(n).then(function (page) {
          var vp = page.getViewport({ scale: 1 });
          return page.getTextContent().then(function (tc) {
            var items = tc.items.filter(function (i) { return i.str && i.str.trim(); });
            var rows = [];
            items.forEach(function (it) {
              var y = it.transform[5], x = it.transform[4], h = Math.abs(it.transform[3]) || it.height || 10;
              var row = null;
              for (var k = 0; k < rows.length; k++) if (Math.abs(rows[k].y - y) < 2.5) { row = rows[k]; break; }
              if (!row) { row = { y: y, items: [] }; rows.push(row); }
              row.items.push({ x: x, w: it.width, s: it.str, h: h });
              lay.totalChars += it.str.length;
              if (h < 9.5) lay.smallChars += it.str.length;
              if (it.str.trim().length > 3 && h < lay.minFont) lay.minFont = h;
            });
            rows.sort(function (a, b) { return b.y - a.y; });
            rows.forEach(function (r) {
              r.items.sort(function (a, b) { return a.x - b.x; });
              var line = "", prevEnd = null;
              r.items.forEach(function (it) {
                if (prevEnd !== null && it.x - prevEnd > 1.5 && !/\s$/.test(line)) line += " ";
                line += it.s; prevEnd = it.x + it.w;
              });
              allLines.push(line.trim());
            });
            if (items.length) {
              var minX = Math.min.apply(null, items.map(function (i) { return i.transform[4]; }));
              var maxX = Math.max.apply(null, items.map(function (i) { return i.transform[4] + i.width; }));
              lay.left = Math.min(lay.left, minX / 72); lay.right = Math.min(lay.right, (vp.width - maxX) / 72);
              var low = Math.min.apply(null, items.map(function (i) { return i.transform[5]; }));
              var high = Math.max.apply(null, items.map(function (i) { return i.transform[5] + (Math.abs(i.transform[3]) || 10); }));
              lay.last = { fill: Math.round((vp.height - low) / vp.height * 100), top: Math.round((vp.height - high) / 72 * 100) / 100, bottom: Math.round(low / 72 * 100) / 100 };
            }
          });
        });
      }
      for (var n = 1; n <= pages; n++) (function (p) { chain = chain.then(function () { return doPage(p); }); })(n);
      return chain.then(function () {
        var text = allLines.join("\n");
        if (words(text) < 25) throw { userMessage: "This PDF has no readable text. It may be a scan or a picture. Export it from Word with File, Save As, PDF instead." };
        return { text: text, layout: lay };
      });
    });
  }

  function analyze(text, layout) {
    text = (text || "").replace(/\r/g, "");
    if (words(text) < 25) return '<div class="panel"><p>That PDF didn\'t have enough text to check.</p></div>';
    var lines = text.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    var bullets = lines.filter(function (l) { return /^[•●▪‣\-*–•·]\s*/.test(l); }).map(function (l) { return l.replace(/^[•●▪‣\-*–•·]\s*/, ""); });
    if (bullets.length < 3) bullets = lines.filter(function (l) { return words(l) >= 8 && /[a-z]/.test(l) && !/@/.test(l); });
    var wc = words(text), checks = [], notes = [];
    function add(level, title, detail) { checks.push({ level: level, title: title, detail: detail }); }

    // layout (measured from the PDF)
    if (layout) {
      if (layout.pages > 1) add("bad", "Resume is " + layout.pages + " pages", "It must be exactly one page. Cut older or weaker items.");
      else add("good", "One page", "");
      if (layout.last && layout.pages === 1) {
        var f = layout.last.fill;
        add(f >= 75 ? "good" : f >= 60 ? "warn" : "bad", "Content reaches " + f + "% down the page",
          f >= 75 ? "Meets the 75% rule." : "Fill at least 75% of the page. Add real experience, activities, or coursework rather than spacing.");
        if (layout.last.bottom < 0.4) add("warn", "Text runs close to the bottom edge", "Only about " + layout.last.bottom.toFixed(2) + " inches of bottom margin.");
      }
      var minM = Math.min(layout.left, layout.right);
      if (minM < 0.45) add("warn", "Side margins are tight", "Narrowest side margin is about " + minM.toFixed(2) + " inches. Kelley guidance is 0.5 to 1 inch.");
      else if (Math.max(layout.left, layout.right) > 1.15) add("warn", "Side margins are wide", "About " + Math.max(layout.left, layout.right).toFixed(2) + " inches on one side. Use 0.5 to 1 inch to fit more.");
      else add("good", "Margins look fine", "Left " + layout.left.toFixed(2) + " in, right " + layout.right.toFixed(2) + " in.");
      var smallPct = layout.totalChars ? Math.round(layout.smallChars / layout.totalChars * 100) : 0;
      if (smallPct > 10) add("warn", "Some text is smaller than 10 pt", smallPct + "% of the text. Use 10 to 12 pt for body text.");
      else add("good", "Font size looks readable", "");
    } else if (wc > 700) add("bad", "Too long for one page", "About " + wc + " words. One page is usually 400–650 words.");
    else if (wc < 250) add("warn", "May not fill the page", wc + " words.");

    // contact

    // contact
    var email = /[\w.+-]+@[\w-]+\.[\w.-]+/.exec(text), phone = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/.test(text);
    if (!email) add("bad", "No email found", "Add a professional email, ideally your IU address.");
    else if (/@(gmail|yahoo|hotmail|outlook|icloud)\./i.test(email[0]) && !/iu\.edu|indiana\.edu/i.test(text)) add("warn", "Personal email only", "An IU email looks more professional. " + email[0]);
    else add("good", "Email found", email[0]);
    add(phone ? "good" : "warn", phone ? "Phone number found" : "No phone number found", phone ? "" : "Most resumes include one.");
    add(/linkedin\.com|linkedin/i.test(text) ? "good" : "warn", /linkedin/i.test(text) ? "LinkedIn included" : "No LinkedIn link", /linkedin/i.test(text) ? "" : "Add your LinkedIn URL if your profile is ready.");
    if (/\b\d{2,5}\s+\w+(\s\w+)?\s+(street|st|avenue|ave|road|rd|drive|dr|lane|ln|blvd|boulevard)\b/i.test(text)) add("warn", "Full street address", "Leave off your home address. City and state is enough.");

    // sections
    var hasEdu = /education/i.test(text), hasExp = /(experience|employment|work history)/i.test(text), hasAct = /(activities|leadership|involvement|organizations)/i.test(text);
    add(hasEdu ? "good" : "bad", hasEdu ? "Education section found" : "No Education section", hasEdu ? "" : "Put Education first and list Indiana University, Kelley School of Business.");
    add(hasExp || hasAct ? "good" : "warn", hasExp || hasAct ? "Experience or activities found" : "No Experience or Activities heading", hasExp || hasAct ? "" : "Add headings like Experience and Activities.");
    if (!/kelley/i.test(text)) add("warn", "Kelley not mentioned", "List Indiana University, Kelley School of Business under Education.");

    // GPA
    var gpa = /gpa[:\s]*([0-4]\.\d{1,2})/i.exec(text);
    if (gpa) { var g = parseFloat(gpa[1]); add(g < 2.5 ? "bad" : g < 3.0 ? "warn" : "good", "GPA listed: " + gpa[1], g < 2.5 ? "Kelley guidance is to list GPA only if it's above 2.5." : g < 3.0 ? "Listing it is allowed, but many students leave it off below 3.0." : ""); }

    // bullets
    if (bullets.length) {
      var startVerb = 0, withNum = 0, longB = 0, firstWords = {}, repeatVerb = [], weak = [], pronoun = 0;
      bullets.forEach(function (b) {
        var fw = (b.split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z]/g, "");
        var isVerb = VERBS.indexOf(fw) > -1 || /ed$/.test(fw) && fw.length > 4;
        if (isVerb) startVerb++;
        firstWords[fw] = (firstWords[fw] || 0) + 1;
        if (/\d|%|\$/.test(b)) withNum++;
        if (words(b) > 32) longB++;
        if (/\b(I|my|me)\b/.test(b)) pronoun++;
        WEAK.forEach(function (re) { var m = re.exec(b); if (m && weak.indexOf(m[0].toLowerCase()) < 0) weak.push(m[0].toLowerCase()); });
      });
      Object.keys(firstWords).forEach(function (k) { if (k && firstWords[k] >= 3 && VERBS.indexOf(k) > -1) repeatVerb.push(k + " (" + firstWords[k] + ")"); });
      var pv = Math.round(startVerb / bullets.length * 100), pn = Math.round(withNum / bullets.length * 100);
      add(pv >= 80 ? "good" : pv >= 55 ? "warn" : "bad", pv + "% of bullets start with an action verb", pv >= 80 ? "" : "Start each bullet with a strong verb like Led, Built, Analyzed.");
      add(pn >= 40 ? "good" : pn >= 20 ? "warn" : "bad", pn + "% of bullets include a number", pn >= 40 ? "" : "Add how many, how much, or how often. Aim for about half.");
      if (longB) add("warn", longB + " bullet" + (longB > 1 ? "s are" : " is") + " very long", "Keep each bullet to one or two lines (about 30 words max).");
      if (repeatVerb.length) add("warn", "Repeated starting verbs", "Vary these: " + repeatVerb.join(", "));
      if (weak.length) add("warn", "Weak or vague phrases", "Replace: " + weak.join(", "));
      if (pronoun) add("warn", pronoun + " bullet" + (pronoun > 1 ? "s use" : " uses") + " I, me, or my", "Drop first-person words. Start with the verb.");
      notes.push(bullets.length + " bullets analyzed.");
    } else add("warn", "No bullet points detected", "Use bullets for experience, not paragraphs. If you did, the paste may have lost the bullet symbols.");

    if (/references (available|upon)/i.test(text)) add("warn", "'References available' line", "Remove it. It's assumed.");
    if (/objective/i.test(text)) add("warn", "Objective statement", "Most college resumes skip this and use the space for experience.");

    var pts = checks.reduce(function (s, c) { return s + (c.level === "good" ? 1 : c.level === "warn" ? 0.5 : 0); }, 0);
    var score = Math.round(pts / checks.length * 100);
    var bad = checks.filter(function (c) { return c.level === "bad"; }).length, warn = checks.filter(function (c) { return c.level === "warn"; }).length;
    var order = { bad: 0, warn: 1, good: 2 };
    checks.sort(function (a, b) { return order[a.level] - order[b.level]; });
    var label = { bad: "Fix", warn: "Improve", good: "Good" };
    return '<div class="panel crimson"><div class="score"><span class="num">' + score + '</span><span class="meta">of 100 · ' + bad + " to fix · " + warn + " to improve</span></div>" +
      '<p class="meta">A rough guide to wording and content, not a verdict. Have Kelley Career Services review it too. ' + esc(notes.join(" ")) + "</p></div>" +
      '<ul class="results">' + checks.map(function (c) {
        return '<li class="' + c.level + '"><span class="pill">' + label[c.level] + "</span><div><strong>" + esc(c.title) + "</strong>" + (c.detail ? '<div class="meta">' + esc(c.detail) + "</div>" : "") + "</div></li>";
      }).join("") + "</ul>";
  }
})();
