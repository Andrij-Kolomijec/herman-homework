export default async function fetchImagesFromGitHub() {
  const repoOwner = "cebreus";
  const repoName = "herman-homework";
  const branch = "dfc7bfb7f4ec8ebc6098c658d0cfe5ff70c3d822";
  const directoryPath = "content";

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directoryPath}?ref=${branch}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the list of images.");
    }
    const files = await response.json();

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    );

    const imageUrls = imageFiles.map((file) => {
      return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${directoryPath}/${file.name}`;
    });

    return imageUrls;
  } catch (error) {
    console.error("Error fetching images from GitHub:", error);
  }
}
