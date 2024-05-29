import exifr from "exifr";
import openImageOverlay from "../utils/imageOverlay";

export default async function displayImages(images) {
  const gallery = document.querySelector("#gallery");

  if (images && images.length > 0) {
    gallery.innerHTML = "";

    const imageElements = await Promise.all(
      images.map(async (url, index) => {
        const img = document.createElement("img");
        img.src = await exifr.thumbnailUrl(url);
        img.alt = "Image from GitHub";
        img.loading = "lazy";
        img.role = "presentation";
        img.dataset.index = index;
        const metadata = await exifr.parse(url);
        img.dataset.latitude = metadata.latitude;
        img.dataset.longitude = metadata.longitude;
        img.dataset.src = url;
        img.addEventListener("click", (event) => {
          event.preventDefault();
          openImageOverlay(url, index, metadata.latitude, metadata.longitude);
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

        return img;
      })
    );

    imageElements.sort((a, b) => a.dataset.index - b.dataset.index);

    imageElements.forEach((img) => gallery.appendChild(img));
  } else {
    gallery.innerHTML = "<p>No image found.</p>";
  }
}
