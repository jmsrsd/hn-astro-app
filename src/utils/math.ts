export const clamp = function (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
};
