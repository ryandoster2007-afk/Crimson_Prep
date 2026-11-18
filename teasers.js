// Brain Teasers tool: 50 classic interview puzzles. Click a question to open it, then reveal the answer.
// Loaded after features.js and before coffee.js and app.js.
(function () {
  "use strict";
  var views = window.VIEWS;
  function esc(s) { return window.CP.esc(s); }
  function app() { return document.getElementById("app"); }

  window.TOOL_LIST.push({ href: "#/teasers", title: "Brain Teasers", text: "50 classic interview puzzles. Open one, think it through, then reveal the answer." });

  window.TEASERS = [
    { cat: "Logic", q: "A lily pad doubles in size every day. It takes 60 days to cover the whole lake. On what day is the lake half covered?", a: "Day 59. The pad doubles every day, so the day before it covers the whole lake, it covers exactly half." },
    { cat: "Logic", q: "Three light switches sit outside a closed room. Each one controls one of three light bulbs inside. You can flip the switches as many times as you like, but you can only go into the room once. How do you figure out which switch controls which bulb?", a: "Turn switch 1 on for 5 to 10 minutes, then turn it off. Turn switch 2 on and leave it on. Then go in. The bulb that is on is switch 2. The bulb that is off but warm is switch 1. The bulb that is off and cold is switch 3." },
    { cat: "Logic", q: "You have two ropes. Each takes exactly one hour to burn, but they burn unevenly. How do you measure 45 minutes?", a: "Light rope A at both ends and rope B at one end at the same time. When rope A burns out (30 minutes), light the other end of rope B. That end now burns from both sides, so the rest of rope B burns out in 15 minutes. Total: 45 minutes." },
    { cat: "Math", q: "A hat and a baseball bat cost $1.10 together. The bat costs $1.00 more than the hat. How much does the hat cost?", a: "$0.05. Let the hat be h. The bat is h + $1.00, so 2h + $1.00 = $1.10, which gives h = $0.05. The common wrong answer is $0.10." },
    { cat: "Math", q: "A rope is wrapped tightly around the equator of the Earth. You add exactly 1 meter to the rope and space it evenly all the way around. How high off the ground is the rope?", a: "About 16 cm. The circumference is 2πr. Adding 1 meter raises the radius by 1 ÷ 2π, about 0.16 meters, no matter how big the planet is." },
    { cat: "Logic", q: "You have two identical eggs and a 100-story building. What is the fewest drops you need, in the worst case, to find the highest floor an egg can survive from?", a: "14 drops. Drop the first egg from floor 14. If it survives, go up 13 floors to 27, then 12 to 39, and so on. The steps shrink by one each time, so the second egg can check the floors in the gap. The total is 14 + 13 + ... + 1 = 105, which covers 100 floors." },
    { cat: "Logic", q: "You have eight identical-looking balls. One is slightly heavier. Using a balance scale, how do you find it in two weighings?", a: "Weigh 3 balls against 3 balls and set 2 aside. If one side is heavier, the heavy ball is on that side. Weigh two of those three against each other. If one is heavier, it's that ball. If they balance, it's the third. If the first weighing balances, the heavy ball is one of the 2 set aside, so weigh them against each other." },
    { cat: "Logic", q: "You have a 3-gallon jug, a 5-gallon jug, and unlimited water. How do you measure exactly 4 gallons?", a: "Fill the 5-gallon jug and pour it into the 3-gallon jug until the 3 is full. That leaves 2 gallons in the 5. Empty the 3, pour the 2 gallons into it, then fill the 5 again. Pour from the 5 into the 3 until the 3 is full. Only 1 gallon fits, so 4 gallons are left in the 5-gallon jug." },
    { cat: "Logic", q: "Four people need to cross a bridge at night with one flashlight. The bridge holds only two people at a time. They take 1, 2, 5, and 10 minutes to cross, and a pair walks at the slower person's pace. What is the fastest time for everyone to get across?", a: "17 minutes. The 1- and 2-minute people cross (2). The 1-minute person brings the flashlight back (1). The 5- and 10-minute people cross (10). The 2-minute person brings the flashlight back (2). The 1- and 2-minute people cross again (2). Total: 17." },
    { cat: "Probability", q: "Three doors hide one car and two goats. You pick door 1. The host, who knows what is behind each door, opens door 3 to show a goat and asks if you want to switch to door 2. Should you switch?", a: "Yes. Switching wins 2/3 of the time. Your first pick had a 1/3 chance, so the other two doors hold 2/3 combined. The host's reveal puts all of that onto the one door left." },
    { cat: "Logic", q: "There are 100 closed lockers. 100 students walk down the hall. Student 1 opens every locker. Student 2 closes every second locker. Student 3 toggles every third locker, and so on. How many lockers are open at the end?", a: "10 (lockers 1, 4, 9, 16, ... 100). A locker gets toggled once for each of its factors. Only perfect squares have an odd number of factors, so only they end up open." },
    { cat: "Logic", q: "At a party, 10 people each shake hands with every other person exactly once. How many handshakes happen?", a: "45. Each person shakes 9 hands, which gives 90, but every handshake is counted twice. 90 ÷ 2 = 45." },
    { cat: "Logic", q: "How many times do the hour and minute hands of a clock overlap in a 12-hour period?", a: "11 times. They overlap about every 65 and 5/11 minutes, so in 12 hours there are 11 overlaps. The overlap at 12:00 starts the cycle, so it isn't counted again at the end." },
    { cat: "Logic", q: "What is the angle between the hour and minute hands at 3:15?", a: "7.5 degrees. At 3:15 the minute hand is at 90°. The hour hand is 3 × 30° = 90° plus a quarter of the way to the 4 (7.5°), so it's at 97.5°. The difference is 7.5°." },
    { cat: "Logic", q: "Two trains are 100 miles apart on the same track, each heading toward the other at 50 mph. A fly starts at the front of one train and flies at 100 mph back and forth between the trains until they meet. How far does the fly travel?", a: "100 miles. The trains meet after 1 hour, so the fly flies for 1 hour at 100 mph. Trying to add up the back-and-forth legs is a trap. You only need the total time." },
    { cat: "Logic", q: "A man walks 1 mile south, then 1 mile east, then 1 mile north, and ends up where he started. He sees a bear. What color is the bear?", a: "White. The only place on Earth where this works is the North Pole, so the bear is a polar bear." },
    { cat: "Logic", q: "Why does a mirror flip your image left to right but not top to bottom?", a: "It doesn't really flip left and right. It reverses your image front to back, toward and away from the mirror. Your left hand looks like it's on the right because you're facing the mirror." },
    { cat: "Logic", q: "How would you weigh an elephant without a scale?", a: "Float a large boat with the elephant on board and mark the waterline. Remove the elephant, then load rocks into the boat until it sinks to the same waterline. Weigh the rocks. Their weight equals the elephant's weight." },
    { cat: "Logic", q: "Why are manhole covers round?", a: "A round cover can't fall through a round hole, even if it's turned sideways. Round covers are also easy to roll and fit in any orientation." },
    { cat: "Logic", q: "Three friends pay $10 each for a $25 hotel room, so they pay $30. The clerk realizes the room was $5 cheaper and sends the bellboy with $5. The bellboy keeps $2 and gives each friend $1. So each friend paid $9, for $27 total, and the bellboy kept $2. $27 + $2 = $29. Where did the missing dollar go?", a: "There isn't one. The $27 already includes the bellboy's $2. The hotel got $25 and the bellboy kept $2, so $27 is the full amount paid. Adding the $2 to $27 counts that money twice." },
    { cat: "Math", q: "What is the sum of the numbers from 1 to 100?", a: "5,050. Pair 1 with 100, 2 with 99, and so on. That makes 50 pairs that each add to 101: 50 × 101 = 5,050." },
    { cat: "Math", q: "What is the sum of the numbers from 1 to 1,000?", a: "500,500. Use the same pairing: 500 pairs that each add to 1,001. 500 × 1,001 = 500,500." },
    { cat: "Math", q: "How many times is the digit 3 written when you count from 1 to 100?", a: "20. It appears 10 times in the ones place (3, 13, 23, ... 93) and 10 times in the tens place (30 through 39)." },
    { cat: "Math", q: "How many zeros are at the end of 100!?", a: "24. Each zero needs a factor of 10, which is a 2 and a 5. There are plenty of 2s, so count the 5s. 100 ÷ 5 = 20 multiples of 5, plus 100 ÷ 25 = 4 extra for the multiples of 25. 20 + 4 = 24." },
    { cat: "Math", q: "What comes next in the sequence: 2, 6, 12, 20, 30, ...?", a: "42. The pattern is n × (n + 1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42." },
    { cat: "Math", q: "What comes next in the sequence: 1, 1, 2, 3, 5, 8, ...?", a: "13. Each number is the sum of the two before it (the Fibonacci sequence): 5 + 8 = 13." },
    { cat: "Math", q: "What is the most pieces you can cut a pizza into with 3 straight cuts?", a: "7. Each new cut can cross every earlier cut, so the count is n(n + 1) ÷ 2 + 1. For n = 3: 3 × 4 ÷ 2 + 1 = 7." },
    { cat: "Math", q: "What is the fewest straight cuts needed to divide a cube into 27 identical smaller cubes?", a: "6. Make two cuts along each of the three axes. That splits the cube into thirds in each direction, giving 3 × 3 × 3 = 27 pieces." },
    { cat: "Math", q: "You have 25 horses and want the three fastest. A track fits 5 horses at a time, and there are no timers. What's the fewest races you need?", a: "7 races. Run five heats of five horses (5 races). Race the five heat winners to find the fastest horse (6th race). A 7th race among the few horses that could still be 2nd or 3rd finds the other two." },
    { cat: "Math", q: "A shirt is marked down 20%. Then the new price is marked down another 25%. What is the total discount from the original price?", a: "40%, not 45%. 0.80 × 0.75 = 0.60, so the shirt costs 60% of the original price." },
    { cat: "Math", q: "An investment rises 10% in year one and falls 10% in year two. What is the net change?", a: "Down 1%. 1.10 × 0.90 = 0.99. The same percentage up and down doesn't cancel out, because the drop starts from a bigger base." },
    { cat: "Math", q: "Using the rule of 72, about how long does it take $1,000 to double at an 8% annual return?", a: "About 9 years. 72 ÷ 8 = 9." },
    { cat: "Math", q: "If 5 machines make 5 widgets in 5 minutes, how long will 100 machines take to make 100 widgets?", a: "5 minutes. Each machine still takes 5 minutes to make one widget. Adding machines in proportion doesn't change how long one widget takes." },
    { cat: "Math", q: "You drive 60 miles to a destination at an average of 30 mph. How fast must you drive back to average 60 mph for the whole round trip?", a: "You can't. The trip out already took 2 hours, and a 60 mph average over 120 miles needs only 2 hours total. There's no time left to drive back." },
    { cat: "Probability", q: "You flip a fair coin until you get two heads in a row. On average, how many flips does it take?", a: "6 flips. Each tail sends you back to the start. Let E be the expected number of flips from the start. Working it through gives E = 6." },
    { cat: "Probability", q: "What is the probability of getting at least one six when you roll a fair die four times?", a: "About 52%. It's easier to find the chance of no sixes: (5/6)^4 ≈ 0.48. So at least one six is 1 − 0.48 ≈ 0.52." },
    { cat: "Probability", q: "How many people need to be in a room before there's a better than 50% chance that two of them share a birthday?", a: "23. It feels like it should be much higher, but 23 people make 253 pairs, and each pair has about a 1 in 365 chance of matching." },
    { cat: "Probability", q: "When you roll two fair dice, which sum is most likely?", a: "7. There are 6 ways to make 7 out of 36 total outcomes, so the probability is 6/36 = 1/6." },
    { cat: "Probability", q: "A game: you flip a fair coin. Heads you win $10. Tails you lose $5. Should you play?", a: "Yes. The expected value is 0.5 × $10 − 0.5 × $5 = $2.50 per flip. A positive expected value means the game is worth playing over many flips." },
    { cat: "Probability", q: "A dollar bill is auctioned. Bids rise in 5-cent steps. The highest bidder wins the dollar and pays their bid. The second-highest bidder also pays their bid but gets nothing. Do you bid?", a: "Be careful. Once bids pass a dollar, the top bidder loses money, and so does the second-place bidder, who pays for nothing. The best move is not to start a bidding war." },
    { cat: "Probability", q: "Would you rather receive $1 million now, or a penny that doubles every day for 30 days?", a: "The penny. After 30 doublings you have 2^30 cents, about $10.7 million. Doubling beats a fixed amount once the growth runs long enough." },
    { cat: "Estimation", q: "How many piano tuners are there in Chicago?", a: "There's no exact answer. Interviewers want your method. Chicago has about 2.7 million people, which is about 1 million households. If 1 in 20 has a piano, that's about 50,000 pianos. Each one is tuned about once a year. A tuner does about 4 a day for 250 days, so about 1,000 a year. 50,000 ÷ 1,000 ≈ 50 tuners." },
    { cat: "Estimation", q: "How many gas stations are in the United States?", a: "There's no exact answer. About 330 million people and 250 million vehicles. If each car fills up about once a week, that's about 35 million fill-ups a day. A typical station handles a few hundred fill-ups a day. Divide the two, state your assumptions, and check that the answer feels reasonable." },
    { cat: "Estimation", q: "How many golf balls would fit in a school bus?", a: "Estimate the bus's interior volume, roughly 20 ft × 8 ft × 6 ft, about 1,000 cubic feet. A golf ball is about 2.5 cubic inches. Convert the bus to cubic inches, divide by the ball's volume, then multiply by about 64% for packing, since spheres leave gaps. Say each assumption out loud." },
    { cat: "Estimation", q: "How many tennis balls would fit in a smart car?", a: "Estimate the car's interior at about 2 cubic meters. A tennis ball is about 160 cm³. Divide, which gives about 12,500, then multiply by roughly 64% for packing, which gives about 8,000. Seats and the dashboard take up space, so say that out loud." },
    { cat: "Estimation", q: "How much does the Earth weigh?", a: "About 5.97 × 10^24 kilograms. To estimate it, start from the Earth's radius (about 6,400 km) and average density (about 5,500 kg/m³). Volume × density gives the mass, which matches this number." },
    { cat: "Estimation", q: "How many pennies would it take to cover the floor of a classroom?", a: "Assume the classroom is about 30 ft × 30 ft, or 900 square feet, which is 129,600 square inches. A penny covers about 0.44 square inches, so 129,600 ÷ 0.44 ≈ 294,000 pennies. Round circles leave gaps, so the real number is a bit lower." },
    { cat: "Estimation", q: "How many haircuts are given in the United States each day?", a: "There's no exact answer. About 335 million people. Say half get a haircut in a given year, and most of them go about 6 times a year. That's about 1 billion haircuts a year, or roughly 2.7 million a day. State your assumptions and check the result." },
    { cat: "Estimation", q: "How many barbers work in your home city?", a: "Estimate the city's population, say 1 million. Say a quarter of people use a barber, and each goes about 8 times a year. That's about 2 million cuts a year. A barber does about 15 cuts a day for 250 days, about 3,750 a year, so 2,000,000 ÷ 3,750 ≈ 500 barbers." },
    { cat: "Estimation", q: "How many taxis are operating in New York City at any one time?", a: "There's no exact answer. NYC has about 8 million people. Say about 500,000 taxi trips a day, and a taxi handles about 15 trips a day. 500,000 ÷ 15 ≈ 33,000 taxis in service at a time. Name your assumptions and check them." }
  ];

  var CATS = ["All", "Logic", "Math", "Probability", "Estimation"];

  views.teasers = function () {
    var query = "", cat = "All";
    app().innerHTML = '<a class="back" href="#/tools">&larr; Prep Tools</a><h1>Brain Teasers</h1>' +
      '<p class="lead">Open a question, think it through out loud, then reveal the answer. Interviewers usually care more about how you reason than the final number.</p>' +
      '<input class="search" id="bt-search" type="search" placeholder="Search teasers" aria-label="Search teasers">' +
      '<div class="chips" id="bt-chips">' + CATS.map(function (c) {
        return '<button class="chip" type="button" data-cat="' + c + '" aria-pressed="' + (c === cat) + '">' + c + "</button>";
      }).join("") + "</div>" +
      '<div class="bt-bar"><span class="count" id="bt-count"></span><button class="btn secondary" type="button" id="bt-random">Random teaser</button></div>' +
      '<div id="bt-list"></div>';

    var list = document.getElementById("bt-list");
    var rows = [];

    function render() {
      var q = query.trim().toLowerCase();
      rows = window.TEASERS.map(function (t, i) { return { t: t, n: i + 1 }; }).filter(function (r) {
        return (cat === "All" || r.t.cat === cat) && (!q || r.t.q.toLowerCase().indexOf(q) > -1);
      });
      document.getElementById("bt-count").textContent = rows.length + " of " + window.TEASERS.length + " teasers";
      list.innerHTML = rows.length ? rows.map(function (r) {
        return '<details class="teaser"><summary><span class="teaser-n">' + r.n + '</span><span class="qtype">' + esc(r.t.cat) + "</span>" + esc(r.t.q) + "</summary>" +
          '<div class="teaser-body"><button class="btn secondary reveal" type="button" aria-expanded="false">Reveal answer</button>' +
          '<div class="teaser-answer" hidden>' + esc(r.t.a) + "</div></div></details>";
      }).join("") : '<p class="meta">No teasers match. Try a different search.</p>';
    }

    document.getElementById("bt-search").addEventListener("input", function (e) { query = e.target.value; render(); });
    document.getElementById("bt-chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      cat = b.getAttribute("data-cat");
      [].forEach.call(document.querySelectorAll("#bt-chips .chip"), function (c) { c.setAttribute("aria-pressed", String(c === b)); });
      render();
    });
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".reveal");
      if (!btn) return;
      var ans = btn.parentElement.querySelector(".teaser-answer");
      ans.hidden = !ans.hidden;
      btn.textContent = ans.hidden ? "Reveal answer" : "Hide answer";
      btn.setAttribute("aria-expanded", String(!ans.hidden));
    });
    document.getElementById("bt-random").addEventListener("click", function () {
      if (!rows.length) return;
      var pick = rows[Math.floor(Math.random() * rows.length)];
      var items = list.querySelectorAll("details.teaser");
      [].forEach.call(items, function (d) { d.open = false; });
      var idx = rows.indexOf(pick);
      items[idx].open = true;
      items[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    });

    render();
  };
})();
