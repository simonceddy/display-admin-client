const thumbsrc = (src) => (
  (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.gif'))
    ? src : `${src}.png`);

export default thumbsrc;
