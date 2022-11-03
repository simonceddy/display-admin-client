import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';

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

export const fileStates = {
  UNSAVED: 'UNSAVED',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
};

export function getFileComponent(file, props = {}) {
  if (file.type) {
    switch (file.type) {
      case 'video/mp4':
      case 'video/x-m4v':
      case 'video/webm':
      // case 'video/x-flv':
        return <VideoViewer {...props} file={file} />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
        return <ImageViewer {...props} file={file} />;
      default:
    }
  }
  return null;
}
