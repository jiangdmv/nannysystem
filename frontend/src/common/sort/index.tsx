export function sort_by_key_low_to_high(array, key) {
  return array.sort(function (a, b) {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export function sort_by_key_high_to_low(array, key) {
  return array.sort(function (a, b) {
    let y = a[key];
    let x = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
