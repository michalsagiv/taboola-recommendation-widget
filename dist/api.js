import { mockRecommendations } from "./mockData";
const API_BASE = "https://api.taboola.com/1.0/json";
const originMap = {
    sponsored: "sponsored",
    organic: "organic",
    video: "video",
};
const toOrigin = (value) => {
    if (!value)
        return "unknown";
    const lower = value.toLowerCase();
    return originMap[lower] ?? "unknown";
};
export const getTargetFromOrigin = (origin) => {
    return origin === "sponsored" ? "_blank" : "_self";
};
export const pickThumbnail = (item) => {
    if (!item?.thumbnail || item.thumbnail.length === 0)
        return undefined;
    const candidate = item.thumbnail.find((thumb) => Boolean(thumb.url)) ?? item.thumbnail[0];
    return candidate?.url;
};
export const normalizeRecommendation = (item) => {
    const url = item.url?.trim();
    const id = item.id?.trim();
    if (!url || !id)
        return null;
    const origin = toOrigin(item.origin ?? item.type);
    return {
        id,
        title: item.name?.trim() || "Untitled",
        description: item.description?.trim() || undefined,
        branding: item.branding?.trim() || undefined,
        thumbnailUrl: pickThumbnail(item),
        url,
        origin,
        target: getTargetFromOrigin(origin),
    };
};
export const mapResponseToRecommendations = (payload) => {
    if (!payload?.list)
        return [];
    const unique = new Map();
    payload.list.forEach((raw) => {
        const normalized = normalizeRecommendation(raw);
        if (normalized && !unique.has(normalized.id)) {
            unique.set(normalized.id, normalized);
        }
    });
    return Array.from(unique.values());
};
export const buildApiUrl = (request) => {
    const params = new URLSearchParams({
        "app.type": request.appType,
        "app.apikey": request.appApiKey,
        "source.id": request.sourceId,
    });
    if (request.sourceType)
        params.set("source.type", request.sourceType);
    if (request.sourceUrl)
        params.set("source.url", request.sourceUrl);
    if (request.count)
        params.set("count", String(request.count));
    return `${API_BASE}/${request.publisher}/recommendations.get?${params.toString()}`;
};
export const fetchRecommendations = async (request, options = { fallbackToMock: true }) => {
    const url = buildApiUrl(request);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Taboola API error: ${response.status}`);
        }
        const json = (await response.json());
        const mapped = mapResponseToRecommendations(json);
        if (mapped.length === 0) {
            throw new Error("Empty recommendations");
        }
        return mapped;
    }
    catch (error) {
        if (!options.fallbackToMock)
            throw error;
        console.warn("Falling back to mock recommendations", error);
        return mockRecommendations;
    }
};
