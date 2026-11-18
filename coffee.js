// Coffee Chat Email template. Fill in the blanks, copy, and send from your own email.
// Loaded after features2.js and before app.js.
(function () {
  "use strict";
  var views = window.VIEWS;
  window.TOOL_LIST.push({ href: "#/outreach", title: "Coffee Chat Email", text: "A fill-in email template for asking a club member to a coffee chat." });
  function CP() { return window.CP; }
  function esc(s) { return CP().esc(s); }
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  // [id, label, placeholder shown in the email when blank, example shown in the input]
  var THEM = [
    ["first", "Their first name", "[Their First Name]", "Jordan"],
    ["club", "Club or organization", "[Club Name]", "Start typing a club name"],
    ["hear", "What you'd enjoy hearing about from them", "[something they have done that connects to your interest]", "the places you have visited"],
    ["noticed", "Something specific you saw about them <em class=\"meta\">(finish the sentence \"I also saw that you...\")</em>", "[something specific from their LinkedIn or bio]", "love a certain store, team, or hobby"],
    ["ask", "What you'd appreciate from them <em class=\"meta\">(finish \"I would appreciate...\")</em>", "[a recommendation or question for them]", "any recommendations you have"]
  ];
  var YOU = [
    ["me", "Your full name", "[Your Full Name]", "First Last"],
    ["year", "Your year", "[year]", "freshman"],
    ["major", "What you're studying", "[your major]", "finance"],
    ["home", "Your hometown", "[City, State]", "City, State"],
    ["interest", "An interest you share with them <em class=\"meta\">(finish \"I am a huge fan of...\")</em>", "[an interest you share with them]", "traveling and road trips"],
    ["phone", "Your phone number <em class=\"meta\">(for coordinating over text)</em>", "[(555) 555-5555]", "(555) 555-5555"]
  ];

  function nextWeek() {
    var d = new Date(), add = ((8 - d.getDay()) % 7) || 7;
    d.setDate(d.getDate() + add);
    return DAYS.map(function (name, i) {
      var x = new Date(d); x.setDate(d.getDate() + i);
      return name + " (" + (x.getMonth() + 1) + "/" + x.getDate() + ")";
    });
  }

  views.outreach = function (parts) {
    var d = load("cp_coffee", {});
    var pre = parts && parts[0] ? CP().CLUBS.filter(function (c) { return c.key === decodeURIComponent(parts[0]); })[0] : null;
    if (pre) d.club = pre.name;
    var week = nextWeek();
    function field(f) {
      var list = f[0] === "club" ? ' list="cc-clubs"' : "";
      return '<label class="field"><span>' + f[1] + '</span><input type="text" id="cc-' + f[0] + '"' + list + ' placeholder="' + esc(f[3]) + '"></label>';
    }
    document.getElementById("app").innerHTML = '<div id="cc-root"><a class="back" href="#/tools">&larr; Prep Tools</a><h1>Coffee Chat Email</h1>' +
      '<p class="lead">A template for asking a club member to a coffee chat. Fill in the blanks on the left and the email updates as you type. Anything you skip stays as a [placeholder] so you can finish it in your email app.</p>' +
      '<div class="cc-layout"><div>' +
      '<div class="panel"><h3>About Them</h3>' + THEM.map(field).join("") +
      '<datalist id="cc-clubs">' + CP().CLUBS.map(function (c) { return '<option value="' + esc(c.name) + '">'; }).join("") + "</datalist>" +
      '<label class="opt"><input type="checkbox" id="cc-met"><span>We\'ve met before (uses "reintroduction")</span></label></div>' +
      '<div class="panel"><h3>About You</h3>' + YOU.map(field).join("") +
      '<label class="opt"><input type="checkbox" id="cc-resume" checked><span>Mention that my resume is attached</span></label></div>' +
      '<div class="panel"><h3>Your Availability Next Week</h3><p class="meta">Type your free times for each day. Leave a day blank to skip it.</p>' +
      week.map(function (w, i) { return '<label class="field"><span>' + esc(w) + '</span><input type="text" id="cc-day' + i + '" placeholder="9:00 AM – 12:00 PM and after 5:30 PM"></label>'; }).join("") +
      '<div class="cc-row"><label class="field"><span>Chat length (minutes)</span><input type="text" id="cc-len" inputmode="numeric" placeholder="30"></label>' +
      '<label class="field"><span>Time zone</span><input type="text" id="cc-tz" placeholder="EST"></label></div></div>' +
      '</div><div class="cc-out">' +
      '<div class="panel crimson"><h3>Subject</h3><div class="answer" id="cc-subject"></div><button class="btn secondary" type="button" data-copy="cc-subject">Copy subject</button></div>' +
      '<div class="panel crimson"><h3>Your Email</h3><div class="answer" id="cc-email"></div><p class="meta" id="cc-status" role="status"></p>' +
      '<button class="btn" type="button" data-copy="cc-email">Copy email</button><button class="btn secondary" type="button" id="cc-reset">Clear all</button></div>' +
      '<div class="panel"><h3>Before You Send</h3><ul><li>Attach your resume as a PDF if the email says it is attached.</li>' +
      "<li>Make the personal details real. Look at their LinkedIn or the club's page and mention something specific.</li>" +
      "<li>Double-check the spelling of their name and the dates.</li><li>Send from your IU email and reply quickly when they answer.</li>" +
      "<li>Send a short thank-you within 24 hours of the chat.</li></ul></div></div></div></div>";

    var root = document.getElementById("cc-root");
    var textIds = THEM.concat(YOU).map(function (f) { return f[0]; }).concat(["len", "tz", "day0", "day1", "day2", "day3", "day4"]);
    function el(id) { return document.getElementById("cc-" + id); }
    function fill() {
      textIds.forEach(function (i) { el(i).value = d[i] || ""; });
      el("met").checked = !!d.met; el("resume").checked = d.resume !== false;
    }
    function render() {
      textIds.forEach(function (i) { d[i] = el(i).value; });
      d.met = el("met").checked; d.resume = el("resume").checked; save("cp_coffee", d);
      var blanks = 0;
      function v(id) {
        var all = THEM.concat(YOU), f = all.filter(function (x) { return x[0] === id; })[0], x = (d[id] || "").trim();
        if (x) return x; blanks++; return f[2];
      }
      var me = v("me"), first = v("first");
      var lines = week.map(function (w, i) { var t = (d["day" + i] || "").trim(); return t ? w + ": " + t : null; }).filter(Boolean);
      if (!lines.length) { blanks++; lines = week.map(function (w) { return w + ": [your free times]"; }); }
      var len = (d.len || "").trim() || "30", tz = (d.tz || "").trim() || "EST";
      var email = "Hi " + first + ",\n\n" +
        "By way of " + (d.met ? "reintroduction" : "introduction") + ", my name is " + me + ", and I am a " + v("year") + " studying " + v("major") + " from " + v("home") + ". " +
        "I am a huge fan of " + v("interest") + ", so I would enjoy hearing about " + v("hear") + "! " +
        "I also saw that you " + v("noticed") + ", so I would appreciate " + v("ask") + ".\n\n" +
        "I would love the chance to get to know you better and learn more about your time in " + v("club") + ". " +
        "My availability for a " + len + "-minute coffee chat next week is listed below (" + tz + "):\n\n" +
        lines.join("\n") + "\n\n" +
        "If none of these times work for you, please let me know and I would be happy to adjust around your schedule." +
        (d.resume ? " I have also attached my resume for your reference." : "") +
        " If coordinating over text is easier, my number is " + v("phone") + ".\n\n" +
        "I look forward to connecting with you!\n\nBest,\n" + (me.charAt(0) === "[" ? "[Your First Name]" : me.split(" ")[0]);
      el("email").textContent = email;
      el("subject").textContent = "Coffee Chat Request - " + me;
      el("status").textContent = blanks ? blanks + (blanks === 1 ? " blank" : " blanks") + " left to fill in. Look for the [brackets]." : "All filled in. Read it once out loud before you send it.";
    }
    fill(); render();
    root.addEventListener("input", render);
    root.addEventListener("change", render);
    root.addEventListener("click", function (e) {
      var id = e.target.getAttribute && e.target.getAttribute("data-copy");
      if (id) CP().copyText(document.getElementById(id).textContent).then(function () { CP().toast("Copied. Paste it into your email."); }, function () { CP().toast("Couldn't copy. Select the text and copy it by hand."); });
      if (e.target.id === "cc-reset") { d = {}; save("cp_coffee", d); fill(); render(); CP().toast("Cleared."); }
    });
  };
})();
