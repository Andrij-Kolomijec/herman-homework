import "./style.css";
import displayImages from "./components/gallery";
import generateMarkers from "./utils/generateMarkers";
import map from "./components/map";
import fetchImageUrls from "./utils/imageData";
import sortImagesByCreationDate from "./utils/sortImagesByCreationDate";
import highlightVisibleMarkers from "./utils/highlightVisibleMarkers";

async function initializeApp() {
  try {
    const images = await fetchImageUrls();

    const sortedImageUrls = await sortImagesByCreationDate(images);

    displayImages(sortedImageUrls);
    generateMarkers(L, map, sortedImageUrls);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

document
  .querySelector("#gallery-wrapper")
  .addEventListener("scroll", highlightVisibleMarkers);

initializeApp();

setTimeout(highlightVisibleMarkers, 2000);
