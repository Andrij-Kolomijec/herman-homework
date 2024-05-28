import map from "../components/map";

const galleryWrapper = document.getElementById("gallery-wrapper");
const overlay = document.getElementById("image-overlay");

function closeImageOverlay() {
  overlay.style.display = "none";
  galleryWrapper.style.overflow = "auto";
  document
    .querySelector(".marker-selected")
    .classList.remove("marker-selected");
}

export default function openImageOverlay(url, latitude, longitude) {
  overlay.innerHTML = "";

  const img = document.createElement("img");
  img.src = url;
  overlay.appendChild(img);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.className = "close-button";
  closeButton.addEventListener("click", closeImageOverlay);

  const viewOriginalButton = document.createElement("button");
  viewOriginalButton.textContent = "View Original";
  viewOriginalButton.className = "view-original-button";
  viewOriginalButton.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  overlay.appendChild(closeButton);
  overlay.appendChild(viewOriginalButton);
  galleryWrapper.appendChild(overlay);

  galleryWrapper.scrollTo({
    top: 0,
  });

  overlay.style.display = "flex";
  galleryWrapper.style.overflow = "hidden";
  map.setView([latitude, longitude], 18);
}
