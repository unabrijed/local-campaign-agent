import { sampleCampaign } from "@/data/localboardDemo";

const storageKey = "localboard:lastAgentResult";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const functionAuthKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export type WebsiteAgentResult = {
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
  recommendedAreas: Array<{
    name: string;
    score: number;
    reason: string;
  }>;
  placements: string[];
  creatives: Array<{
    format: string;
    headline: string;
    body: string;
    cta: string;
  }>;
  outreachDrafts: Array<{
    type: string;
    message: string;
  }>;
};

export const runWebsiteAgent = async (url: string) => {
  if (!supabaseUrl) {
    throw new Error("Missing VITE_SUPABASE_URL in .env.");
  }

  if (!functionAuthKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY in .env.");
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/analyze-website`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: functionAuthKey,
      Authorization: `Bearer ${functionAuthKey}`,
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(await formatFunctionResponseError(response));
  }

  const data = (await response.json()) as WebsiteAgentResult | null;

  if (!data) {
    throw new Error("No agent result returned.");
  }

  saveAgentResult(data);
  return data;
};

const formatFunctionResponseError = async (response: Response) => {
  try {
    const payload = await response.clone().json();
    if (payload?.message) return String(payload.message);
    if (payload?.error) return String(payload.error);
    if (payload?.code) return String(payload.code);
  } catch {
    const text = await response.clone().text();
    if (text) return text;
  }

  return `LocalBoard agent failed with status ${response.status}.`;
};

export const saveAgentResult = (result: WebsiteAgentResult) => {
  sessionStorage.setItem(storageKey, JSON.stringify(result));
};

export const getStoredAgentResult = () => {
  const value = sessionStorage.getItem(storageKey);
  if (!value) return null;

  try {
    return JSON.parse(value) as WebsiteAgentResult;
  } catch {
    return null;
  }
};

export const getDisplayCampaign = (result: WebsiteAgentResult | null) => {
  if (!result) {
    return {
      sourceUrl: null,
      mode: "demo" as const,
      business: {
        name: sampleCampaign.business,
        category: sampleCampaign.category,
        subCategory: sampleCampaign.category,
        audience: sampleCampaign.audience,
        pricePoint: "premium",
        brandVoice: "premium and useful",
        location: sampleCampaign.location,
        conversionGoal: sampleCampaign.goal,
        suggestedCta: sampleCampaign.cta,
      },
      campaign: {
        name: sampleCampaign.name,
        angle: sampleCampaign.angle,
        offer: sampleCampaign.offer,
        primaryCta: sampleCampaign.cta,
        budget: sampleCampaign.budget,
        duration: sampleCampaign.duration,
        landingSlug: sampleCampaign.landingSlug,
      },
      recommendedAreas: sampleCampaign.recommendedAreas,
      placements: sampleCampaign.placements.map((placement) => placement.type),
      creatives: sampleCampaign.creatives,
      outreachDrafts: sampleCampaign.outreachDrafts.map((draft) => ({
        type: draft.type,
        message: draft.message,
      })),
      tracking: sampleCampaign.tracking,
      checklist: sampleCampaign.checklist,
    };
  }

  return {
    sourceUrl: result.sourceUrl,
    mode: result.mode,
    business: result.business,
    campaign: result.campaign,
    recommendedAreas: result.recommendedAreas,
    placements: result.placements,
    creatives: result.creatives,
    outreachDrafts: result.outreachDrafts,
    tracking: sampleCampaign.tracking,
    checklist: sampleCampaign.checklist,
  };
};
