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
          const response = await axios.post("https://api.picsart.io/tools/1.0/removebg", formData, {
             headers: {
                        'x-picsart-api-key': 'eyJraWQiOiI5NzIxYmUzNi1iMjcwLTQ5ZDUtOTc1Ni05ZDU5N2M4NmIwNTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoLXNlcnZpY2UtYjQ3OWNjNzQtMzM1ZC00OTA0LWI2MmQtODA2MDkxNTdhMzY0IiwiYXVkIjoiNDYwMTg5MzcxMDI2MTAxIiwibmJmIjoxNzQ3NjU4NTQzLCJzY29wZSI6WyJiMmItYXBpLmdlbl9haSIsImIyYi1hcGkuaW1hZ2VfYXBpIl0sImlzcyI6Imh0dHBzOi8vYXBpLnBpY3NhcnQuY29tL3Rva2VuLXNlcnZpY2UiLCJvd25lcklkIjoiNDYwMTg5MzcxMDI2MTAxIiwiaWF0IjoxNzQ3NjU4NTQzLCJqdGkiOiI1ZGMwZDQwNS05NmY4LTQ5MzgtYTJhYy1kYjk5YTFhYjk5MTQifQ.PkMWf3bubrGTFaiOczeF0fjp6TkGBjuzLko4LBibByWXlYBNyDz3EMSdAXx-1oPaleLmGx5Ptfe9K8cmddSqjU6pWQCdPQvLJgn28LcI309Z8fm_GXMHp_d_aSVGRHH9X4g4xQq9lQW_jgeitqMIzeS30uM8bf17EqMgwlUXVcXBtJ8u0OYCpday5uIYuB0u4Y4PPOD_jxVS0f5HYwfHNPA1gX3OHZc7OK_poiKgOhRIb--O_SFM7o-8UaLvBKqZ7Fn_VF1hkBxqhxCRTWcYZQNIYIYJKnVSAGh0GA4Z-M-6QSBBxBQ5IQkJi3ngKcvl1bHI0ZFVRDnLc43Cz5rE-g'
                      },
          });
       const bgRemovedResponse = await fetch(response.data.data.url);
         const bgRemovedBlob = await bgRemovedResponse.blob();
          const base64Image = ()=>{
            return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(bgRemovedBlob);
                      });
          };
          const updatedImage = {
            ...img,
            id: `${img.originalId}-bgremoved`,
            url: response.data.data.url,
            base64: base64Image(),
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
