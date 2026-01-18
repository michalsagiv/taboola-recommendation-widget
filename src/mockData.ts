import { RecommendationItem } from "./types.js";

export const mockRecommendations: RecommendationItem[] = [
  {
    id: "demo-spon-1",
    title: "Design systems that scale across brands",
    description: "How to keep typography, spacing, and motion in sync when teams ship fast.",
    branding: "Pattern Co.",
    thumbnailUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    url: "https://example.com/design-systems",
    origin: "sponsored",
    target: "_blank",
  },
  {
    id: "demo-org-1",
    title: "Behind the scenes of our newsroom CMS",
    description: "Why we ship content in under 5 minutes and how editors collaborate.",
    branding: "Taboola Tech",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    url: "https://example.com/newsroom-cms",
    origin: "organic",
    target: "_self",
  },
  {
    id: "demo-spon-2",
    title: "Grow conversions with creative testing",
    description: "A 3-step playbook for outperforming your control creative by 28%.",
    branding: "LiftLab",
    thumbnailUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    url: "https://example.com/creative-testing",
    origin: "sponsored",
    target: "_blank",
  },
  {
    id: "demo-org-2",
    title: "Performance budgets that keep pages lean",
    description: "Guardrails for loading third-party widgets on publisher pages.",
    branding: "Engineering",
    thumbnailUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    url: "https://example.com/performance-budgets",
    origin: "organic",
    target: "_self",
  },
];
