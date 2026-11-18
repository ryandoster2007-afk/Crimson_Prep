// Cheat sheets. Edit freely. Each sheet: id, title, tagline, sections[{h, items[] or steps[] or example}]
// General study notes, not official club material. Verify anything exam-specific (like SIE) on the official site.
window.CHEATSHEETS = [
  {
    id: "dcf",
    title: "DCF Walk-Through",
    tagline: "The question every banking interview opens with.",
    sections: [
      { h: "The 7 steps (say them in this order)", steps: [
        "Project unlevered free cash flow for 5–10 years: EBIT × (1 – tax rate) + D&A – CapEx – increase in net working capital.",
        "Pick a discount rate. Use WACC = E/(D+E) × cost of equity + D/(D+E) × cost of debt × (1 – tax rate). Cost of equity comes from CAPM: risk-free rate + beta × equity risk premium.",
        "Calculate a terminal value for everything after the forecast. Growth method: final-year FCF × (1 + g) ÷ (WACC – g). Exit multiple method: final-year EBITDA × a comparable multiple.",
        "Discount each year's cash flow and the terminal value back to today: PV = cash flow ÷ (1 + WACC)^year.",
        "Add the present values. That sum is enterprise value.",
        "Convert to equity value: enterprise value – debt – preferred stock – minority interest + cash.",
        "Divide equity value by diluted shares to get an implied share price, then compare it with the market price."
      ]},
      { h: "Follow-ups they love", items: [
        "Why do we use unlevered free cash flow? Because the effect of debt is already captured in WACC. Using levered cash flow would count it twice.",
        "What happens to value if WACC goes up? Enterprise value falls, because future cash flows are discounted more heavily. Long-dated cash flows and terminal value get hit hardest.",
        "How much of the value is usually the terminal value? Often 60–80%, which is why the assumptions behind it matter so much.",
        "What are the weaknesses of a DCF? Very sensitive to growth and discount rate assumptions, and hard to forecast for early-stage or cyclical companies. That's why bankers show a sensitivity table.",
        "What's a reasonable terminal growth rate? Usually at or below long-run GDP or inflation, roughly 2–3%. A rate above the growth of the economy forever doesn't make sense."
      ]}
    ]
  },
  {
    id: "statements",
    title: "Three Statements",
    tagline: "If you can't connect them, nothing else matters.",
    sections: [
      { h: "What each one shows", items: [
        "Income statement: revenue minus expenses over a period, ending in net income.",
        "Balance sheet: a snapshot of assets, liabilities, and equity. Assets = liabilities + shareholders' equity, always.",
        "Cash flow statement: where cash came from and went, split into operating, investing, and financing, ending in the change in cash."
      ]},
      { h: "How they link", items: [
        "Net income flows to retained earnings on the balance sheet and is the first line of the cash flow statement.",
        "Depreciation lowers net income but is a non-cash expense, so it's added back on the cash flow statement.",
        "CapEx appears in investing cash flow and increases PP&E on the balance sheet.",
        "Debt issuance or repayment appears in financing cash flow and changes debt on the balance sheet.",
        "Ending cash on the cash flow statement becomes cash on the balance sheet."
      ]},
      { h: "Practice: depreciation goes up by $10 (assume a 30% tax rate)", steps: [
        "Income statement: pre-tax income falls by $10. Taxes fall by $3. Net income falls by $7.",
        "Cash flow statement: start with net income (–$7), add back depreciation (+$10). Cash rises by $3, which is the tax savings.",
        "Balance sheet: PP&E falls by $10 and cash rises by $3, so assets fall by $7. Retained earnings falls by $7. It balances."
      ]},
      { h: "Practice: the company buys $100 of equipment with cash", steps: [
        "Income statement: no immediate change.",
        "Cash flow statement: investing cash flow is –$100.",
        "Balance sheet: cash falls by $100, PP&E rises by $100. Total assets are unchanged."
      ]},
      { h: "Practice: the company borrows $50", steps: [
        "Cash flow statement: financing cash flow is +$50.",
        "Balance sheet: cash rises by $50 and debt rises by $50. Both sides rise equally."
      ]}
    ]
  },
  {
    id: "valuation",
    title: "Valuation Basics",
    tagline: "Enterprise value, multiples, and which method to use.",
    sections: [
      { h: "The bridge", items: [
        "Equity value = share price × diluted shares outstanding.",
        "Enterprise value = equity value + debt + preferred stock + minority interest – cash.",
        "Use enterprise value multiples (EV/EBITDA, EV/Revenue) for metrics that come before interest, because they ignore capital structure. Use equity multiples (P/E, P/B) for metrics that come after interest."
      ]},
      { h: "The main methods", items: [
        "Comparable companies: find similar public companies, calculate their multiples, and apply them to your target. Shows what the market pays today.",
        "Precedent transactions: multiples paid in past acquisitions. Usually higher than comps because buyers pay a control premium.",
        "DCF: value from the company's own projected cash flows. Most flexible, most assumption-dependent.",
        "LBO analysis: what a private equity buyer could pay and still hit a target return, often 20–25% IRR."
      ]},
      { h: "Quick formulas", items: [
        "EBITDA = EBIT + depreciation & amortization.",
        "EPS = net income ÷ diluted shares. P/E = price ÷ EPS.",
        "CAGR = (ending value ÷ starting value)^(1 ÷ years) – 1.",
        "Rule of 72: years to double ≈ 72 ÷ annual return in percent.",
        "ROE = net income ÷ shareholders' equity."
      ]},
      { h: "Merger math, simplified", items: [
        "All-stock deal: usually accretive to the acquirer when the acquirer's P/E is higher than the target's P/E.",
        "Cash deal: accretive when the target's earnings yield (E/P) is higher than the after-tax cost of the cash or debt used.",
        "Accretive means the acquirer's EPS goes up after the deal. Dilutive means it goes down."
      ]}
    ]
  },
  {
    id: "macro",
    title: "Markets and the Fed",
    tagline: "How to talk about rates, inflation, and the economy.",
    sections: [
      { h: "The Fed in plain English", items: [
        "The Federal Reserve has a dual mandate: stable prices (about 2% inflation) and maximum employment.",
        "Its main tool is the federal funds rate target. The FOMC meets about eight times a year to set it.",
        "Other tools: its balance sheet (buying bonds is QE, letting bonds roll off is QT) and forward guidance about what it plans to do.",
        "Higher rates slow borrowing and spending to cool inflation. Lower rates do the opposite to support growth."
      ]},
      { h: "Rules of thumb you should be able to explain", items: [
        "Bond prices move opposite to yields. Longer-maturity bonds move more when rates change.",
        "Higher discount rates reduce the present value of future cash flows, which hurts growth stocks most.",
        "An inverted yield curve (short-term yields above long-term) has often come before slowdowns, but it isn't a guarantee.",
        "CPI measures consumer inflation. PCE is the inflation measure the Fed prefers.",
        "Strong jobs data can push rate-cut expectations later, because it suggests the economy doesn't need help."
      ]},
      { h: "How to answer 'What's one trend you're following?'", steps: [
        "Name it in one sentence.",
        "Explain why it's happening with one or two facts.",
        "Say who wins and who loses.",
        "Give your view and one thing that would change your mind."
      ]}
    ]
  },
  {
    id: "consulting",
    title: "Consulting Cases",
    tagline: "Structure first, math second, answer up front.",
    sections: [
      { h: "How a case flows", steps: [
        "Listen and restate the question. Ask 2–3 clarifying questions (goal, timeline, constraints).",
        "Ask for a minute to build a structure, then walk the interviewer through it.",
        "Pick the branch that matters most and dig in with numbers.",
        "Finish with a short recommendation: answer first, two or three reasons, one risk, and next steps."
      ]},
      { h: "Profitability frame", items: [
        "Profit = revenue – costs.",
        "Revenue = price × volume. Split by product, customer segment, and channel.",
        "Costs = fixed + variable. Split by internal drivers and external ones.",
        "Then check what changed: over time, versus competitors, and versus the industry."
      ]},
      { h: "Market entry frame", items: [
        "Market: size, growth, competition, customer needs.",
        "Company: capabilities, brand, resources.",
        "Entry mode: build, buy, or partner.",
        "Financials: investment, break-even point, payback.",
        "Risks and how to reduce them."
      ]},
      { h: "Market sizing", steps: [
        "Choose top-down (start from population) or bottom-up (start from one unit, like one store).",
        "Break the number into 3–4 pieces you can estimate and say each assumption out loud.",
        "Use round numbers to keep the math easy.",
        "Multiply, then sanity-check against something you know."
      ]},
      { h: "Habits that impress", items: [
        "Say your structure out loud and signpost: 'First I'll look at X, then Y.'",
        "State the math as you go and check units.",
        "Lead with the answer, then support it.",
        "Stay calm when the interviewer pushes back. Treat it as new information, not as a mistake."
      ]}
    ]
  },
  {
    id: "sie",
    title: "SIE and Wealth Management",
    tagline: "Securities basics for private wealth interviews.",
    sections: [
      { h: "The exam at a glance (confirm on FINRA.org before relying on it)", items: [
        "The Securities Industry Essentials (SIE) exam covers the basics of the securities industry. It's a prerequisite for most registered representative roles, along with a Series exam.",
        "It's a multiple-choice, timed exam. Check FINRA's current content outline for the number of questions, time limit, and passing score.",
        "Topics: capital markets, products and their risks, trading and customer accounts, and the regulatory framework."
      ]},
      { h: "Products", items: [
        "Common stock: ownership, voting rights, variable dividends. Preferred stock: fixed dividend, higher claim than common.",
        "Bonds: a loan to the issuer. Coupon is the interest rate, maturity is when principal is repaid, par is usually $1,000.",
        "Municipal bonds: issued by states and cities, often tax-advantaged. Treasuries: issued by the U.S. government.",
        "Mutual funds price once a day. ETFs trade on an exchange all day.",
        "Options: a call is the right to buy, a put is the right to sell, at a set price before expiration."
      ]},
      { h: "Orders and rules", items: [
        "Market order: buy or sell now at the best available price. Limit order: only at your price or better. Stop order: becomes a market order once a trigger price is hit.",
        "Regulators: the SEC (federal law), FINRA (broker-dealers), and the MSRB (municipal securities).",
        "Recommendations must be in the client's best interest (Regulation Best Interest) and based on their profile: goals, time horizon, risk tolerance, and finances."
      ]},
      { h: "Client role-play checklist", steps: [
        "Ask about goals and timeline first.",
        "Ask about income, assets, debts, and taxes.",
        "Find out how much risk they're comfortable with, especially during a drop.",
        "Explain your recommendation in plain English and why it fits them.",
        "Agree on next steps and follow up."
      ]}
    ]
  }
];
