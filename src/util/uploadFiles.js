import client from './client';

export default function uploadFiles(files) {
  const formData = new FormData();
  files.map((file) => formData.append(file.name, file));
  return client.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .catch(console.error);
}
