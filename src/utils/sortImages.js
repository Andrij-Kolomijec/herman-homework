import exifr from "exifr";
import haversineDistance from "./harvesineDistance";

export default async function sortImages(images) {
  const metadataPromises = images.map(async (image) => {
    const metadata = await exifr.parse(image);
    return { image, metadata };
  });

  const imageDataArray = await Promise.all(metadataPromises);

  const sortedImages = [imageDataArray[0]];
  imageDataArray.splice(0, 1);

  while (imageDataArray.length > 0) {
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;

    sortedImages.forEach((sortedImage) => {
      imageDataArray.forEach((imageData, imageIndex) => {
        const distance = haversineDistance(
          sortedImage.metadata.GPSLatitude[0],
          sortedImage.metadata.GPSLongitude[0],
          imageData.metadata.GPSLatitude[0],
          imageData.metadata.GPSLongitude[0]
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = imageIndex;
        }
      });
    });

    sortedImages.push(imageDataArray[closestIndex]);
    imageDataArray.splice(closestIndex, 1);
  }

  const sortedImageUrls = sortedImages.map((data) => data.image);
  return sortedImageUrls;
}
