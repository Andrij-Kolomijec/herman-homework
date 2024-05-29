import exifr from "exifr";

export default async function sortImagesByCreationDate(images) {
  const metadataPromises = images.map(async (image) => {
    const metadata = await exifr.parse(image, ["CreateDate"]);
    return { image, metadata };
  });

  const imageDataArray = await Promise.all(metadataPromises);

  imageDataArray.sort((a, b) => {
    const dateA = new Date(a.metadata.CreateDate);
    const dateB = new Date(b.metadata.CreateDate);
    return dateA - dateB;
  });

  const sortedImageUrls = imageDataArray.map((data) => data.image);
  return sortedImageUrls;
}
