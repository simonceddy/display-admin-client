function createMediaObject(src, alt, type) {
  return { src, alt: alt || '', type: type || 'image' };
}

export default createMediaObject;
