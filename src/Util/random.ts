export function getRandomCoord(): [number, number] {
  const rand = () => Math.floor(Math.random() * 10);
  return [rand(), rand()];
}
