export function loadImage(src) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.addEventListener("load", resolve(src));
    image.addEventListener("error", reject);
    image.src = src;
  });
}
