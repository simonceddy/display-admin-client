const thumbsrc = (src) => (src.endsWith('.png') || src.endsWith('.jpg')
  ? src : `${src}.png`);

export default thumbsrc;
