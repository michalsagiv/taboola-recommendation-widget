import { describe, expect, it } from "vitest";
import { renderRecommendations, renderSkeleton } from "../src/dom";
import { RecommendationItem } from "../src/types";

describe("renderers", () => {
  it("renders skeleton cards", () => {
    const container = document.createElement("div");
    renderSkeleton(container, 3);
    expect(container.querySelectorAll(".card").length).toBe(3);
  });

  it("renders recommendation cards", () => {
    const container = document.createElement("div");
    const items: RecommendationItem[] = [
      {
        id: "1",
        title: "Story",
        url: "https://example.com",
        origin: "organic",
        target: "_self",
        thumbnailUrl: "https://example.com/img.jpg",
      },
    ];

    renderRecommendations(container, items);
    expect(container.querySelectorAll(".card").length).toBe(1);
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("https://example.com");
  });
});
