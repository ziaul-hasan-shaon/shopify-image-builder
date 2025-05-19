import axios from "axios";

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Main function
export const handleImageUpload = async ({
  acceptedFiles,
  canvas,
  setUploadedImages,
  setLoading,
  setBgRemoveLoading,
  handleImageSelect,
  handleSelectedImageDelet,
  toast,
}) => {
  setLoading(true);

  const initialImages = await Promise.all(
    acceptedFiles.map(async (file) => {
      const base64 = await fileToBase64(file);
      const originalId = Date.now() + Math.random();
      const image = {
        id: `${originalId}-initial`,
        originalId,
        title: file.name,
        url: base64,
        previewUrl: URL.createObjectURL(file),
        base64,
        file,
      };

      // Show initial image on canvas
      setTimeout(() => {
        if (canvas && handleImageSelect) {
          handleImageSelect(image);
        } else {
          console.warn("Canvas not ready yet");
        }
      }, 500);

      return image;
    })
  );

  // Set initial images to state
  setUploadedImages((prev) => [...prev, ...initialImages]);

  // Handle background removal
  const delayedBackgroundRemoval = initialImages.map((img) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const formData = new FormData();
        formData.append("image", img.file);

        try {
          const response = await axios.post("http://localhost:5000/remove-bg", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const base64Image = `data:image/png;base64,${response.data.image}`;
          const updatedImage = {
            ...img,
            id: `${img.originalId}-bgremoved`,
            url: base64Image,
            base64: base64Image,
          };

          // Update canvas
          setTimeout(() => {
            if (canvas && handleImageSelect && handleSelectedImageDelet) {
              handleImageSelect(updatedImage);
              handleSelectedImageDelet(img.id);
            } else {
              console.warn("Canvas not ready yet");
            }
          }, 500);

          resolve(updatedImage);
        } catch (error) {
          console.error("Error removing background:", error);
          toast?.error("An error occurred while removing background");
          reject(error);
        }
      }, 300);
    });
  });

  try {
    setBgRemoveLoading(true);
    const updatedImages = await Promise.all(delayedBackgroundRemoval);

    // Replace initial image with background-removed version
    setUploadedImages((prev) => {
      const filtered = prev.filter(
        (img) => !updatedImages.find((u) => u.originalId === img.originalId)
      );
      return [...filtered, ...updatedImages];
    });
  } finally {
    setLoading(false);
    setBgRemoveLoading(false);
  }
};
