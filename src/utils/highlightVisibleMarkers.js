export default function highlightVisibleMarkers() {
  const gallery = document.querySelector("#gallery");
  const images = gallery.querySelectorAll("img");
  const markers = document.querySelectorAll(".leaflet-marker-icon");

  const visibleImageIndices = [];
  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      visibleImageIndices.push(index);
    }
  });

  markers.forEach((marker) => {
    if (visibleImageIndices.includes(+marker.dataset.index)) {
      marker.classList.add("marker-in-view");
      marker.style.zIndex = 1000;
    } else {
      marker.classList.remove("marker-in-view");
      marker.style.zIndex = 0;
    }
  });
}
