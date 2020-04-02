// 1110004445 -> 1 110 004 445
export default function formatNum (str) {
  return str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : str;
}