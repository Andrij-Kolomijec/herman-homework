import "./style.css";
import displayImages from "./components/gallery";
import generateMarkers from "./utils/generateMarkers";
import map from "./components/map";
import fetchImageUrls from "./utils/imageData";

async function initializeApp() {
  try {
    const images = await fetchImageUrls();

    displayImages(images);

    generateMarkers(L, map, images);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

initializeApp();
