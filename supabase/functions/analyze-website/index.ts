declare const Deno: {
  serve: (
    handler: (req: Request) => Response | Promise<Response>,
  ) => void;
  env: {
    get: (key: string) => string | undefined;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type WebsiteAnalysisRequest = {
  url?: string;
  budget?: number;
};

type AreaRecommendation = {
  name: string;
  score: number;
  reason: string;
};

type Creative = {
  format: string;
  headline: string;
  body: string;
  cta: string;
};

type Hotspot = {
  area: string;
  microZone: string;
  landmark: string;
  crowdType: string;
  congestion: string;
  bestTime: string;
  suggestedPlacement: string;
  brandFit: string;
};

type BillboardRecommendation = {
  title: string;
  area: string;
  microZone: string;
  placementType: string;
  visibility: string;
  weeklyPrice: string;
  estimatedFootfall: string;
  audienceTags: string[];
  ownerStatus: string;
  reason: string;
};

type AgentResult = {
  sourceUrl: string;
  fetchedAt: string;
  mode: "llm" | "heuristic";
  website: {
    title: string;
    description: string;
    textSample: string;
  };
  business: {
    name: string;
    category: string;
    subCategory: string;
    audience: string;
    pricePoint: string;
    brandVoice: string;
    location: string;
    conversionGoal: string;
    suggestedCta: string;
  };
  campaign: {
    name: string;
    angle: string;
    offer: string;
    primaryCta: string;
    budget: string;
    duration: string;
    landingSlug: string;
  };
  recommendedAreas: AreaRecommendation[];
  placements: string[];
  hotspots: Hotspot[];
  billboardRecommendations: BillboardRecommendation[];
  creatives: Creative[];
  outreachDrafts: Array<{
    type: string;
    message: string;
  }>;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as WebsiteAnalysisRequest;
    const sourceUrl = normalizeUrl(body.url);
    const website = await fetchWebsiteContent(sourceUrl);
    const llmResult = await analyzeWithOpenAI(sourceUrl, website, body.budget);
    const result = llmResult ?? buildHeuristicResult(sourceUrl, website, body.budget);

    return json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return json({ error: message }, 400);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalizeUrl(input?: string) {
  if (!input?.trim()) {
    throw new Error("A website URL is required.");
  }

  const withProtocol = /^https?:\/\//i.test(input) ? input.trim() : `https://${input.trim()}`;
  const parsed = new URL(withProtocol);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }
  return parsed.toString();
}

async function fetchWebsiteContent(sourceUrl: string) {
  const response = await fetch(sourceUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; LocalBoardAgent/1.0; +https://localboard.app)",
      Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch website. Received ${response.status}.`);
  }

  const html = await response.text();
  const title = extractTag(html, "title") || hostnameToName(sourceUrl);
  const description =
    extractMeta(html, "description") ||
    extractMeta(html, "og:description") ||
    "";
  const text = htmlToText(html);

  return {
    title: cleanText(title).slice(0, 180),
    description: cleanText(description).slice(0, 280),
    textSample: text.slice(0, 8000),
  };
}

async function analyzeWithOpenAI(
  sourceUrl: string,
  website: AgentResult["website"],
  budget?: number,
): Promise<AgentResult | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;

  const prompt = `You are LocalBoard's Website Scout Agent and Campaign Strategy Agent.
Analyze this business website for a Bangalore local advertising campaign.

Return strict JSON only with this exact shape:
{
  "business": {
    "name": "string",
    "category": "string",
    "subCategory": "string",
    "audience": "string",
    "pricePoint": "string",
    "brandVoice": "string",
    "location": "string",
    "conversionGoal": "string",
    "suggestedCta": "string"
  },
  "campaign": {
    "name": "string",
    "angle": "string",
    "offer": "string",
    "primaryCta": "string",
    "budget": "string",
    "duration": "string",
    "landingSlug": "string"
  },
  "recommendedAreas": [
    { "name": "string", "score": 90, "reason": "string" }
  ],
  "placements": ["string"],
  "hotspots": [
    {
      "area": "string",
      "microZone": "string",
      "landmark": "string",
      "crowdType": "string",
      "congestion": "High",
      "bestTime": "string",
      "suggestedPlacement": "string",
      "brandFit": "string"
    }
  ],
  "billboardRecommendations": [
    {
      "title": "string",
      "area": "string",
      "microZone": "string",
      "placementType": "Road-facing billboard",
      "visibility": "string",
      "weeklyPrice": "₹15000/week",
      "estimatedFootfall": "string",
      "audienceTags": ["string"],
      "ownerStatus": "Available / Owner review / Pending confirmation",
      "reason": "string"
    }
  ],
  "creatives": [
    { "format": "Poster copy", "headline": "string", "body": "string", "cta": "string" }
  ],
  "outreachDrafts": [
    { "type": "Cafe outreach", "message": "string" }
  ]
}

Use Bangalore neighborhoods. Prefer Indiranagar, Koramangala, HSR Layout, Domlur, MG Road, Church Street, Whitefield, Jayanagar, JP Nagar, Bellandur, Marathahalli, Kalyan Nagar where relevant.
For hotspots and billboardRecommendations, evaluate traffic congestion, pedestrian/vehicle movement, crowd type, nearby landmarks, board visibility, expected attention, and why the brand fits that placement.
Include billboards, hoardings, metro panels, signal boards, and local placements where appropriate.
Do not claim outreach has been sent. Draft only.
Budget hint: ${budget ? `₹${budget}` : "starter ₹15,000"}.

URL: ${sourceUrl}
Title: ${website.title}
Description: ${website.description}
Text:
${website.textSample}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You turn websites into concise, execution-ready Bangalore local campaign boards.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string") return null;

  try {
    const parsed = JSON.parse(content) as Omit<AgentResult, "sourceUrl" | "fetchedAt" | "mode" | "website">;
    return {
      sourceUrl,
      fetchedAt: new Date().toISOString(),
      mode: "llm",
      website,
      ...parsed,
    };
  } catch {
    return null;
  }
}

function buildHeuristicResult(
  sourceUrl: string,
  website: AgentResult["website"],
  budget?: number,
): AgentResult {
  const combined = `${website.title} ${website.description} ${website.textSample}`.toLowerCase();
  const hostName = hostnameToName(sourceUrl);
  const businessName = extractBusinessName(website.title, hostName);
  const category = inferCategory(combined);
  const location = inferLocation(combined);
  const audience = inferAudience(category, location);
  const campaignName = inferCampaignName(category);
  const cta = inferCta(category);
  const offer = inferOffer(category);
  const landingSlug = `/localboard/${slugify(businessName)}-${slugify(location)}`;

  return {
    sourceUrl,
    fetchedAt: new Date().toISOString(),
    mode: "heuristic",
    website,
    business: {
      name: businessName,
      category,
      subCategory: inferSubCategory(category, combined),
      audience,
      pricePoint: inferPricePoint(combined),
      brandVoice: inferBrandVoice(combined),
      location,
      conversionGoal: inferConversionGoal(category),
      suggestedCta: cta,
    },
    campaign: {
      name: campaignName,
      angle: `${businessName} should launch where ${audience.toLowerCase()} already move, wait, work, and discover.`,
      offer,
      primaryCta: cta,
      budget: budget ? `₹${budget.toLocaleString("en-IN")} starter campaign` : "₹15,000 starter campaign",
      duration: "7 days",
      landingSlug,
    },
    recommendedAreas: recommendAreas(category, location),
    placements: recommendPlacements(category),
    hotspots: buildHotspots(category, location),
    billboardRecommendations: buildBillboardRecommendations(category, location),
    creatives: buildCreatives(category, businessName, location, offer, cta),
    outreachDrafts: buildOutreachDrafts(businessName, category, location),
  };
}

function extractTag(html: string, tag: string) {
  return html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1] ?? "";
}

function extractMeta(html: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return html.match(pattern)?.[1] ?? "";
}

function htmlToText(html: string) {
  return cleanText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function hostnameToName(sourceUrl: string) {
  const hostname = new URL(sourceUrl).hostname.replace(/^www\./, "");
  const name = hostname.split(".")[0] || "Local Business";
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractBusinessName(title: string, fallback: string) {
  const cleanTitle = cleanText(title).split(/[|–—-]/)[0]?.trim();
  return cleanTitle && cleanTitle.length > 2 ? cleanTitle : fallback;
}

function inferCategory(text: string) {
  if (hasAny(text, ["fitness", "gym", "pilates", "yoga", "workout", "strength"])) return "Fitness studio";
  if (hasAny(text, ["clinic", "dermatology", "skin", "doctor", "consultation"])) return "Clinic";
  if (hasAny(text, ["cafe", "coffee", "restaurant", "menu", "dining"])) return "Cafe or restaurant";
  if (hasAny(text, ["salon", "spa", "hair", "beauty", "makeup"])) return "Salon or spa";
  if (hasAny(text, ["coaching", "tuition", "course", "students", "classes"])) return "Coaching center";
  if (hasAny(text, ["popup", "fashion", "apparel", "d2c", "store"])) return "D2C popup brand";
  if (hasAny(text, ["coworking", "workspace", "office", "meeting room"])) return "Coworking space";
  return "Premium local service business";
}

function inferSubCategory(category: string, text: string) {
  if (category === "Fitness studio" && hasAny(text, ["pilates"])) return "Pilates and beginner fitness";
  if (category === "Clinic" && hasAny(text, ["skin", "dermatology"])) return "Dermatology and consultation";
  if (category === "Cafe or restaurant" && hasAny(text, ["coffee"])) return "Coffee and casual dining";
  return category;
}

function inferLocation(text: string) {
  const areas = [
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
    "Marathahalli",
    "Kalyan Nagar",
  ];
  return areas.find((area) => text.includes(area.toLowerCase())) ?? "Indiranagar";
}

function inferAudience(category: string, location: string) {
  if (category === "Fitness studio") return `working professionals and wellness-focused residents near ${location}`;
  if (category === "Clinic") return `premium residents, office-goers, and consultation-ready customers near ${location}`;
  if (category === "Cafe or restaurant") return `nearby office crowds, students, residents, and weekend discovery traffic near ${location}`;
  if (category === "Salon or spa") return `premium lifestyle buyers and residents near ${location}`;
  if (category === "Coaching center") return `students and parents around ${location}`;
  return `high-intent local customers near ${location}`;
}

function inferPricePoint(text: string) {
  if (hasAny(text, ["premium", "luxury", "bespoke", "exclusive"])) return "premium";
  if (hasAny(text, ["affordable", "budget", "value"])) return "value";
  return "mid-market";
}

function inferBrandVoice(text: string) {
  if (hasAny(text, ["premium", "luxury", "expert"])) return "premium and expert-led";
  if (hasAny(text, ["fun", "community", "friendly"])) return "friendly and community-led";
  return "direct and useful";
}

function inferConversionGoal(category: string) {
  if (category === "Cafe or restaurant") return "store visits and offer redemptions";
  if (category === "Coaching center") return "enquiry calls and trial class bookings";
  return "lead capture and booking enquiries";
}

function inferCta(category: string) {
  if (category === "Cafe or restaurant") return "Scan for today's offer";
  if (category === "Coaching center") return "Book a trial class";
  if (category === "Fitness studio") return "Book a trial batch";
  if (category === "Clinic") return "Book a consultation";
  return "Message on WhatsApp";
}

function inferOffer(category: string) {
  if (category === "Fitness studio") return "Book a 7-day beginner trial nearby.";
  if (category === "Clinic") return "Book your first consultation with priority slots.";
  if (category === "Cafe or restaurant") return "Scan for a neighborhood-only launch offer.";
  if (category === "Salon or spa") return "Claim a first-visit grooming or wellness offer.";
  if (category === "Coaching center") return "Book a free trial class this week.";
  return "Claim a local launch offer nearby.";
}

function inferCampaignName(category: string) {
  if (category === "Fitness studio") return "7 Days Near Work";
  if (category === "Clinic") return "Consultation Close By";
  if (category === "Cafe or restaurant") return "Your Next Table Nearby";
  if (category === "Salon or spa") return "Glow Up Around The Corner";
  if (category === "Coaching center") return "Trial Class Near Home";
  return "Three Streets Away";
}

function recommendAreas(category: string, location: string): AreaRecommendation[] {
  const base = [
    {
      name: location,
      score: 92,
      reason: "Closest fit based on the business location and local discovery intent.",
    },
  ];

  if (["Fitness studio", "Clinic", "Salon or spa", "Premium local service business"].includes(category)) {
    return [
      ...base,
      { name: "Domlur", score: 84, reason: "Office crowd and residential spillover from Indiranagar and Koramangala." },
      { name: "Koramangala", score: 81, reason: "Young professionals, startup offices, cafes, and high evening activity." },
    ];
  }

  if (category === "Cafe or restaurant") {
    return [
      ...base,
      { name: "Koramangala", score: 86, reason: "Strong food discovery behavior across students and startup teams." },
      { name: "MG Road + Church Street", score: 82, reason: "High footfall and weekend discovery for food and events." },
    ];
  }

  return [
    ...base,
    { name: "HSR Layout", score: 82, reason: "Residential and founder-heavy neighborhoods support local services." },
    { name: "Jayanagar", score: 78, reason: "Families and students make it strong for coaching, clinics, and local services." },
  ];
}

function recommendPlacements(category: string) {
  if (category === "Fitness studio") return ["Signal billboards", "Cafe table cards", "Salon mirror stickers", "Coworking lobby screens"];
  if (category === "Clinic") return ["Office corridor billboards", "Salon counter cards", "Apartment noticeboards", "Clinic referral cards"];
  if (category === "Cafe or restaurant") return ["Junction hoardings", "PG posters", "Coworking lobby cards", "Event flyers"];
  if (category === "Salon or spa") return ["Lifestyle corridor billboards", "Cafe table cards", "Gym reception standees", "Boutique store placements"];
  return ["Road-facing billboards", "Cafe table cards", "Coworking lobby screens", "Retail counter cards"];
}

function buildHotspots(category: string, location: string): Hotspot[] {
  const primaryPlacement =
    category === "Cafe or restaurant" ? "junction hoarding + PG posters" : "road-facing billboard + QR cards";

  return [
    {
      area: location,
      microZone: location === "Indiranagar" ? "100 Feet Road" : "primary commercial stretch",
      landmark: location === "Indiranagar" ? "12th Main signal" : `${location} high-street junction`,
      crowdType: inferAudience(category, location),
      congestion: "High",
      bestTime: "5 PM to 10 PM",
      suggestedPlacement: primaryPlacement,
      brandFit: "Best for repeated visual recall during signal waits, evening walks, and local discovery moments.",
    },
    {
      area: "Koramangala",
      microZone: "5th Block",
      landmark: "Cafe and college route cluster",
      crowdType: "students, startup teams, food crowd, and young professionals",
      congestion: "High",
      bestTime: "4 PM to 11 PM",
      suggestedPlacement: "junction hoarding + event flyers",
      brandFit: "Useful when the brand needs creator, student, and founder attention in the same zone.",
    },
    {
      area: "MG Road + Church Street",
      microZone: "Metro exit corridor",
      landmark: "Church Street weekend stretch",
      crowdType: "weekend shoppers, creators, tourists, and nightlife crowd",
      congestion: "Very high",
      bestTime: "Friday evening to Sunday night",
      suggestedPlacement: "street-adjacent display panel + QR flyers",
      brandFit: "Strong for high-recall launch campaigns and brands with visual products or offers.",
    },
  ];
}

function buildBillboardRecommendations(category: string, location: string): BillboardRecommendation[] {
  return [
    {
      title: `${location} Signal Board`,
      area: location,
      microZone: location === "Indiranagar" ? "12th Main signal" : "main commercial signal",
      placementType: "Road-facing billboard",
      visibility: "Signal wait visibility with two-way vehicle flow",
      weeklyPrice: "₹18,000/week",
      estimatedFootfall: "42,000 weekly passersby",
      audienceTags: [inferPricePoint(category), "local discovery", "commuters", "evening crowd"],
      ownerStatus: "Owner details ready for review",
      reason: "Strong fit for brands that need repeated recall in a high-attention local corridor.",
    },
    {
      title: "Koramangala 5th Block Corner Board",
      area: "Koramangala",
      microZone: "5th Block cafe lane",
      placementType: "Junction hoarding",
      visibility: "Pedestrian plus two-wheeler slowdown",
      weeklyPrice: "₹14,500/week",
      estimatedFootfall: "38,000 weekly passersby",
      audienceTags: ["students", "startup teams", "young professionals"],
      ownerStatus: "Available this week",
      reason: "Good for brands targeting startup teams, students, and younger urban buyers.",
    },
    {
      title: "Church Street Metro Exit Panel",
      area: "MG Road + Church Street",
      microZone: "Metro exit corridor",
      placementType: "Street-adjacent display panel",
      visibility: "Weekend pedestrian discovery",
      weeklyPrice: "₹21,000/week",
      estimatedFootfall: "55,000 weekly passersby",
      audienceTags: ["weekend shoppers", "creators", "nightlife", "tourists"],
      ownerStatus: "Pending owner confirmation",
      reason: "Best for high-footfall launch visibility, event discovery, fashion, food, merch, and D2C campaigns.",
    },
  ];
}

function buildCreatives(
  category: string,
  businessName: string,
  location: string,
  offer: string,
  cta: string,
): Creative[] {
  return [
    {
      format: "Poster copy",
      headline: `${businessName}, now easier to discover near ${location}.`,
      body: offer,
      cta,
    },
    {
      format: "Cafe table card copy",
      headline: "Your next local find may be three streets away.",
      body: `${businessName} is running a neighborhood campaign near ${location}.`,
      cta,
    },
    {
      format: "WhatsApp flyer copy",
      headline: `Hi, I want to know more about ${businessName}.`,
      body: `Please share availability, pricing, and the current ${category.toLowerCase()} offer.`,
      cta: "Send message",
    },
  ];
}

function buildOutreachDrafts(businessName: string, category: string, location: string) {
  return [
    {
      type: "Cafe outreach",
      message: `Hi, we are launching a local campaign for ${businessName}, a ${category.toLowerCase()} near ${location}. Would you be open to placing a table card at your cafe for one week? We will share print-ready creative, QR tracking, and proof requirements.`,
    },
    {
      type: "Apartment manager outreach",
      message: `Hi, ${businessName} is running a neighborhood campaign near ${location}. Could we place a small poster on your noticeboard for one week? The creative includes a QR code and clear booking CTA.`,
    },
    {
      type: "Coworking manager outreach",
      message: `Hi, we are preparing a local launch campaign for ${businessName}. Would your lobby or community board be available for a one-week placement? We will provide the creative and tracking link.`,
    },
  ];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}
