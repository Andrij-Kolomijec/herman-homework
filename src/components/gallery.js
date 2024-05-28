import exifr from "exifr";

export default async function displayImages(images) {
  const gallery = document.querySelector("#gallery");

  // const imageUrls = await fetchImageUrls();

  if (images && images.length > 0) {
    gallery.innerHTML = "";
    images.forEach(async (url, index) => {
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = url;

      const img = document.createElement("img");
      img.src = await exifr.thumbnailUrl(url);
      img.alt = "Image from GitHub";
      img.loading = "lazy";
      img.role = "presentation";
      img.dataset.index = index;

      link.appendChild(img);
      gallery.appendChild(link);
    });
  } else {
    gallery.innerHTML = "<p>No image found.</p>";
  }
}
