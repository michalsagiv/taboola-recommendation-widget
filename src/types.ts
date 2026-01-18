export type RecommendationOrigin = "sponsored" | "organic" | "video" | "unknown";

export interface RecommendationApiResponse {
  id?: string;
  description?: string;
  type?: string;
  name?: string;
  created?: string;
  branding?: string;
  duration?: string;
  views?: string;
  thumbnail?: Array<{ url?: string; width?: string; height?: string }>;
  categories?: string[];
  origin?: RecommendationOrigin;
  url?: string;
}

export interface RecommendationResponseEnvelope {
  id?: string;
  list?: RecommendationApiResponse[];
}

export interface RecommendationRequest {
  appType: "desktop" | "mobile";
  appApiKey: string;
  publisher: string;
  sourceId: string;
  sourceType?: "video" | "homepage" | "article" | string;
  sourceUrl?: string;
  count?: number;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description?: string;
  branding?: string;
  thumbnailUrl?: string;
  url: string;
  origin: RecommendationOrigin;
  target: "_blank" | "_self";
}
