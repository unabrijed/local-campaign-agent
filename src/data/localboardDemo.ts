export const demoWebsiteUrl = "https://aurafit.example";

export const coverageAreas = [
  "Indiranagar",
  "Koramangala",
  "HSR Layout",
  "Domlur",
  "MG Road",
  "Church Street",
  "Whitefield",
  "Jayanagar",
  "JP Nagar",
  "Bellandur",
];

export const agentRunSteps = [
  {
    agent: "Website Scout Agent",
    title: "Reading website",
    detail: "Analyzing AuraFit Studio's services, location, audience, pricing signals, and CTAs.",
  },
  {
    agent: "Website Scout Agent",
    title: "Extracting business model",
    detail: "Detected premium fitness studio with beginner-friendly trial intent.",
  },
  {
    agent: "Website Scout Agent",
    title: "Detecting audience",
    detail: "Working professionals and women aged 24-38 near Indiranagar, Domlur, and Koramangala.",
  },
  {
    agent: "Area Intelligence Agent",
    title: "Mapping Bangalore areas",
    detail: "Selected Indiranagar as the primary launch zone with Domlur and Koramangala as spillover.",
  },
  {
    agent: "Placement Match Agent",
    title: "Selecting placement types",
    detail: "Matched cafes, salons, apartment noticeboards, and coworking lobby screens.",
  },
  {
    agent: "Campaign Strategy Agent",
    title: "Generating campaign angle",
    detail: "Created campaign: 7 Days Near Work.",
  },
  {
    agent: "Campaign Creative Agent",
    title: "Writing creatives",
    detail: "Generated poster, cafe table card, apartment, salon, gym, WhatsApp, and retargeting copy.",
  },
  {
    agent: "QR Landing Page Agent",
    title: "Creating QR landing page",
    detail: "Built a trackable mini page with WhatsApp CTA and trial booking form.",
  },
  {
    agent: "Vendor Outreach Agent",
    title: "Drafting vendor outreach",
    detail: "Prepared reviewable drafts for cafes, salons, apartment managers, and coworking spaces.",
  },
  {
    agent: "Launch Ops Agent",
    title: "Building launch board",
    detail: "Campaign board ready with budget, proof checklist, and tracking dashboard.",
  },
];

export const bangaloreAreas = [
  {
    name: "Indiranagar",
    x: 58,
    y: 38,
    size: "lg" as const,
    bestFor: "fitness, clinics, salons, cafes, boutique retail, D2C popups",
    audience: "premium lifestyle buyers, young professionals, founders, residents",
    placements: "cafes, salons, gyms, apartments, coworking spaces",
    score: 92,
    reason: "Premium lifestyle audience, cafes, gyms, salons, and walkable discovery.",
  },
  {
    name: "Koramangala",
    x: 50,
    y: 55,
    size: "lg" as const,
    bestFor: "cafes, events, student brands, SaaS hiring, creator popups",
    audience: "students, startup teams, young professionals, founders",
    placements: "cafes, PGs, coworking spaces, event venues, restaurants",
    score: 81,
    reason: "Young professionals, startup offices, cafes, and high evening activity.",
  },
  {
    name: "HSR Layout",
    x: 60,
    y: 70,
    size: "md" as const,
    bestFor: "clinics, coaching, fitness, family services, cafes",
    audience: "families, founders, professionals, residential communities",
    placements: "apartments, gyms, cafes, clinics, coworking spaces",
    score: 78,
    reason: "Strong residential communities with family and founder overlap.",
  },
  {
    name: "Whitefield",
    x: 86,
    y: 45,
    size: "md" as const,
    bestFor: "enterprise services, clinics, family brands, premium fitness",
    audience: "IT employees, gated communities, office crowd",
    placements: "tech parks, apartments, cafes, gyms, office-adjacent spaces",
    score: 76,
    reason: "IT employees and gated communities create predictable weekday discovery.",
  },
  {
    name: "MG Road + Church Street",
    x: 44,
    y: 32,
    size: "md" as const,
    bestFor: "events, cafes, fashion, nightlife, D2C popups",
    audience: "high footfall, shoppers, weekend crowd, creators",
    placements: "cafes, event tie-ups, street-adjacent retail, QR flyers",
    score: 74,
    reason: "Weekend footfall and creator-friendly streets are useful for launch awareness.",
  },
  {
    name: "Domlur",
    x: 52,
    y: 42,
    size: "sm" as const,
    bestFor: "fitness, clinics, salons, coworking, premium services",
    audience: "office crowd, residents, Indiranagar spillover",
    placements: "apartments, gyms, cafes, office-adjacent spaces",
    score: 84,
    reason: "Office crowd and residential spillover from Indiranagar and Koramangala.",
  },
  {
    name: "Jayanagar",
    x: 32,
    y: 65,
    size: "md" as const,
    bestFor: "clinics, coaching centers, family retail, wellness, local services",
    audience: "families, students, established residents",
    placements: "apartments, coaching zones, clinics, cafes, retail counters",
    score: 72,
    reason: "Established residential audience with strong family and student traffic.",
  },
  {
    name: "JP Nagar",
    x: 36,
    y: 75,
    size: "sm" as const,
    bestFor: "family services, wellness, clinics, local retail",
    audience: "families, professionals, residential communities",
    placements: "apartment boards, retail counters, cafes, clinics",
    score: 69,
    reason: "Residential density works well for recurring local services.",
  },
  {
    name: "Bellandur",
    x: 72,
    y: 60,
    size: "sm" as const,
    bestFor: "IT employee services, gyms, cafes, family brands",
    audience: "IT residents, gated communities, office crowd",
    placements: "society boards, gym mirrors, cafes, coworking lobbies",
    score: 71,
    reason: "Tech workers and gated communities support area-wise targeting.",
  },
];

export const audienceFilters = [
  "Premium lifestyle audience",
  "Startup/founder audience",
  "Student audience",
  "IT employee audience",
  "Family audience",
  "Health and wellness audience",
  "Nightlife/event audience",
];

export const sampleCampaign = {
  business: "AuraFit Studio",
  category: "Premium fitness studio",
  location: "Indiranagar",
  goal: "Trial bookings",
  name: "7 Days Near Work",
  angle: "A beginner-friendly fitness trial for busy professionals who want a premium studio close to work.",
  offer: "Book a 7-day beginner trial batch near your office.",
  audience: "Working professionals and women aged 24-38 near Indiranagar, Domlur, and Koramangala.",
  cta: "Scan to book on WhatsApp",
  budget: "₹15,000 starter campaign",
  duration: "7 days",
  landingSlug: "/localboard/aura-fit-indiranagar",
  recommendedAreas: [
    {
      name: "Indiranagar",
      score: 92,
      reason: "Premium lifestyle audience, cafes, gyms, salons, and walkable discovery.",
    },
    {
      name: "Domlur",
      score: 84,
      reason: "Office crowd and residential spillover from Indiranagar and Koramangala.",
    },
    {
      name: "Koramangala",
      score: 81,
      reason: "Young professionals, startup offices, cafes, and high evening activity.",
    },
  ],
  placements: [
    { type: "Cafe table cards", count: 6, cost: "₹4,800", status: "Confirmed" },
    { type: "Salon mirror stickers", count: 4, cost: "₹3,200", status: "Confirmed" },
    { type: "Apartment posters", count: 3, cost: "₹3,000", status: "Pending" },
    { type: "Coworking lobby screens", count: 2, cost: "₹4,000", status: "Confirmed" },
  ],
  creatives: [
    {
      format: "Poster copy",
      headline: "Your first 7 days of fitness, 5 minutes from Indiranagar.",
      body: "Beginner-friendly batches for busy professionals. Scan to book a trial batch.",
      cta: "Scan to book",
    },
    {
      format: "Cafe table card copy",
      headline: "Coffee today. Core strength tomorrow.",
      body: "Scan for a 7-day beginner fitness trial nearby.",
      cta: "Book trial",
    },
    {
      format: "Apartment poster copy",
      headline: "A premium fitness trial close to home.",
      body: "Join a 7-day beginner batch near Indiranagar and build the habit first.",
      cta: "Scan for timings",
    },
    {
      format: "Salon mirror sticker copy",
      headline: "Glow outside. Get stronger inside.",
      body: "Try AuraFit's beginner fitness batch near your next errand.",
      cta: "WhatsApp us",
    },
    {
      format: "Gym standee copy",
      headline: "Need a studio that starts with beginners?",
      body: "Book a 7-day AuraFit trial near Indiranagar.",
      cta: "Scan to start",
    },
    {
      format: "WhatsApp flyer copy",
      headline: "Hi, I want to book the 7-day trial batch.",
      body: "Please share batch timings for Indiranagar.",
      cta: "Send message",
    },
  ],
  outreachDrafts: [
    {
      type: "Cafe outreach",
      to: "Cafe partner",
      message:
        "Hi, we are launching a 7-day local campaign for AuraFit Studio, a premium fitness studio near Indiranagar. Would you be open to placing a table card at your cafe for one week? We will share print-ready creative, QR tracking, and proof requirements.",
    },
    {
      type: "Salon outreach",
      to: "Salon manager",
      message:
        "Hi, AuraFit Studio is running a beginner fitness trial for women and working professionals near Indiranagar. Would you be open to a mirror sticker placement for one week? We will provide the creative, QR code, and proof checklist.",
    },
    {
      type: "Apartment manager outreach",
      to: "Apartment manager",
      message:
        "Hi, we are helping AuraFit Studio run a nearby 7-day fitness trial campaign. Could we place a small poster on your noticeboard for one week? The creative includes QR tracking and a clear WhatsApp booking CTA.",
    },
    {
      type: "Coworking manager outreach",
      to: "Coworking manager",
      message:
        "Hi, AuraFit Studio is launching a fitness trial for busy professionals near Indiranagar and Domlur. Would your lobby screen be available for a one-week campaign? We will share screen-ready creative and tracking links.",
    },
  ],
  tracking: {
    qrScans: 128,
    whatsappClicks: 37,
    leads: 14,
    trialBookings: 6,
    placementsTotal: 15,
    placementsConfirmed: 11,
    placementsPending: 4,
    bestArea: "Indiranagar",
    bestPlacement: "Cafe table cards",
    proofUploads: "9/11 received",
    costPerLead: "₹1,071",
  },
  checklist: [
    "Approve campaign angle",
    "Review print-ready copy",
    "Approve vendor outreach drafts",
    "Generate placement QR codes",
    "Collect proof-of-live uploads",
    "Track WhatsApp clicks and trial bookings",
  ],
};

export const agentModules = [
  {
    name: "Website Scout Agent",
    body: "Reads the website and extracts business type, audience, price point, offers, brand voice, location, and conversion goal.",
  },
  {
    name: "Area Intelligence Agent",
    body: "Matches the business to Bangalore neighborhoods and micro-zones using category, audience, intent, and placement fit.",
  },
  {
    name: "Campaign Creative Agent",
    body: "Generates campaign names, offers, posters, table-card copy, apartment copy, WhatsApp CTAs, and retargeting copy.",
  },
  {
    name: "Placement Match Agent",
    body: "Recommends cafes, salons, gyms, apartments, coworking spaces, events, and local venue types.",
  },
  {
    name: "Launch Ops Agent",
    body: "Creates vendor outreach drafts, proof requirements, QR tracking setup, and the campaign launch board.",
  },
  {
    name: "Report Agent",
    body: "Summarizes leads, scans, WhatsApp clicks, top areas, top placements, and the next recommended action.",
  },
];

export const vendorPlacementTypes = [
  "Cafe table cards",
  "Counter cards",
  "Posters",
  "Salon mirror stickers",
  "Gym reception standees",
  "Apartment noticeboards",
  "Coworking lobby screens",
  "Event flyers",
  "Restaurant billing-counter inserts",
  "Boutique store placements",
];

export const pricingPlans = [
  {
    name: "Starter Agent Run",
    price: "Free / Demo",
    body: "Generate the first campaign board from one website.",
    features: [
      "Website analysis",
      "Bangalore area recommendations",
      "Campaign angle",
      "3 creative copies",
      "Sample QR landing page",
      "Sample vendor outreach drafts",
    ],
  },
  {
    name: "Launch Pack",
    price: "₹4,999 + media spend",
    body: "Prepare a launch-ready campaign for review.",
    features: [
      "Full campaign board",
      "QR landing page",
      "5 placement recommendations",
      "Print-ready creative copy",
      "Vendor outreach drafts",
      "Lead tracking dashboard",
    ],
  },
  {
    name: "Managed Local Launch",
    price: "₹14,999 + media spend",
    body: "Coordinate the local campaign with proof and reports.",
    features: [
      "Everything in Launch Pack",
      "Vendor coordination",
      "Proof uploads",
      "10-15 local placements",
      "Weekly performance report",
      "Next campaign recommendation",
    ],
  },
];
