import { describe, expect, it } from "vitest";
import { buildApiUrl, getTargetFromOrigin, mapResponseToRecommendations, normalizeRecommendation, pickThumbnail, } from "../src/api";
describe("buildApiUrl", () => {
    it("assembles the URL with all params", () => {
        const url = buildApiUrl({
            appType: "desktop",
            appApiKey: "key123",
            publisher: "taboola-templates",
            sourceId: "source-1",
            sourceType: "video",
            sourceUrl: "http://example.com/foo",
            count: 3,
        });
        expect(url).toContain("taboola-templates/recommendations.get?");
        expect(url).toContain("app.type=desktop");
        expect(url).toContain("app.apikey=key123");
        expect(url).toContain("source.id=source-1");
        expect(url).toContain("source.type=video");
        expect(url).toContain("source.url=http%3A%2F%2Fexample.com%2Ffoo");
        expect(url).toContain("count=3");
    });
});
describe("normalizeRecommendation", () => {
    it("returns null when required fields are missing", () => {
        expect(normalizeRecommendation({
            id: "abc",
            name: "Title",
        })).toBeNull();
    });
    it("maps fields and derives target", () => {
        const item = normalizeRecommendation({
            id: "1",
            name: "Story",
            url: "https://example.com",
            origin: "sponsored",
            thumbnail: [{ url: "https://img.com/a.jpg" }],
        });
        expect(item === null || item === void 0 ? void 0 : item.target).toBe("_blank");
        expect(item === null || item === void 0 ? void 0 : item.thumbnailUrl).toBe("https://img.com/a.jpg");
    });
});
describe("mapResponseToRecommendations", () => {
    it("deduplicates and filters invalid entries", () => {
        var _a;
        const payload = {
            list: [
                { id: "1", name: "A", url: "https://a.com", origin: "organic" },
                { id: "1", name: "A duplicate", url: "https://a.com", origin: "organic" },
                { id: "2", name: "B", origin: "organic" },
            ],
        };
        const result = mapResponseToRecommendations(payload);
        expect(result).toHaveLength(1);
        expect((_a = result[0]) === null || _a === void 0 ? void 0 : _a.id).toBe("1");
    });
});
describe("pickThumbnail", () => {
    it("returns first available url", () => {
        expect(pickThumbnail({ thumbnail: [{}, { url: "x" }] })).toBe("x");
    });
});
describe("getTargetFromOrigin", () => {
    it("opens sponsored in new tab", () => {
        expect(getTargetFromOrigin("sponsored")).toBe("_blank");
        expect(getTargetFromOrigin("organic")).toBe("_self");
    });
});
