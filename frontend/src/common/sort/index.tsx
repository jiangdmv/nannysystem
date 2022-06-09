export function sort_by_key_low_to_high(array, key) {
  return array.sort(function (a, b) {
    let x = parseInt(a[key]);
    let y = parseInt(b[key]);
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export function sort_by_key_high_to_low(array, key) {
  return array.sort(function (a, b) {
    let y = parseInt(a[key]);
    let x = parseInt(b[key]);
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
