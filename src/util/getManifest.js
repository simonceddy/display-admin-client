async function getManifest() {
  const res = await fetch('http://localhost:3030/api/display-conf');
  console.log(res);
  return res;
}

export default getManifest;
