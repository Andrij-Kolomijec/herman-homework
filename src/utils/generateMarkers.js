import exifr from "exifr";
import openImageOverlay from "../utils/imageOverlay";

const markerDefault = L.icon({
  iconUrl: "marker-default.svg",
  iconSize: [32, 32],
});

function triggerMarkerClick(map, url, marker, index, latitude, longitude) {
  document
    .querySelector(".marker-selected")
    ?.classList.remove("marker-selected");

  openImageOverlay(url, index, latitude, longitude);
  map.setView([latitude, longitude], 18);
  document.querySelectorAll(".marker-in-view").forEach((marker) => {
    marker.classList.remove("marker-in-view");
  });

  const markerElement = marker.getElement();
  if (markerElement) {
    markerElement.classList.add("marker-selected");
  }
}

export default async function generateMarkers(L, map, images) {
  try {
    const imageMetadata = [];

    for (const image of images) {
      const metadata = await exifr.parse(image);
      imageMetadata.push(metadata);
    }

    imageMetadata.forEach((image, index) => {
      if (image && image.latitude && image.longitude) {
        const marker = L.marker([image.latitude, image.longitude], {
          icon: markerDefault,
          riseOnHover: true,
        });

        marker._imageIndex = index;

        marker
          .on("add", function () {
            const markerElement = marker.getElement();

            markerElement.dataset.index = index;
            markerElement.dataset.latitude = image.latitude;
            markerElement.dataset.longitude = image.longitude;
            markerElement.addEventListener("keydown", function (e) {
              if (e.key === "Enter") {
                triggerMarkerClick(
                  map,
                  images[index],
                  marker,
                  index,
                  image.latitude,
                  image.longitude
                );
              }
            });
          })
          .addTo(map)
          .on("click", function () {
            triggerMarkerClick(
              map,
              images[index],
              marker,
              index,
              image.latitude,
              image.longitude
            );
          });

        if (image.ImageDescription) {
          marker.bindPopup(image.ImageDescription);
        }
      }
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
