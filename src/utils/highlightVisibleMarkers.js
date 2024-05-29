import map from "../components/map";
import haversineDistance from "./harvesineDistance";

async function focusViewOnMarkers() {
  const markersInView = Array.from(
    document.querySelectorAll(".marker-in-view")
  );

  const coordinates = markersInView.map((marker) => {
    const latitude = +marker.dataset.latitude;
    const longitude = +marker.dataset.longitude;
    return { latitude, longitude };
  });

  let maxDistance = 0;
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const distance = haversineDistance(
        coordinates[i].latitude,
        coordinates[i].longitude,
        coordinates[j].latitude,
        coordinates[j].longitude
      );
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }

  let zoomLevel;
  if (maxDistance < 10) {
    zoomLevel = 12;
  } else if (maxDistance < 100) {
    zoomLevel = 10;
  } else if (maxDistance < 500) {
    zoomLevel = 8;
  } else {
    zoomLevel = 7;
  }

  const avgLatitude =
    coordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
    coordinates.length;
  const avgLongitude =
    coordinates.reduce((sum, coord) => sum + coord.longitude, 0) /
    coordinates.length;

  map.setView([avgLatitude, avgLongitude], zoomLevel);
}

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
  focusViewOnMarkers();
}
