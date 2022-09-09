import client from './client';

export default async function uploadFiles(files) {
  const formData = new FormData();
  files.map((file) => formData.append(file.name, file));
  try {
    const res = await client.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
