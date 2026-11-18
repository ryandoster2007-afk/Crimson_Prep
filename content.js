// Hand-edited content. Questions are PRACTICE GUESSES based on typical interviews, not official.
// To add a club: put its BeInvolved key in CLUB_TRACKS (see data/clubs.js for keys).

window.TRACKS = {
  ib: {
    label: "Investment banking / M&A",
    technical: [
      { q: "Walk me through a DCF.", tip: "Project free cash flow for 5–10 years, pick a discount rate (WACC), add a terminal value (growth or exit multiple), discount everything to today, then subtract net debt to get equity value." },
      { q: "What are the three financial statements and how do they connect?", tip: "Net income flows from the income statement into retained earnings on the balance sheet and to the top of the cash flow statement; the cash flow statement's ending cash becomes the balance sheet's cash." },
      { q: "If depreciation goes up by $10, what happens to the three statements?", tip: "Net income falls by $10 x (1 - tax rate). Cash flow adds back the full $10, so cash rises by the tax savings. PP&E falls $10; retained earnings falls by the after-tax amount. Practice saying it out loud." },
      { q: "What's the difference between enterprise value and equity value?", tip: "Equity value is what shareholders own (market cap). Enterprise value adds debt and preferred stock, subtracts cash: it's the value of the whole business to all capital providers." },
      { q: "What is WACC and what goes into it?", tip: "The blended cost of capital: cost of equity (CAPM) weighted by equity share, plus after-tax cost of debt weighted by debt share." },
      { q: "Name three valuation methods and when you'd use each.", tip: "DCF (intrinsic value, stable cash flows), comparable companies (market view), precedent transactions (what acquirers have paid, includes control premium)." },
      { q: "Pitch me a stock or a deal you find interesting.", tip: "Company, thesis in one sentence, two or three supporting points, valuation, and one risk. Keep it under two minutes." }
    ]
  },
  investing: {
    label: "Investing / equity research / portfolio management",
    technical: [
      { q: "Pitch me a stock.", tip: "Business in one sentence, why it's mispriced, 2–3 catalysts, valuation (multiple or DCF), and the biggest risk. Practice a 2-minute version." },
      { q: "How do you value a company?", tip: "Intrinsic (DCF) vs relative (comps like P/E, EV/EBITDA). Say when each makes sense and name their weaknesses." },
      { q: "What does P/E tell you, and when is it misleading?", tip: "Price per dollar of earnings. Misleading for cyclical, unprofitable, or one-off-heavy companies, or with different accounting and capital structures." },
      { q: "What happens to stock prices when interest rates rise?", tip: "Higher discount rates lower the present value of future cash flows, hurting long-duration growth stocks most; also raises borrowing costs. Mention nuances (strong economy, banks)." },
      { q: "How do you think about risk in a portfolio?", tip: "Diversification, position sizing, correlation, volatility vs permanent loss of capital." },
      { q: "Read a recent earnings headline. What do you look at first?", tip: "Revenue and EPS vs expectations, guidance, margins, and what management said about demand." },
      { q: "How would you build a simple portfolio for a long-term investor?", tip: "Goals, time horizon, risk tolerance, diversification across asset classes, low-cost funds, rebalancing." }
    ]
  },
  pwm: {
    label: "Private wealth management",
    roleplay: [
      { q: "Role-play: I'm a 55-year-old client with $1.5M saved who wants to retire at 62. What questions do you ask me first?", tip: "Goals, timeline, income needs, risk tolerance, existing assets and debts, taxes, family situation. Listen before recommending." },
      { q: "Role-play: I'm a 28-year-old client who just got a big bonus and wants to 'get into the stock market.' What do you tell me?", tip: "Emergency fund, high-interest debt, retirement accounts (401k/Roth), then diversified long-term investing. Explain simply." },
      { q: "Role-play: Markets just dropped 15% and I'm panicking and want to sell everything. How do you respond?", tip: "Empathize, revisit the plan and time horizon, explain the cost of selling low, keep the client from emotional decisions." }
    ],
    technical: [
      { q: "SIE-style: What is the difference between a stock and a bond?", tip: "Stock = ownership with variable return; bond = loan to the issuer with fixed interest and repayment of principal." },
      { q: "SIE-style: What is a mutual fund vs an ETF?", tip: "Both pool investors' money. ETFs trade on exchanges all day and are usually lower cost and more tax-efficient; mutual funds price once a day." },
      { q: "SIE-style: What's the difference between a Roth IRA and a traditional IRA?", tip: "Traditional: tax-deductible contributions, taxed on withdrawal. Roth: after-tax contributions, tax-free qualified withdrawals." },
      { q: "SIE-style: What does FINRA do?", tip: "A self-regulatory organization that oversees broker-dealers and registered representatives." },
      { q: "What is diversification and why does it matter?", tip: "Spreading investments so one bad outcome doesn't sink the portfolio; it reduces unsystematic risk." },
      { q: "How do bonds react when interest rates rise?", tip: "Prices fall (inverse relationship); longer-duration bonds fall more." },
      { q: "What's the difference between a fiduciary and a suitability standard?", tip: "Fiduciary: must act in the client's best interest. Suitability: recommendations must be suitable, which is a lower bar." }
    ]
  },
  consulting: {
    label: "Consulting",
    technical: [
      { q: "Market sizing: How many coffee shops are in the US?", tip: "Structure it: population, share who drink coffee, cups per day, how many cups per shop per day. State assumptions out loud and sanity-check the result." },
      { q: "A client's profits dropped 20% this year. How do you figure out why?", tip: "Profit = revenue - costs. Break revenue into price x volume (by segment, channel), costs into fixed vs variable. Then external factors and competitors. Structure first, then dig." },
      { q: "Should a regional grocery chain open 5 new stores?", tip: "Market attractiveness, financials (investment, payback), competition, capabilities, risks. Ask clarifying questions first." },
      { q: "Brain teaser: How many golf balls fit in a school bus?", tip: "Estimate bus volume and ball volume, adjust for packing efficiency (about 64%) and seats." },
      { q: "What is a framework and when does it fail?", tip: "A structure to organize your thinking. Fails when used rigidly instead of tailored to the problem." },
      { q: "Interpret this: sales are up 10% but profit is flat. What could explain it?", tip: "Discounting, rising costs, mix shift to lower-margin products, higher marketing spend." },
      { q: "How would you help a nonprofit increase donations?", tip: "Segment donors, understand current funnel, test messaging and channels, measure results." }
    ]
  },
  marketing: {
    label: "Marketing / sales",
    technical: [
      { q: "Sell me this pen.", tip: "Ask questions to uncover the need first, then tie features to that need. Don't recite features." },
      { q: "What's a brand you admire and why?", tip: "Name the audience, positioning, and one specific campaign or decision. Say what you'd change." },
      { q: "How would you launch a new energy drink on campus?", tip: "Target segment, positioning, channels (social, sampling, partnerships), pricing, how you'd measure success." },
      { q: "What is a marketing funnel?", tip: "Awareness, consideration, conversion, retention. Say which metric you'd track at each stage." },
      { q: "A campaign gets lots of clicks but few sales. What do you check?", tip: "Landing page, targeting mismatch, price, trust signals, checkout friction." },
      { q: "How do you handle rejection?", tip: "Give a real example, what you learned, and how you adjusted." },
      { q: "What are the 4 Ps?", tip: "Product, price, place, promotion. Apply them to a real example." }
    ]
  },
  business: {
    label: "General business",
    technical: [
      { q: "Tell me about a business or company you follow and why.", tip: "Show curiosity: what they do well, a recent move, a risk." },
      { q: "What makes a good team member?", tip: "Reliability, communication, taking initiative, and giving credit. Back it with a story." },
      { q: "How would you pitch our organization to a new student in 30 seconds?", tip: "Shows you've done your research. Use specifics from their website and BeInvolved page." },
      { q: "How do you balance classes, work, and clubs?", tip: "Name your system (calendar, priorities). Be honest and specific." },
      { q: "Basic business: what is the difference between revenue, profit, and cash flow?", tip: "Revenue is sales; profit is revenue minus costs; cash flow is actual money in and out." },
      { q: "What's a professional skill you want to build, and how will this club help?", tip: "Tie it to something the club actually offers." },
      { q: "How would you handle a teammate who isn't contributing?", tip: "Talk to them first, understand why, set clear expectations, escalate only if needed." }
    ]
  },
  fraternity: {
    label: "Business fraternity",
    technical: [
      { q: "Why do you want to join this fraternity?", tip: "Connect the chapter's values and brotherhood to something you've already done. Name one specific event, member, or tradition that stood out to you." },
      { q: "What sets you apart from the other candidates?", tip: "Pick two or three strengths you can back up with a real example. Skip generic claims like 'hard worker' unless you can prove them." },
      { q: "Name five brothers you met during rush, and what you talked about with each of them.", tip: "Only name people you actually met. For each one, remember a specific detail from your conversation, such as a shared interest, a question they asked, or advice they gave." },
      { q: "If you had to cut one person you met during rush, who would it be?", tip: "Try to deny the question at first. If they make you choose, say yourself." },
      { q: "How would you contribute to the chapter during your first semester?", tip: "Name one or two concrete things, like a committee, an event, or a skill you'd bring. Specifics beat generic answers." }
    ]
  }
};

window.BEHAVIORAL = [
  { q: "Tell me about yourself.", tip: "60–90 seconds: where you're from, what you've done at IU/Kelley, why this club. Present, past, future." },
  { q: "Why do you want to join this club?", tip: "Be specific: name something from the club's page or a member you spoke to, and what you'll contribute." },
  { q: "Tell me about a time you led a team or took initiative.", tip: "Use STAR: Situation, Task, Action, Result. Quantify the result if you can." },
  { q: "Tell me about a time you failed. What did you learn?", tip: "Pick a real failure, own it, and show what you changed." },
  { q: "Describe a time you worked with someone difficult.", tip: "Focus on what you did to resolve it, not on blaming them." },
  { q: "Tell me about a time you had to learn something quickly.", tip: "Show your process for learning and the outcome." },
  { q: "What's your greatest strength and weakness?", tip: "Real weakness plus what you're doing about it." }
];

window.MARKET = [
  { q: "What's one market trend you're following right now?", tip: "Pick something you can talk about for a minute: what's happening, why, who it affects, and your view." },
  { q: "What are interest rates at right now?", tip: "Know the current Fed funds target range. Say where it's been and where the market expects it to go. Check today's number before your interview." },
  { q: "What is the Fed doing, and why?", tip: "Dual mandate: stable prices and maximum employment. Explain the latest decision, the inflation and jobs data behind it, and what's next." },
  { q: "Where is the S&P 500 and what's been driving it?", tip: "Know the approximate level and year-to-date move, plus the sectors or megacaps driving it." },
  { q: "What's the 10-year Treasury yield, and why does it matter?", tip: "Benchmark for borrowing costs and valuations. Know the rough level and recent direction." },
  { q: "What's inflation doing?", tip: "Know the latest CPI and what's driving it, like shelter, services, or energy." },
  { q: "What deal, IPO, or earnings report caught your attention recently?", tip: "Have one ready with the basic numbers and why it matters." },
  { q: "How do rate cuts affect stocks vs bonds?", tip: "Bond prices rise when rates fall. Stocks often benefit from lower discount rates, but depends why the Fed is cutting." },
  { q: "What's one risk to the economy or markets right now?", tip: "Pick one: tariffs, geopolitics, valuations, debt, labor market. Explain the channel." },
  { q: "What's a headline from this week and what do you think it means?", tip: "Read WSJ, Bloomberg, CNBC, or Morning Brew the morning of your interview." }
];

window.MARKET_SOURCES = [
  { label: "Federal Reserve: policy and rates", url: "https://www.federalreserve.gov/monetarypolicy.htm" },
  { label: "U.S. Treasury: daily yield curve", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" },
  { label: "BLS: inflation (CPI)", url: "https://www.bls.gov/cpi/" },
  { label: "CNBC Markets", url: "https://www.cnbc.com/markets/" },
  { label: "Wall Street Journal Markets", url: "https://www.wsj.com/market-data" }
];

// BeInvolved key -> tracks (checked against data/clubs.js)
window.CLUB_TRACKS = {
  capitalmarketsclub: ["ib", "pwm"],
  financialinvestmentreview: ["investing"],
  portfoliomanagementclub: ["investing"],
  bankingandtradingassociation: ["ib"],
  maa: ["ib"],
  fsc: ["pwm", "ib"],
  aig: ["investing"],
  cigatiu: ["investing"],
  rxdi: ["ib", "investing"],
  "812consulting": ["consulting"],
  "180dc": ["consulting"],
  tamidatiu: ["consulting", "investing"],
  "101stem": ["consulting"],
  bsg: ["consulting"],
  akpsi: ["fraternity"],
  dsp: ["fraternity"],
  pgn: ["fraternity"],
  pct: ["fraternity"]
};

// Clubs we've checked by hand so they show a "priority" tag. Not a ranking.
window.FEATURED = Object.keys(window.CLUB_TRACKS);

// Files live in /resumes. pdf = view in browser; docx = editable copy (open in Microsoft Word).
window.RESUMES = [
  { title: "IBN Resume Template", for: "This is a great template for all of the clubs, specifically IB and IM.", pdf: "resumes/IBN-Resume-Template.pdf", docx: "resumes/IBN-Resume-Template.docx" }
];

window.RESUME_RULES = [
  {
    group: "Format",
    items: [
      "One page, always.",
      "Fill at least 75% of the page. No big blocks of white space at the bottom. If it's short, add real experience, activities, or coursework, not padding.",
      "Margins between 0.5\" and 1\" on all sides.",
      "One clean, standard font (Times New Roman, Calibri, Arial, or similar) at 10–12 pt. Name can be larger.",
      "Same formatting everywhere: bold, italics, dates, and bullet style should be consistent.",
      "No photo, graphics, icons, tables, text boxes, or multiple columns. Applicant-tracking systems can't read them.",
      "Put your name and contact info in the body of the page, not the header. Systems often skip headers.",
      "Edit your resume in Microsoft Word, not Google Docs. Google Docs can shift spacing, fonts, and margins when you export, and your formatting may break.",
      "Save and send as a PDF named FirstName_LastName_Resume.pdf, unless the club asks for something else. Check the PDF before you send it."
    ]
  },
  {
    group: "Content",
    items: [
      "Reverse-chronological order (newest first) inside every section.",
      "Education goes first. List Indiana University, Kelley School of Business, your degree, and expected graduation date. List your GPA only if it's above 2.5 (Kelley guidance).",
      "Start every bullet with a strong action verb. Use past tense for past roles and present tense for current ones.",
      "Don't start two bullets in a row with the same verb.",
      "Show results with numbers: how many, how much, how often.",
      "Aim for 2–4 bullets per role. Keep each to one or two lines.",
      "No paragraphs, no \"I\" or \"my,\" and no \"references available upon request.\"",
      "Use consistent date formats (for example, Aug 2025 – May 2026) and right-align them.",
      "Spell out acronyms the first time unless everyone in the industry knows them.",
      "Use a professional email (your IU address is best) and a LinkedIn link. Leave off your full home address."
    ]
  },
  {
    group: "Before You Submit",
    items: [
      "Proofread twice. Then read it out loud, then have someone else read it. One typo can sink an application.",
      "Get it reviewed by Kelley Undergraduate Career Services (KelleyUCS@iu.edu) at least once, ideally twice, before recruiting season.",
      "Tailor it: pull words from the club's description so your resume matches what they care about.",
      "Clubs may ask for their own format. Check each club's application page or ask an officer."
    ]
  }
];
