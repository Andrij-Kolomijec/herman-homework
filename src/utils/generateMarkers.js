import exifr from "exifr";
import "leaflet.markercluster";

const markerOptions = {
  radius: 5,
  fillColor: "#0000ff",
  color: "#00000",
  weight: 5,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerDefault = L.icon({
  iconUrl: "public/marker-default.svg",
  iconSize: [32, 32],
});

const markerInView = L.icon({
  iconUrl: "marker-in-view.svg",
  iconSize: [32, 32],
});

const markerSelected = L.icon({
  iconUrl: "marker-selected.svg",
  iconSize: [32, 32],
});

export default async function generateMarkers(L, map, images) {
  try {
    // const images = await fetchImageUrls();
    const imageMetadata = [];

    for (const image of images) {
      const metadata = await exifr.parse(image);
      imageMetadata.push(metadata);
    }

    const myClusterLayer = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`,
        });
      },
    });

    imageMetadata.forEach((image) => {
      if (image && image.latitude && image.longitude) {
        const marker = L.marker([image.latitude, image.longitude], {
          icon: markerDefault,
        });
        if (image.ImageDescription) {
          marker.bindPopup(image.ImageDescription);
        }
        myClusterLayer.addLayer(marker);
      }
    });

    map.addLayer(myClusterLayer);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
