export function getRandomInt(range: [number, number]): number {
  return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
}
