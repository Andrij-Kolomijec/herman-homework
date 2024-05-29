import map from "../components/map";

const galleryWrapper = document.getElementById("gallery-wrapper");
const overlay = document.getElementById("image-overlay");
let savedScrollTop = 0;

function closeImageOverlay() {
  overlay.style.display = "none";
  galleryWrapper.style.overflow = "auto";
  document
    .querySelector(".marker-selected")
    ?.classList.remove("marker-selected");
}

export default function openImageOverlay(url, index, latitude, longitude) {
  overlay.innerHTML = "";
  savedScrollTop = galleryWrapper.scrollTop;

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

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className = "prev-button";
  prevButton.addEventListener("click", () => prevImage(index));

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className = "next-button";
  nextButton.addEventListener("click", () => nextImage(index));

  overlay.appendChild(prevButton);
  overlay.appendChild(nextButton);
  overlay.appendChild(closeButton);
  overlay.appendChild(viewOriginalButton);
  galleryWrapper.appendChild(overlay);

  overlay.style.display = "flex";
  galleryWrapper.style.overflow = "hidden";
  overlay.style.top = `${savedScrollTop}px`;
  map.setView([latitude, longitude], 18);

  document.addEventListener("keydown", (e) => handleKeyDown(e, index));
}

async function nextImage(index) {
  const images = [...galleryWrapper.querySelectorAll("img")];
  if (index < images.length - 2) {
    const nextImage = galleryWrapper.querySelector(
      `[data-index='${index + 1}']`
    );
    openImageOverlay(
      nextImage.dataset.src,
      index + 1,
      nextImage.dataset.latitude,
      nextImage.dataset.longitude
    );
    document
      .querySelector(".marker-selected")
      ?.classList.remove("marker-selected");

    const currentMarker = document
      .querySelector("#map")
      .querySelector(`[data-index="${index + 1}"]`);
    currentMarker.classList.add("marker-selected");
  }
}

async function prevImage(index) {
  if (index > 0) {
    const nextImage = galleryWrapper.querySelector(
      `[data-index='${index - 1}']`
    );
    openImageOverlay(
      nextImage.dataset.src,
      index - 1,
      nextImage.dataset.latitude,
      nextImage.dataset.longitude
    );
    document
      .querySelector(".marker-selected")
      ?.classList.remove("marker-selected");

    const currentMarker = document
      .querySelector("#map")
      .querySelector(`[data-index="${index - 1}"]`);
    currentMarker.classList.add("marker-selected");
  }
}

function handleKeyDown(event, index) {
  const { key } = event;
  if (key === "Escape") {
    closeImageOverlay();
  } else if (key === "ArrowLeft") {
    prevImage(index);
  } else if (key === "ArrowRight") {
    nextImage(index);
  }
}
