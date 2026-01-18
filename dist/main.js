import { fetchRecommendations } from "./api";
import { renderError, renderRecommendations, renderSkeleton } from "./dom";
const defaultRequest = {
    appType: "desktop",
    appApiKey: "f9040ab1b9c802857aa783c469d0e0ff7e7366e4",
    publisher: "taboola-templates",
    sourceId: "demo-video-214321562187",
    sourceType: "video",
    sourceUrl: "http://www.site.com/videos/214321562187.html",
    count: 8,
};
const bootstrap = async ({ containerId = "taboola-widget" } = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Missing container element with id ${containerId}`);
    }
    renderSkeleton(container, 6);
    try {
        const recommendations = await fetchRecommendations(defaultRequest, { fallbackToMock: true });
        renderRecommendations(container, recommendations);
    }
    catch (error) {
        console.error(error);
        renderError(container, "Unable to load recommendations right now.");
    }
};
void bootstrap();
