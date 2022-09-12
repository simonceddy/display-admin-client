export function handleFile(file) {
  if (file.type) {
    switch (file.type) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/svg+xml':
        // Handle Image
        // Upload temp file
        // Crop thumbnail from image
        // Persist on save
        break;
      case 'video/x-m4v':
      case 'video/mp4':
      case 'video/webm':
        // Handle video
        // Upload temp file
        // Choose thumbnail from frames/upload from image
        // Persist on save
        break;
      default:
    }
  }
  return false;
}
