import type { Opportunity } from "@/types/opportunity";

/**
 * Development fixtures.
 *
 * Every record here is invented. The companies, people, revenue figures and
 * verification records do not exist. They are shaped to exercise the UI at
 * realistic density and are surfaced behind a visible development-data banner.
 *
 * Rules for editing this file:
 *   - No real company, person or investor may be named.
 *   - No claim of investment performance or returns.
 *   - Verification entries describe a plausible check, never a real one.
 *   - Every record must keep `isDevData: true`.
 */

export const devOpportunities: Opportunity[] = [
  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b01",
    slug: "hillharvest",
    name: "HillHarvest",
    summary:
      "Turning local agricultural supply into a modern regional food network.",
    sector: "agriculture",
    location: { city: "Bandarban", region: "Chattogram Hill Tracts", country: "Bangladesh" },
    stage: "revenue",
    needs: ["capital", "distribution"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 2_500_000,
    metrics: {
      monthlyRevenueBdt: 420_000,
      monthlyGrowthPct: 11,
      customers: 340,
      teamSize: 7,
      founderContributionBdt: 900_000,
      operatingSince: "2024-03",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement:
          "Both founders completed government ID verification in June 2026.",
        verifiedAt: "2026-06-14T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement:
          "Trade licence and RJSC incorporation certificate reviewed against the public register.",
        verifiedAt: "2026-06-20T00:00:00.000Z",
      },
      {
        kind: "revenue",
        status: "evidence_verified",
        statement:
          "Six months of bank statements reviewed. Reported monthly revenue is consistent with deposits.",
        verifiedAt: "2026-07-02T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 71,
      label: "Revenue",
      signals: [
        { label: "Problem clarity", score: 88, note: "Post-harvest loss is well documented in the region." },
        { label: "Market evidence", score: 74, note: "Regional demand sized from wholesale buyer contracts." },
        { label: "Customer validation", score: 82, note: "340 repeat buyers across two districts." },
        { label: "Product", score: 70, note: "Aggregation and cold-chain workflow running; software is manual." },
        { label: "Traction", score: 79, note: "Eleven consecutive months of revenue growth." },
        { label: "Financial model", score: 48, note: "No multi-year model with unit economics yet." },
        { label: "Team", score: 66, note: "Strong operations; no finance lead." },
        { label: "Legal readiness", score: 62, note: "Incorporated. Cap table not yet formalised." },
      ],
    },
    fitScore: {
      overall: 91,
      dimensions: { sector: 94, capital: 98, stage: 91, geography: 87, strategic: 89 },
      explanation:
        "You appear strongly aligned because you prefer early-revenue agriculture and food supply opportunities in South Asia with tickets between \u09f310L and \u09f350L.",
    },
    narrative: {
      opportunity:
        "Smallholder farms across the Chattogram Hill Tracts grow high-value produce but sell into a fragmented chain of intermediaries. HillHarvest aggregates supply at the district level, handles grading and cold storage, and sells directly to urban wholesale buyers.",
      whyNow:
        "Two new cold storage facilities opened within 40km in the last eighteen months, and road access to Chattogram improved materially in 2025. The margin that previously disappeared into spoilage and intermediaries is now recoverable.",
      problem:
        "Growers lose an estimated third of harvest value to spoilage and forced sales at the farmgate. They have no visibility into urban pricing and no ability to hold stock for better terms.",
      solution:
        "A district aggregation point with grading, cold storage and a standing offtake agreement. Growers get same-day payment at a published price; buyers get graded, consistent volume.",
      traction:
        "Operating since March 2024. 340 growers supplying regularly, \u09f34.2L monthly revenue, growing about 11% month over month across the last two quarters. Two wholesale offtake contracts in Chattogram.",
      businessModel:
        "Margin on aggregated volume, currently averaging 18%. Growers are paid a published farmgate rate; HillHarvest captures the grading and logistics spread.",
      market:
        "The immediate market is the produce flowing through three districts of the Hill Tracts into Chattogram wholesale. Expansion depends on replicating the aggregation point rather than on new demand.",
      capital:
        "\u09f325L to fund a second aggregation point, a refrigerated vehicle, and eight months of working capital for grower advances.",
      whatWeNeed:
        "Capital, and a distribution partner with existing urban wholesale relationships. We are not looking for a co-founder.",
    },
    useOfFunds: [
      { label: "Second aggregation point", percentage: 40, detail: "Site lease, grading equipment and cold storage." },
      { label: "Refrigerated vehicle", percentage: 25, detail: "Removes dependence on third-party cold transport." },
      { label: "Working capital", percentage: 25, detail: "Same-day grower payments across eight months." },
      { label: "Finance hire", percentage: 10, detail: "Part-time finance lead to build the model and controls." },
    ],
    team: [
      {
        name: "Nusrat Chakma",
        role: "Co-founder, Operations",
        bio: "Ran procurement for a regional produce wholesaler for six years before starting HillHarvest.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Imran Hossain",
        role: "Co-founder, Commercial",
        bio: "Built the Chattogram buyer relationships. Previously managed a cold storage facility.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-12",
        title: "Second offtake contract signed",
        body: "A Chattogram wholesale buyer committed to a minimum monthly volume through March 2027, which underwrites roughly 40% of current output.",
      },
      {
        date: "2026-07-04",
        title: "Revenue evidence verified",
        body: "Six months of bank statements were reviewed and matched against reported revenue.",
      },
    ],
    questions: [
      {
        question: "What happens to margins if a third-party cold transport provider raises rates?",
        answer:
          "Cold transport is currently about 6% of cost of goods. A 30% rate increase would compress our margin from 18% to roughly 16%. The refrigerated vehicle in this raise removes most of that exposure.",
        askedBy: "An investor exploring agriculture supply chains",
        answeredAt: "2026-08-18",
      },
      {
        question: "How concentrated is revenue across the two offtake contracts?",
        answer: null,
        askedBy: "An investor exploring agriculture supply chains",
        answeredAt: null,
      },
    ],
    publishedAt: "2026-06-22T00:00:00.000Z",
    lastActiveAt: "2026-08-29T09:00:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b02",
    slug: "tarowa-stays",
    name: "Tarowa Stays",
    summary:
      "Bringing scattered hill-district guesthouses onto one bookable, quality-checked network.",
    sector: "hospitality",
    location: { city: "Rangamati", region: "Chattogram Hill Tracts", country: "Bangladesh" },
    stage: "mvp",
    needs: ["capital", "partner", "technology"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 1_200_000,
    metrics: {
      monthlyRevenueBdt: 95_000,
      monthlyGrowthPct: 19,
      customers: 62,
      teamSize: 4,
      founderContributionBdt: 350_000,
      operatingSince: "2025-09",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification in July 2026.",
        verifiedAt: "2026-07-08T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "profile_reviewed",
        statement:
          "Trade licence submitted and under review. Incorporation not yet confirmed against the register.",
        verifiedAt: null,
      },
    ],
    readiness: {
      score: 54,
      label: "MVP",
      signals: [
        { label: "Problem clarity", score: 80, note: "Guesthouse owners have no booking channel beyond phone." },
        { label: "Market evidence", score: 58, note: "Domestic tourism data is directional, not property-level." },
        { label: "Customer validation", score: 64, note: "62 completed bookings through the MVP." },
        { label: "Product", score: 55, note: "Booking flow works; payments are still manual." },
        { label: "Traction", score: 49, note: "Eleven months of operation, revenue still small." },
        { label: "Financial model", score: 35, note: "No cohort or seasonality model yet." },
        { label: "Team", score: 52, note: "No in-house engineering." },
        { label: "Legal readiness", score: 40, note: "Registration in progress." },
      ],
    },
    fitScore: {
      overall: 78,
      dimensions: { sector: 88, capital: 84, stage: 68, geography: 87, strategic: 63 },
      explanation:
        "You appear well aligned on sector and geography. Stage is earlier than the range you usually back, which is the main gap.",
    },
    narrative: {
      opportunity:
        "Roughly 200 small guesthouses operate across Rangamati and Khagrachhari. Almost none are bookable online. Tarowa Stays lists quality-checked properties and handles booking and payment.",
      whyNow:
        "Domestic travel to the hill districts recovered strongly through 2025, but supply remains invisible to travellers who plan online. The gap is distribution, not demand.",
      problem:
        "Travellers cannot see or book hill-district accommodation in advance, so they default to a handful of known hotels. Guesthouse owners rely on walk-ins and phone bookings and run low occupancy midweek.",
      solution:
        "A curated listing network with an in-person quality check, photography, online booking and settled payments. Owners keep their own pricing.",
      traction:
        "Live since September 2025 with 28 listed properties and 62 completed bookings. Monthly booking value is about \u09f395K, growing roughly 19% month over month from a small base.",
      businessModel:
        "15% commission on completed bookings, charged to the property. No listing fee.",
      market:
        "Directly addressable supply is the 200-odd guesthouses across two districts. The constraint on growth is onboarding speed and trust, not the size of the market.",
      capital:
        "\u09f312L to fund property onboarding across a second district, an automated payment flow, and twelve months of runway for a two-person onboarding team.",
      whatWeNeed:
        "Capital, a payments partner who can settle to small rural operators, and a technical partner to replace the manual payment step.",
    },
    useOfFunds: [
      { label: "Property onboarding", percentage: 45, detail: "Field team, quality checks and photography for a second district." },
      { label: "Payments integration", percentage: 30, detail: "Automated settlement to property owners." },
      { label: "Runway", percentage: 25, detail: "Twelve months for the existing team." },
    ],
    team: [
      {
        name: "Anika Tanchangya",
        role: "Founder",
        bio: "Managed a family guesthouse in Rangamati for four years, then spent two years in hotel operations in Dhaka.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Rafiq Uddin",
        role: "Operations lead",
        bio: "Handles property onboarding and quality checks across both districts.",
        avatarUrl: null,
        identityVerified: false,
      },
    ],
    updates: [
      {
        date: "2026-08-05",
        title: "28th property onboarded",
        body: "Onboarding is now averaging four properties a month, up from one and a half at the start of the year.",
      },
    ],
    questions: [
      {
        question: "What is the repeat booking rate?",
        answer:
          "Too early to state with confidence. Of 62 bookings, nine were repeat travellers, but the sample is small and covers less than a full seasonal cycle.",
        askedBy: "An investor exploring hospitality",
        answeredAt: "2026-08-20",
      },
    ],
    publishedAt: "2026-07-10T00:00:00.000Z",
    lastActiveAt: "2026-08-28T14:30:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b03",
    slug: "meghla-diagnostics",
    name: "Meghla Diagnostics",
    summary:
      "Same-day pathology results for district towns that currently wait three days.",
    sector: "healthcare",
    location: { city: "Sylhet", region: "Sylhet Division", country: "Bangladesh" },
    stage: "revenue",
    needs: ["capital", "expertise"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 8_000_000,
    metrics: {
      monthlyRevenueBdt: 1_150_000,
      monthlyGrowthPct: 7,
      customers: 2_400,
      teamSize: 19,
      founderContributionBdt: 2_200_000,
      operatingSince: "2023-11",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "All three founders completed government ID verification.",
        verifiedAt: "2026-04-02T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Incorporation certificate and diagnostic facility licence reviewed.",
        verifiedAt: "2026-04-09T00:00:00.000Z",
      },
      {
        kind: "revenue",
        status: "evidence_verified",
        statement: "Twelve months of audited accounts reviewed against reported revenue.",
        verifiedAt: "2026-05-15T00:00:00.000Z",
      },
      {
        kind: "legal",
        status: "evidence_verified",
        statement: "Cap table and shareholder agreement reviewed by an independent reviewer.",
        verifiedAt: "2026-05-20T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 86,
      label: "Investor Ready",
      signals: [
        { label: "Problem clarity", score: 92, note: "Turnaround time is the stated reason patients travel to Dhaka." },
        { label: "Market evidence", score: 84, note: "Referral volume documented across 40 clinics." },
        { label: "Customer validation", score: 90, note: "2,400 monthly tests with a stable referral base." },
        { label: "Product", score: 85, note: "Two labs operating with a courier network." },
        { label: "Traction", score: 88, note: "Thirty-one months of continuous operation." },
        { label: "Financial model", score: 82, note: "Three-year model with per-test unit economics." },
        { label: "Team", score: 84, note: "Clinical and operational leadership in place." },
        { label: "Legal readiness", score: 87, note: "Cap table formalised, licences current." },
      ],
    },
    fitScore: {
      overall: 64,
      dimensions: { sector: 55, capital: 42, stage: 88, geography: 87, strategic: 71 },
      explanation:
        "Stage and geography match your preferences, but the \u09f380L ticket sits well above the \u09f310L\u2013\u09f350L range you have set.",
    },
    narrative: {
      opportunity:
        "Patients in Sylhet's district towns routinely wait three days for pathology results, or travel to Dhaka. Meghla runs two labs and a courier network that returns most results the same day.",
      whyNow:
        "Referral clinics have consolidated enough that a single lab can now serve forty of them economically. That density did not exist three years ago.",
      problem:
        "Delayed diagnostics change treatment decisions. Local clinics either send samples to Dhaka or refer the patient there entirely, which is expensive and slow.",
      solution:
        "Two regional labs, a scheduled courier circuit covering forty referral clinics, and digital result delivery. Most tests are returned within the same working day.",
      traction:
        "Operating since November 2023. About 2,400 tests a month across forty referring clinics, \u09f311.5L monthly revenue, growing around 7% month over month.",
      businessModel:
        "Fee per test, with volume rates for referring clinics. Courier logistics are run in-house.",
      market:
        "Sylhet Division's diagnostic volume currently routed to Dhaka. Expansion means adding lab capacity in adjacent divisions on the same referral model.",
      capital:
        "\u09f380L to fund a third lab, additional analyser capacity, and the working capital required to extend the courier circuit.",
      whatWeNeed:
        "Capital, and an advisor with regulatory experience in multi-site diagnostic operations.",
    },
    useOfFunds: [
      { label: "Third lab", percentage: 45, detail: "Site, fit-out and licensing in an adjacent district." },
      { label: "Analyser capacity", percentage: 30, detail: "Equipment to lift throughput at the two existing labs." },
      { label: "Courier expansion", percentage: 15, detail: "Vehicles and staff for a wider collection circuit." },
      { label: "Working capital", percentage: 10, detail: "Receivables cycle with referring clinics." },
    ],
    team: [
      {
        name: "Dr. Farhana Rahman",
        role: "Co-founder, Clinical",
        bio: "Pathologist. Fourteen years in hospital laboratory medicine before founding Meghla.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Tanvir Ahmed",
        role: "Co-founder, Operations",
        bio: "Built the courier circuit and referral network. Background in regional logistics.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Shirin Akter",
        role: "Co-founder, Finance",
        bio: "Chartered accountant. Runs the financial model and the audit relationship.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-22",
        title: "Fortieth referring clinic added",
        body: "The courier circuit now covers forty clinics without adding a vehicle, which improves route economics.",
      },
      {
        date: "2026-05-21",
        title: "Cap table review completed",
        body: "An independent reviewer confirmed the cap table and shareholder agreement are consistent and current.",
      },
    ],
    questions: [
      {
        question: "What share of tests actually return same-day?",
        answer:
          "Around 78% over the last quarter. The remainder are either specialised assays sent out or samples collected after the final courier run.",
        askedBy: "An investor exploring healthcare services",
        answeredAt: "2026-08-25",
      },
    ],
    publishedAt: "2026-05-01T00:00:00.000Z",
    lastActiveAt: "2026-08-30T07:15:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b04",
    slug: "shikha-learning",
    name: "Shikha Learning",
    summary:
      "Rebuilding secondary maths teaching around what students actually get wrong.",
    sector: "education",
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    stage: "prototype",
    needs: ["co_founder", "capital", "talent"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 3_500_000,
    metrics: {
      monthlyRevenueBdt: null,
      monthlyGrowthPct: null,
      customers: 180,
      teamSize: 3,
      founderContributionBdt: 400_000,
      operatingSince: "2026-01",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification in August 2026.",
        verifiedAt: "2026-08-03T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 38,
      label: "Prototype",
      signals: [
        { label: "Problem clarity", score: 76, note: "Misconception patterns documented across 180 students." },
        { label: "Market evidence", score: 42, note: "No pricing research with paying parents yet." },
        { label: "Customer validation", score: 45, note: "Free pilot only; willingness to pay untested." },
        { label: "Product", score: 40, note: "Prototype covers one year group." },
        { label: "Traction", score: 22, note: "No revenue." },
        { label: "Financial model", score: 18, note: "Not yet built." },
        { label: "Team", score: 35, note: "No engineering co-founder." },
        { label: "Legal readiness", score: 25, note: "Not yet incorporated." },
      ],
    },
    fitScore: null,
    narrative: {
      opportunity:
        "Secondary maths instruction is paced to a syllabus rather than to comprehension. Shikha diagnoses the specific misconceptions a student holds and sequences practice against them.",
      whyNow:
        "Enough students now have reliable shared-device access after school hours that a practice product can reach them outside the classroom, which was not true five years ago.",
      problem:
        "Students fall behind for identifiable, repeatable reasons, but teachers with sixty-student classes cannot diagnose individually. Coaching centres re-teach the same syllabus at the same pace.",
      solution:
        "A diagnostic that maps a student's specific errors to a known misconception set, then generates targeted practice. Teachers get a class-level view of where the cohort is stuck.",
      traction:
        "Prototype running with 180 students across three schools since January 2026, free of charge. The misconception mapping is producing consistent, teacher-recognisable results.",
      businessModel:
        "Intended as a per-student subscription sold to schools, with a lower direct-to-parent tier. Neither has been priced with paying customers yet.",
      market:
        "Secondary maths students in urban Bangladesh, reached through schools rather than individually.",
      capital:
        "\u09f335L to fund eighteen months of runway for a small team while extending the product to three year groups and running a paid pilot.",
      whatWeNeed:
        "A technical co-founder above all. Capital and a curriculum specialist after that.",
    },
    useOfFunds: [
      { label: "Team runway", percentage: 55, detail: "Eighteen months for three people." },
      { label: "Content build", percentage: 30, detail: "Extending the misconception set to three year groups." },
      { label: "Paid pilot", percentage: 15, detail: "Running and measuring a priced pilot in five schools." },
    ],
    team: [
      {
        name: "Sadia Islam",
        role: "Founder",
        bio: "Taught secondary maths for nine years and built the original misconception framework in the classroom.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-14",
        title: "Third school joined the pilot",
        body: "The pilot now covers 180 students. The misconception mapping held up on a cohort the framework was not developed against.",
      },
    ],
    questions: [],
    publishedAt: "2026-08-06T00:00:00.000Z",
    lastActiveAt: "2026-08-29T18:45:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b05",
    slug: "roddur-solar",
    name: "Roddur Solar",
    summary:
      "Financing rooftop solar for small factories that cannot get a bank to underwrite it.",
    sector: "climate",
    location: { city: "Gazipur", region: "Dhaka Division", country: "Bangladesh" },
    stage: "revenue",
    needs: ["capital", "partner"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 15_000_000,
    metrics: {
      monthlyRevenueBdt: 780_000,
      monthlyGrowthPct: 9,
      customers: 23,
      teamSize: 12,
      founderContributionBdt: 3_000_000,
      operatingSince: "2024-08",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Both founders completed government ID verification.",
        verifiedAt: "2026-03-11T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Incorporation certificate reviewed against the public register.",
        verifiedAt: "2026-03-18T00:00:00.000Z",
      },
      {
        kind: "revenue",
        status: "evidence_verified",
        statement:
          "Signed power purchase agreements for 23 installations reviewed alongside twelve months of collections.",
        verifiedAt: "2026-06-30T00:00:00.000Z",
      },
      {
        kind: "customers",
        status: "evidence_verified",
        statement: "Nine customer references contacted and confirmed by an independent reviewer.",
        verifiedAt: "2026-07-14T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 79,
      label: "Investor Ready",
      signals: [
        { label: "Problem clarity", score: 90, note: "Grid unreliability and diesel cost are quantified per site." },
        { label: "Market evidence", score: 82, note: "Pipeline of 60 qualified factory sites." },
        { label: "Customer validation", score: 86, note: "23 signed 10-year power purchase agreements." },
        { label: "Product", score: 78, note: "Installation and monitoring standardised across sites." },
        { label: "Traction", score: 80, note: "Two years of collections with no defaults to date." },
        { label: "Financial model", score: 74, note: "Model exists; stress testing on default assumptions is thin." },
        { label: "Team", score: 72, note: "Engineering strong; no structured-finance experience in-house." },
        { label: "Legal readiness", score: 76, note: "PPA template reviewed by counsel." },
      ],
    },
    fitScore: {
      overall: 58,
      dimensions: { sector: 72, capital: 25, stage: 88, geography: 87, strategic: 61 },
      explanation:
        "Stage and geography fit well, but a \u09f31.5Cr raise is far outside the ticket range on your profile.",
    },
    narrative: {
      opportunity:
        "Small and mid-sized factories pay heavily for diesel backup and want rooftop solar, but cannot secure bank financing against it. Roddur installs at no upfront cost and sells the power back under a long-term agreement.",
      whyNow:
        "Panel costs have fallen far enough that the arbitrage against diesel is decisive, and net metering rules stabilised in 2024. What is still missing is anyone willing to underwrite the asset.",
      problem:
        "A factory owner who wants solar faces a large upfront cost and a bank that will not lend against rooftop equipment. The project does not happen despite clearly positive economics.",
      solution:
        "Roddur owns the installation and sells power under a ten-year purchase agreement at a rate below the factory's blended grid-plus-diesel cost. The customer pays nothing upfront.",
      traction:
        "23 installations under signed ten-year agreements since August 2024. \u09f37.8L in monthly collections, no defaults to date. A qualified pipeline of about 60 further sites.",
      businessModel:
        "Roddur holds the asset and earns the spread between generation cost and the contracted power rate over the agreement term.",
      market:
        "Small and mid-sized industrial rooftops in the Dhaka industrial belt. The binding constraint is capital to fund installations, not demand.",
      capital:
        "\u09f31.5Cr to fund roughly 30 further installations. This is asset finance, not operating runway.",
      whatWeNeed:
        "Capital structured for asset finance, and a partner with structured-lending experience who can help build a facility rather than fund installations one at a time.",
    },
    useOfFunds: [
      { label: "Installation capital", percentage: 85, detail: "Roughly 30 rooftop systems under signed agreements." },
      { label: "Monitoring infrastructure", percentage: 8, detail: "Remote generation monitoring across the fleet." },
      { label: "Finance capability", percentage: 7, detail: "Structured-finance hire to build a lending facility." },
    ],
    team: [
      {
        name: "Kamrul Hasan",
        role: "Co-founder, Engineering",
        bio: "Eleven years in industrial electrical engineering. Designs and commissions every installation.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Ayesha Siddika",
        role: "Co-founder, Commercial",
        bio: "Negotiates the power purchase agreements and manages the factory relationships.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-07-15",
        title: "Customer references independently confirmed",
        body: "Nine of the 23 customers were contacted directly by an independent reviewer, who confirmed the agreements and payment history.",
      },
    ],
    questions: [
      {
        question: "What happens if a factory closes mid-agreement?",
        answer:
          "The equipment is ours and can be removed and redeployed, though at a cost of roughly 20% of the installation value. It has not happened yet across 23 sites, so that estimate is modelled rather than observed.",
        askedBy: "An investor exploring climate infrastructure",
        answeredAt: "2026-08-11",
      },
    ],
    publishedAt: "2026-04-12T00:00:00.000Z",
    lastActiveAt: "2026-08-27T11:20:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b06",
    slug: "bunon-textiles",
    name: "Bunon Textiles",
    summary:
      "A shared finishing facility for the small weavers who currently ship fabric 200km to get it done.",
    sector: "manufacturing",
    location: { city: "Pabna", region: "Rajshahi Division", country: "Bangladesh" },
    stage: "validation",
    needs: ["capital", "partner", "expertise"],
    activityStatus: "exploring",
    capitalSeekingBdt: 6_000_000,
    metrics: {
      monthlyRevenueBdt: null,
      monthlyGrowthPct: null,
      customers: null,
      teamSize: 2,
      founderContributionBdt: 250_000,
      operatingSince: null,
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification in August 2026.",
        verifiedAt: "2026-08-19T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 31,
      label: "Validating",
      signals: [
        { label: "Problem clarity", score: 82, note: "Transport cost and delay are consistent across interviews." },
        { label: "Market evidence", score: 48, note: "34 weaver interviews; no volume commitments." },
        { label: "Customer validation", score: 30, note: "Interest expressed, nothing signed." },
        { label: "Product", score: 12, note: "No facility yet." },
        { label: "Traction", score: 10, note: "Pre-operational." },
        { label: "Financial model", score: 28, note: "Draft model with unverified throughput assumptions." },
        { label: "Team", score: 30, note: "No operations lead with finishing experience." },
        { label: "Legal readiness", score: 20, note: "Not yet incorporated." },
      ],
    },
    fitScore: null,
    narrative: {
      opportunity:
        "Small weaving units around Pabna produce fabric but have no local finishing capacity, so they ship 200km each way for dyeing and finishing. A shared local facility removes that round trip.",
      whyNow:
        "Buyers are shortening lead times to a degree that the round trip is starting to cost weavers orders outright, not just margin.",
      problem:
        "The round trip adds roughly nine days and a meaningful share of unit cost. Small weavers cannot justify their own finishing line and have no shared alternative.",
      solution:
        "A shared finishing facility operating on a per-metre tolling basis, sized for the aggregate volume of the local cluster rather than any single unit.",
      traction:
        "Pre-operational. 34 weaver interviews completed, of which 21 said they would move volume to a local facility at the modelled price. None have committed in writing.",
      businessModel:
        "Per-metre tolling fee. Weavers retain ownership of the fabric throughout.",
      market:
        "The weaving cluster around Pabna. Viability depends on whether committed volume covers the facility's fixed cost, which is the open question.",
      capital:
        "\u09f360L for the facility, equipment and effluent treatment. We are not raising until volume commitments are signed.",
      whatWeNeed:
        "Expertise more than capital right now. Specifically someone who has run a finishing operation and can pressure-test the throughput assumptions before we commit to a facility size.",
    },
    useOfFunds: [
      { label: "Facility and equipment", percentage: 65, detail: "Site, dyeing and finishing line." },
      { label: "Effluent treatment", percentage: 25, detail: "Treatment plant required for compliance." },
      { label: "Working capital", percentage: 10, detail: "First six months of operation." },
    ],
    team: [
      {
        name: "Rezaul Karim",
        role: "Founder",
        bio: "Third-generation weaver. Runs a 12-loom unit and has been organising the local cluster for two years.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-24",
        title: "34 weaver interviews completed",
        body: "Interviews are complete across the cluster. The next step is converting stated interest into written volume commitments before sizing the facility.",
      },
    ],
    questions: [],
    publishedAt: "2026-08-20T00:00:00.000Z",
    lastActiveAt: "2026-08-26T10:00:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b07",
    slug: "pathao-ledger",
    name: "Khata Flow",
    summary:
      "Turning the paper credit ledgers small shops already keep into something a lender can read.",
    sector: "technology",
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    stage: "mvp",
    needs: ["capital", "co_founder", "talent"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 4_500_000,
    metrics: {
      monthlyRevenueBdt: 62_000,
      monthlyGrowthPct: 24,
      customers: 1_100,
      teamSize: 5,
      founderContributionBdt: 600_000,
      operatingSince: "2025-11",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Both founders completed government ID verification.",
        verifiedAt: "2026-06-05T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Incorporation certificate reviewed against the public register.",
        verifiedAt: "2026-06-12T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 52,
      label: "MVP",
      signals: [
        { label: "Problem clarity", score: 86, note: "Credit invisibility is well established for this segment." },
        { label: "Market evidence", score: 62, note: "1,100 shops using the ledger daily." },
        { label: "Customer validation", score: 68, note: "Strong usage, weak monetisation evidence." },
        { label: "Product", score: 64, note: "Ledger is solid; the lender-facing side does not exist." },
        { label: "Traction", score: 44, note: "Revenue small relative to usage." },
        { label: "Financial model", score: 32, note: "No model for the lending side of the business." },
        { label: "Team", score: 46, note: "No credit or risk experience on the team." },
        { label: "Legal readiness", score: 38, note: "Lending partnerships will need regulatory review." },
      ],
    },
    fitScore: {
      overall: 83,
      dimensions: { sector: 95, capital: 92, stage: 70, geography: 87, strategic: 74 },
      explanation:
        "Sector and ticket size line up closely with your stated preferences. Stage is slightly earlier than you usually enter.",
    },
    narrative: {
      opportunity:
        "Neighbourhood shops extend informal credit to regular customers and track it on paper. That repayment history is real and predictive, but invisible to any lender.",
      whyNow:
        "Smartphone penetration among shopkeepers crossed the threshold where a daily-use digital ledger is realistic, and lenders are actively looking for alternative credit signals for this segment.",
      problem:
        "Shopkeepers cannot borrow against a credit book that exists only on paper, and lenders have no way to assess them. Both sides lose.",
      solution:
        "A ledger app that replaces the paper book and is genuinely better for the shopkeeper on its own terms. The repayment data it generates becomes the basis for a credit assessment the shopkeeper can consent to share.",
      traction:
        "1,100 shops using the ledger daily since November 2025. \u09f362K monthly revenue from a paid tier, growing about 24% month over month from a small base. No lending partnerships yet.",
      businessModel:
        "A paid tier for the ledger today. The intended model is origination fees from lending partners, which has not been built or tested.",
      market:
        "Neighbourhood retail in urban Bangladesh. Getting to the lending model requires both regulatory clearance and a lender willing to underwrite on this data.",
      capital:
        "\u09f345L for eighteen months of runway while building the lender-facing side and securing a first lending partnership.",
      whatWeNeed:
        "A co-founder with credit or risk background. That gap matters more than the capital.",
    },
    useOfFunds: [
      { label: "Team runway", percentage: 60, detail: "Eighteen months for five people." },
      { label: "Lender-facing product", percentage: 25, detail: "Credit assessment and consent infrastructure." },
      { label: "Regulatory work", percentage: 15, detail: "Counsel and compliance for lending partnerships." },
    ],
    team: [
      {
        name: "Sabbir Rahman",
        role: "Co-founder, Product",
        bio: "Spent four years building point-of-sale software for small retailers before starting Khata Flow.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Mehjabin Chowdhury",
        role: "Co-founder, Field",
        bio: "Runs shopkeeper onboarding across Dhaka. Previously managed a distribution route of 400 shops.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-19",
        title: "1,100 shops on the ledger",
        body: "Daily active use is holding at roughly 71% of onboarded shops, which is the number that matters most for the credit data to be usable.",
      },
    ],
    questions: [
      {
        question: "Has any lender agreed to underwrite against this data?",
        answer:
          "No. We have had exploratory conversations with two, but nothing is agreed and we would not want to imply otherwise. That is precisely the risk in this raise.",
        askedBy: "An investor exploring financial infrastructure",
        answeredAt: "2026-08-23",
      },
    ],
    publishedAt: "2026-06-18T00:00:00.000Z",
    lastActiveAt: "2026-08-30T08:05:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b08",
    slug: "nadi-logistics",
    name: "Nadi Logistics",
    summary:
      "Scheduled river freight between delta towns that road transport reaches slowly and expensively.",
    sector: "manufacturing",
    location: { city: "Barishal", region: "Barishal Division", country: "Bangladesh" },
    stage: "revenue",
    needs: ["capital", "acquisition"],
    activityStatus: "exploring",
    capitalSeekingBdt: 12_000_000,
    metrics: {
      monthlyRevenueBdt: 950_000,
      monthlyGrowthPct: 4,
      customers: 88,
      teamSize: 24,
      founderContributionBdt: 4_500_000,
      operatingSince: "2022-06",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification.",
        verifiedAt: "2026-02-20T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Incorporation certificate and vessel registrations reviewed.",
        verifiedAt: "2026-02-28T00:00:00.000Z",
      },
      {
        kind: "revenue",
        status: "evidence_verified",
        statement: "Two years of filed accounts reviewed against reported revenue.",
        verifiedAt: "2026-03-30T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 74,
      label: "Revenue",
      signals: [
        { label: "Problem clarity", score: 84, note: "Road freight cost and delay documented route by route." },
        { label: "Market evidence", score: 76, note: "Four years of route-level volume data." },
        { label: "Customer validation", score: 80, note: "88 recurring commercial shippers." },
        { label: "Product", score: 78, note: "Six vessels on a fixed weekly schedule." },
        { label: "Traction", score: 82, note: "Fifty months of continuous operation." },
        { label: "Financial model", score: 60, note: "Model does not stress-test fuel price movement." },
        { label: "Team", score: 70, note: "Deep operational bench, thin commercial leadership." },
        { label: "Legal readiness", score: 72, note: "Vessel registrations and insurance current." },
      ],
    },
    fitScore: {
      overall: 47,
      dimensions: { sector: 38, capital: 30, stage: 88, geography: 87, strategic: 42 },
      explanation:
        "Geography and stage fit, but logistics is outside your stated sectors and the ticket is above your range.",
    },
    narrative: {
      opportunity:
        "Freight between delta towns moves by road on long detours around waterways. Nadi runs six vessels on a fixed weekly schedule across four routes that road transport serves poorly.",
      whyNow:
        "Not a timing story. This is an established operation looking for either growth capital or an acquirer with a complementary road network.",
      problem:
        "Commercial shippers in the delta pay road rates for journeys that a boat covers in less time. Existing river freight is unscheduled, so nobody can plan around it.",
      solution:
        "A fixed weekly schedule across four routes, with published rates and committed departure times. Shippers can plan inventory against it.",
      traction:
        "Operating since June 2022. 88 recurring commercial shippers, \u09f39.5L monthly revenue, growing modestly at about 4% month over month. Growth is constrained by vessel capacity.",
      businessModel:
        "Per-tonne freight rates by route, with contract rates for recurring shippers.",
      market:
        "Commercial freight across the Barishal delta. Growth requires vessels; the routes are already proven.",
      capital:
        "\u09f31.2Cr for two additional vessels and a fifth route. We are equally open to an acquisition conversation with a road logistics operator.",
      whatWeNeed:
        "Either growth capital or an acquirer. We are exploring both and are not committed to a path.",
    },
    useOfFunds: [
      { label: "Two vessels", percentage: 75, detail: "Purchase and refit for the fifth route." },
      { label: "Terminal upgrades", percentage: 15, detail: "Loading capacity at two existing terminals." },
      { label: "Working capital", percentage: 10, detail: "Fuel and crew for the new route's first two quarters." },
    ],
    team: [
      {
        name: "Abdul Malek",
        role: "Founder",
        bio: "Twenty-two years in river transport, the last four running Nadi. Holds a master's certificate.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-02",
        title: "Exploring acquisition alongside growth capital",
        body: "We have opened the option of an acquisition by a road logistics operator. Nothing is agreed and we are continuing to talk to growth investors in parallel.",
      },
    ],
    questions: [],
    publishedAt: "2026-03-05T00:00:00.000Z",
    lastActiveAt: "2026-08-21T16:00:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b09",
    slug: "taant-collective",
    name: "Taant Collective",
    summary:
      "Getting handloom weavers a direct export channel instead of four layers of intermediary.",
    sector: "creative",
    location: { city: "Narayanganj", region: "Dhaka Division", country: "Bangladesh" },
    stage: "validation",
    needs: ["co_founder", "partner", "distribution"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 800_000,
    metrics: {
      monthlyRevenueBdt: 45_000,
      monthlyGrowthPct: 15,
      customers: 19,
      teamSize: 3,
      founderContributionBdt: 180_000,
      operatingSince: "2026-02",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification in July 2026.",
        verifiedAt: "2026-07-22T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "self_reported",
        statement: "Registration status is self-reported and has not been checked.",
        verifiedAt: null,
      },
    ],
    readiness: {
      score: 34,
      label: "Validating",
      signals: [
        { label: "Problem clarity", score: 80, note: "Margin loss to intermediaries is well understood." },
        { label: "Market evidence", score: 44, note: "19 international buyers, no repeat cycle yet." },
        { label: "Customer validation", score: 46, note: "Orders placed, retention unproven." },
        { label: "Product", score: 40, note: "No direct sales channel of our own." },
        { label: "Traction", score: 32, note: "Seven months of small orders." },
        { label: "Financial model", score: 22, note: "No model accounting for shipping and duty." },
        { label: "Team", score: 38, note: "No export or e-commerce experience." },
        { label: "Legal readiness", score: 26, note: "Export documentation handled by a third party." },
      ],
    },
    fitScore: null,
    narrative: {
      opportunity:
        "Jamdani and handloom weavers sell through four layers of intermediary before their work reaches an international buyer. Taant Collective is building a direct channel for a group of 40 weaving households.",
      whyNow:
        "International buyers of handmade textiles increasingly want a documented provenance chain, which favours a direct relationship over the intermediary route.",
      problem:
        "A weaver receives a small fraction of the final sale price. Buyers who want to source directly have no way to reach or verify individual weaving households.",
      solution:
        "A collective that handles buyer relationships, export documentation and quality consistency on behalf of member households, with the weaver named on every piece.",
      traction:
        "Operating since February 2026. 19 international buyers, \u09f345K in monthly order value. Growing but from a very small base and with no repeat cycle completed.",
      businessModel:
        "A margin on export sales, with the split published to member weavers.",
      market:
        "International buyers of handmade textiles. The constraint is reaching them; we currently depend entirely on a single marketplace.",
      capital:
        "\u09f38L for export documentation capability and a direct sales channel that does not depend on a third-party marketplace.",
      whatWeNeed:
        "A co-founder with export or direct-to-consumer experience, and a distribution partner. Capital is secondary.",
    },
    useOfFunds: [
      { label: "Direct sales channel", percentage: 50, detail: "Our own storefront and buyer relationships." },
      { label: "Export capability", percentage: 30, detail: "Bringing documentation in-house." },
      { label: "Quality programme", percentage: 20, detail: "Consistency standards across member households." },
    ],
    team: [
      {
        name: "Priya Das",
        role: "Founder",
        bio: "Grew up in a weaving household in Narayanganj. Spent three years in textile buying before starting the collective.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-16",
        title: "Fortieth household joined",
        body: "The collective now covers 40 weaving households. The bottleneck is buyer demand, not supply.",
      },
    ],
    questions: [],
    publishedAt: "2026-07-25T00:00:00.000Z",
    lastActiveAt: "2026-08-29T12:40:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b10",
    slug: "shobdo-audio",
    name: "Shobdo",
    summary:
      "Bangla audio journalism for a commute that is too long to read and too loud to concentrate.",
    sector: "media",
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    stage: "idea",
    needs: ["co_founder", "expertise", "capital"],
    activityStatus: "exploring",
    capitalSeekingBdt: 1_500_000,
    metrics: {
      monthlyRevenueBdt: null,
      monthlyGrowthPct: null,
      customers: null,
      teamSize: 1,
      founderContributionBdt: null,
      operatingSince: null,
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Founder completed government ID verification in August 2026.",
        verifiedAt: "2026-08-27T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 16,
      label: "Idea",
      signals: [
        { label: "Problem clarity", score: 55, note: "Commute length is real; the audio preference is assumed." },
        { label: "Market evidence", score: 20, note: "No listener research yet." },
        { label: "Customer validation", score: 8, note: "Nothing tested with listeners." },
        { label: "Product", score: 5, note: "Concept only." },
        { label: "Traction", score: 0, note: "Pre-launch." },
        { label: "Financial model", score: 10, note: "No model." },
        { label: "Team", score: 22, note: "Solo founder, no audio production experience." },
        { label: "Legal readiness", score: 8, note: "Not incorporated." },
      ],
    },
    fitScore: null,
    narrative: {
      opportunity:
        "Dhaka commutes routinely run past ninety minutes. Reading is impractical in traffic. There is very little serious Bangla-language audio journalism made for that window.",
      whyNow:
        "Cheap earphones and reliable mobile data are now near-universal among the commuting workforce, so the delivery problem that would have blocked this five years ago is gone.",
      problem:
        "The long commute is dead time. Existing Bangla audio content is mostly music and entertainment; people who want to follow news and analysis have no format that works while stuck in traffic.",
      solution:
        "A short daily Bangla audio briefing plus a longer weekly analysis piece, produced to a genuine editorial standard rather than as read-aloud newspaper copy.",
      traction:
        "None. This is an idea. Nothing has been produced and no listener research has been done.",
      businessModel:
        "Undecided. Likely sponsorship or a paid tier, but this has not been thought through and should not be treated as a plan.",
      market:
        "Bangla-speaking commuters in Dhaka, initially. The size of the segment willing to pay for audio journalism is entirely unknown.",
      capital:
        "\u09f315L would fund a year of production for a two-person team, but raising is premature until the format is tested.",
      whatWeNeed:
        "A co-founder with audio production experience, and someone who has built an editorial operation. Honest feedback on whether this is worth pursuing is more useful than money right now.",
    },
    useOfFunds: [
      { label: "Production", percentage: 60, detail: "A year of daily and weekly output for two people." },
      { label: "Equipment and studio", percentage: 25, detail: "Recording setup and editing tools." },
      { label: "Listener research", percentage: 15, detail: "Testing the format before committing to it." },
    ],
    team: [
      {
        name: "Tahmid Karim",
        role: "Founder",
        bio: "Print journalist for seven years covering economic policy. No audio production background.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [],
    questions: [],
    publishedAt: "2026-08-28T00:00:00.000Z",
    lastActiveAt: "2026-08-28T19:00:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b11",
    slug: "kheya-repair",
    name: "Kheya Repair",
    summary:
      "A repair network for the electric rickshaws that keep breaking in the same three ways.",
    sector: "technology",
    location: { city: "Rajshahi", region: "Rajshahi Division", country: "Bangladesh" },
    stage: "mvp",
    needs: ["capital", "talent", "operations"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 2_200_000,
    metrics: {
      monthlyRevenueBdt: 185_000,
      monthlyGrowthPct: 16,
      customers: 410,
      teamSize: 8,
      founderContributionBdt: 500_000,
      operatingSince: "2025-07",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Both founders completed government ID verification.",
        verifiedAt: "2026-05-30T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Trade licence reviewed against the municipal register.",
        verifiedAt: "2026-06-08T00:00:00.000Z",
      },
      {
        kind: "revenue",
        status: "profile_reviewed",
        statement:
          "Revenue is reported from internal records. Bank statements have been requested but not yet reviewed.",
        verifiedAt: null,
      },
    ],
    readiness: {
      score: 58,
      label: "MVP",
      signals: [
        { label: "Problem clarity", score: 88, note: "Three failure modes account for most breakdowns." },
        { label: "Market evidence", score: 66, note: "410 drivers using the network in one city." },
        { label: "Customer validation", score: 72, note: "Strong repeat usage among registered drivers." },
        { label: "Product", score: 60, note: "Four workshops with standardised parts inventory." },
        { label: "Traction", score: 62, note: "Fourteen months of growing revenue." },
        { label: "Financial model", score: 40, note: "No model for multi-city expansion." },
        { label: "Team", score: 50, note: "No general manager for a second city." },
        { label: "Legal readiness", score: 52, note: "Licensed, but no formal parts supplier agreements." },
      ],
    },
    fitScore: {
      overall: 86,
      dimensions: { sector: 90, capital: 96, stage: 78, geography: 87, strategic: 79 },
      explanation:
        "Ticket size and sector match your preferences closely. Stage is slightly below your usual entry point but within range.",
    },
    narrative: {
      opportunity:
        "Electric rickshaws are the backbone of short-distance transport in Rajshahi, and they break constantly in a small number of predictable ways. Kheya runs four workshops that stock exactly those parts.",
      whyNow:
        "The fleet has grown to the point where a specialised repair network is economic. General mechanics do not stock the parts and drivers lose a day's earnings each time.",
      problem:
        "A driver whose vehicle fails loses a full day of income finding a mechanic who has the part. Controllers, motors and battery connectors account for most failures, and nobody stocks them locally.",
      solution:
        "Four workshops with standardised inventory for the three common failure modes, a registered-driver scheme with priority service, and same-day turnaround on those repairs.",
      traction:
        "Operating since July 2025. 410 registered drivers, \u09f31.85L monthly revenue, growing about 16% month over month.",
      businessModel:
        "Repair fees plus parts margin. Registered drivers pay a small monthly fee for priority service.",
      market:
        "Electric rickshaw fleets in secondary cities. Rajshahi is the proving ground; the model should transfer to comparable cities.",
      capital:
        "\u09f322L to open four workshops in a second city and hire a general manager to run it.",
      whatWeNeed:
        "Capital, a general manager who can run a city independently, and an operations lead to standardise the workshop model before we replicate it.",
    },
    useOfFunds: [
      { label: "Second city workshops", percentage: 50, detail: "Four sites, tooling and initial parts inventory." },
      { label: "General manager", percentage: 25, detail: "Eighteen months for a city lead." },
      { label: "Parts inventory", percentage: 25, detail: "Working capital for stock across eight workshops." },
    ],
    team: [
      {
        name: "Jahangir Alam",
        role: "Co-founder, Operations",
        bio: "Ran a motorcycle workshop for eight years. Designed the standardised parts inventory.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Ruma Begum",
        role: "Co-founder, Driver network",
        bio: "Built the registered-driver scheme. Previously organised a rickshaw drivers' association.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-09",
        title: "Fourth workshop opened",
        body: "The fourth Rajshahi workshop opened in August. Average repair turnaround across the network is now under four hours.",
      },
    ],
    questions: [
      {
        question: "Why is revenue only profile-reviewed rather than evidence-verified?",
        answer:
          "We have submitted internal records but not yet bank statements. We are working through it and would rather the badge reflect what has actually been checked.",
        askedBy: "An investor exploring transport services",
        answeredAt: "2026-08-26",
      },
    ],
    publishedAt: "2026-06-10T00:00:00.000Z",
    lastActiveAt: "2026-08-30T06:30:00.000Z",
    isDevData: true,
  },

  {
    id: "6f1c0f4a-1d3a-4c7e-9f2b-8a1e5c3d7b12",
    slug: "orinno-labs",
    name: "Orinno Labs",
    summary:
      "Low-cost water quality sensors for the municipal supplies that are currently tested monthly by hand.",
    sector: "climate",
    location: { city: "Khulna", region: "Khulna Division", country: "Bangladesh" },
    stage: "prototype",
    needs: ["capital", "partner", "technology", "expertise"],
    activityStatus: "actively_looking",
    capitalSeekingBdt: 5_000_000,
    metrics: {
      monthlyRevenueBdt: null,
      monthlyGrowthPct: null,
      customers: 2,
      teamSize: 4,
      founderContributionBdt: 700_000,
      operatingSince: "2025-05",
    },
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Both founders completed government ID verification.",
        verifiedAt: "2026-07-15T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Incorporation certificate reviewed against the public register.",
        verifiedAt: "2026-07-21T00:00:00.000Z",
      },
    ],
    readiness: {
      score: 44,
      label: "Prototype",
      signals: [
        { label: "Problem clarity", score: 84, note: "Salinity intrusion and contamination are well documented." },
        { label: "Market evidence", score: 52, note: "Two municipal pilots; procurement path unclear." },
        { label: "Customer validation", score: 48, note: "Pilots are unpaid." },
        { label: "Product", score: 56, note: "Prototype sensors deployed and reporting for four months." },
        { label: "Traction", score: 30, note: "No revenue." },
        { label: "Financial model", score: 34, note: "Manufacturing cost at volume is estimated, not quoted." },
        { label: "Team", score: 48, note: "No hardware manufacturing experience." },
        { label: "Legal readiness", score: 42, note: "Incorporated. No procurement framework in place." },
      ],
    },
    fitScore: {
      overall: 69,
      dimensions: { sector: 78, capital: 88, stage: 52, geography: 87, strategic: 58 },
      explanation:
        "Ticket size and geography fit your preferences. Prototype stage with no revenue is earlier than you typically enter.",
    },
    narrative: {
      opportunity:
        "Municipal water supplies in coastal Khulna are tested manually, roughly monthly. Orinno has built a sensor that reports salinity and basic contamination indicators continuously at a fraction of the cost of commercial units.",
      whyNow:
        "Salinity intrusion is worsening measurably along the coast, and municipalities are under pressure to monitor more frequently than a monthly manual test allows.",
      problem:
        "A monthly manual test tells you a supply was contaminated three weeks ago. By the time results arrive, people have been drinking it. Commercial continuous monitoring costs more than a municipal budget allows per site.",
      solution:
        "A sensor built from commodity components that reports salinity, turbidity and basic contamination indicators continuously, at roughly a tenth of commercial unit cost.",
      traction:
        "Prototypes deployed at two municipal sites since April 2026, reporting continuously for four months. Both pilots are unpaid. Readings have tracked the manual monthly tests closely.",
      businessModel:
        "Intended as hardware sales plus a monitoring subscription to municipalities. Neither has been priced with a paying customer.",
      market:
        "Municipal water authorities in coastal districts. Public procurement is the route to market and we do not yet understand it well.",
      capital:
        "\u09f350L for a manufacturing run of 200 units, certification, and eighteen months of runway.",
      whatWeNeed:
        "A manufacturing partner above all, plus expertise in public procurement. Capital alone does not solve either problem.",
    },
    useOfFunds: [
      { label: "Manufacturing run", percentage: 40, detail: "200 units at pilot scale." },
      { label: "Certification", percentage: 20, detail: "Testing and certification required for municipal procurement." },
      { label: "Runway", percentage: 40, detail: "Eighteen months for four people." },
    ],
    team: [
      {
        name: "Nazmul Haque",
        role: "Co-founder, Hardware",
        bio: "Electronics engineer. Designed the sensor and the calibration approach.",
        avatarUrl: null,
        identityVerified: true,
      },
      {
        name: "Sanjida Parvin",
        role: "Co-founder, Field",
        bio: "Environmental scientist. Ran water quality monitoring programmes in coastal districts for six years.",
        avatarUrl: null,
        identityVerified: true,
      },
    ],
    updates: [
      {
        date: "2026-08-11",
        title: "Four months of continuous readings",
        body: "Both pilot sensors have run four months without recalibration, and readings have tracked the manual monthly tests within tolerance.",
      },
    ],
    questions: [
      {
        question: "What is the unit cost at a 200-unit run?",
        answer:
          "Our estimate is roughly \u09f39,000 per unit, but that is modelled from component pricing rather than a manufacturer quote. Getting a real quote is part of what this raise is for.",
        askedBy: "An investor exploring climate hardware",
        answeredAt: "2026-08-24",
      },
    ],
    publishedAt: "2026-07-28T00:00:00.000Z",
    lastActiveAt: "2026-08-29T15:10:00.000Z",
    isDevData: true,
  },
];
