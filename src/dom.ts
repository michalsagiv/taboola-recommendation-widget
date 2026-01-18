import { RecommendationItem } from "./types.js";

export const clearNode = (node: HTMLElement) => {
  while (node.firstChild) node.removeChild(node.firstChild);
};

export const renderSkeleton = (container: HTMLElement, count = 4) => {
  clearNode(container);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const card = document.createElement("article");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "card__thumb skeleton thumb";
    card.appendChild(thumb);

    const body = document.createElement("div");
    body.className = "card__body";

    const line1 = document.createElement("div");
    line1.className = "skeleton";
    const line2 = document.createElement("div");
    line2.className = "skeleton";
    line2.style.width = "70%";

    body.append(line1, line2);
    card.appendChild(body);
    fragment.appendChild(card);
  }
  container.appendChild(fragment);
};

const buildCard = (item: RecommendationItem): HTMLElement => {
  const anchor = document.createElement("a");
  anchor.className = "card";
  anchor.href = item.url;
  anchor.target = item.target;
  anchor.rel = item.target === "_blank" ? "noopener noreferrer" : "nofollow";

  if (item.thumbnailUrl) {
    const thumb = document.createElement("div");
    thumb.className = "card__thumb";

    const pill = document.createElement("span");
    pill.className = "card__pill";
    pill.textContent = item.origin === "sponsored" ? "Sponsored" : item.origin === "organic" ? "Organic" : "Story";

    const img = document.createElement("img");
    img.src = item.thumbnailUrl;
    img.alt = item.title;

    thumb.append(pill, img);
    anchor.appendChild(thumb);
  }

  const body = document.createElement("div");
  body.className = "card__body";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = item.title;

  const desc = document.createElement("p");
  desc.className = "card__desc";
  desc.textContent = item.description ?? "";
  if (!item.description) desc.style.display = "none";

  const meta = document.createElement("div");
  meta.className = "card__meta";

  const left = document.createElement("span");
  const dot = document.createElement("span");
  dot.className = `source-dot${item.origin === "sponsored" ? " is-sponsored" : ""}`;

  const brand = document.createElement("span");
  brand.textContent = item.branding ?? "";

  left.append(dot, brand);
  const targetLabel = document.createElement("small");
  targetLabel.textContent = item.target === "_blank" ? "Opens in new tab" : "Opens here";

  meta.append(left, targetLabel);
  body.append(title, desc, meta);
  anchor.appendChild(body);

  return anchor;
};

export const renderRecommendations = (container: HTMLElement, items: RecommendationItem[]) => {
  clearNode(container);
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(buildCard(item)));
  container.appendChild(fragment);
};

export const renderError = (container: HTMLElement, message: string) => {
  clearNode(container);
  const box = document.createElement("div");
  box.className = "error";
  box.textContent = message;
  container.appendChild(box);
};
