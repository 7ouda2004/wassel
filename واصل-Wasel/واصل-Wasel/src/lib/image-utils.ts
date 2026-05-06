/**
 * Compress an image file to a smaller base64 string.
 * Resizes to max dimensions and reduces quality to keep size under ~50KB.
 */
export const compressImage = (
  file: File,
  maxWidth: number = 400,
  maxHeight: number = 400,
  quality: number = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/webp', quality);
      
      resolve(compressed);
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    // Read file as data URL to load into img
    const reader = new FileReader();
    reader.onloadend = () => {
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Compress for profile photos (smaller, circular avatars)
 */
export const compressProfilePhoto = (file: File): Promise<string> => {
  return compressImage(file, 200, 200, 0.75);
};

/**
 * Compress for product images (slightly larger)
 */
export const compressProductImage = (file: File): Promise<string> => {
  return compressImage(file, 500, 500, 0.7);
};
