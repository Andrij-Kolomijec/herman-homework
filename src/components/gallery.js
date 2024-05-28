import exifr from "exifr";
import openImageOverlay from "../utils/imageOverlay";

export default async function displayImages(images) {
  const gallery = document.querySelector("#gallery");

  if (images && images.length > 0) {
    gallery.innerHTML = "";
    images.forEach(async (url, index) => {
      // const link = document.createElement("a");
      // link.target = "_blank";
      // link.href = url;

      const img = document.createElement("img");
      img.src = await exifr.thumbnailUrl(url);
      img.alt = "Image from GitHub";
      img.loading = "lazy";
      img.role = "presentation";
      img.dataset.index = index;
      const metadata = await exifr.parse(url);
      img.addEventListener("click", (event) => {
        event.preventDefault();
        openImageOverlay(url, metadata.latitude, metadata.longitude);
        document.querySelectorAll(".marker-in-view").forEach((marker) => {
          marker.classList.remove("marker-in-view");
        });
        const marker = document
          .querySelector("#map")
          .querySelector(`[data-index="${index}"]`);
        if (marker) {
          marker.classList.add("marker-selected");
        }
      });

      // link.appendChild(img);
      gallery.appendChild(img);
    });
  } else {
    gallery.innerHTML = "<p>No image found.</p>";
  }
}
