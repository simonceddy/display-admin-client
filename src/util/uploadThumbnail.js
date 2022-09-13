import client from './client';

export default async function uploadThumbnails(files) {
  const formData = new FormData();
  files.map((file) => formData.append(file.name, file));
  try {
    const res = await client.post(
      '/media/thumbnail/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
