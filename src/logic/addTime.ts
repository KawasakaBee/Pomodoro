export function addTime(realTime: string): string {
  const time = realTime.split(':').map((obj) => parseInt(obj));
  let minutes = time[0];
  const seconds = time[1];

  minutes += 1;

  return `${minutes.toString().length === 1 ? '0' + minutes : minutes}:${seconds.toString().length === 1 ? '0' + seconds : seconds}`;
}
