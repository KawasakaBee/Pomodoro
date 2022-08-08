export function timer(time: string): string {
  let [minutes, seconds] = time.split(':').map((obj) => parseInt(obj));

  if (seconds === 0) {
    minutes -= 1;
    seconds = 59;
  } else {
    seconds -= 1;
  }

  return `${minutes.toString().length === 1 ? '0' + minutes : minutes}:${seconds.toString().length === 1 ? '0' + seconds : seconds}`;
}
