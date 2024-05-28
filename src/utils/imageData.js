import fetchImagesFromGitHub from "../utils/fetchImages";

let imageUrlsPromise;

export default async function fetchImageUrls() {
  if (!imageUrlsPromise) {
    imageUrlsPromise = await fetchImagesFromGitHub();
  }
  return imageUrlsPromise;
}
