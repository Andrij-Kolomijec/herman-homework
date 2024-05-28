import "./style.css";
import displayImages from "./components/gallery";
import generateMarkers from "./utils/generateMarkers";
import map from "./components/map";
import fetchImageUrls from "./utils/imageData";
import sortImages from "./utils/sortImages";
import highlightVisibleMarkers from "./utils/highlightVisibleMarkers";

let sortedImageUrls;

async function initializeApp() {
  try {
    const images = await fetchImageUrls();

    sortedImageUrls = await sortImages(images);

    displayImages(sortedImageUrls);
    generateMarkers(L, map, sortedImageUrls);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

document
  .querySelector("#gallery-wrapper")
  .addEventListener("scroll", () => highlightVisibleMarkers(sortedImageUrls));

initializeApp();
