const map = L.map("map").setView([32, 35], 8);

const osm = L.tileLayer(import.meta.env.VITE_PORT_MAPTILER, {
  attribution: import.meta.env.VITE_PORT_LICENSE,
}).addTo(map);

const StadiaAlidadeSatellite = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "jpg",
  }
);

const StadiaOSMBright = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
);

// const mapdata = L.geoJSON(mapdata, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng, markerOptions);
//   },
// }).addTo(map);

const baseMaps = {
  Default: StadiaOSMBright,
  Terrain: osm,
  Satellite: StadiaAlidadeSatellite,
};

L.control.layers(baseMaps).addTo(map);

export default map;
