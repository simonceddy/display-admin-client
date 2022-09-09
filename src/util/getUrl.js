function getUrl(key, sub) {
  if (!key && !sub) return '/';
  return `/category/${key}${sub ? `/${sub}` : ''}`;
}
export default getUrl;
