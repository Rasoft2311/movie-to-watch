export function mapObjectsToNames(array) {
  return array.map((el) => el.name);
}
export function formatTime(time) {
  let h = Math.floor(time / 60);
  let m = time % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m}`;
}
export function formatAge(isAdult) {
  return isAdult ? "Adult only" : "Any";
}
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "USD",
  }).format(price);
}
export function getProducerNames(crew) {
  return crew.filter((el) => el.job === "Producer").map((el) => el.name);
}
export function getYearFomFullDate(date) {
  return date ? date.slice(0, date.indexOf("-")) : "Unknown date";
}
