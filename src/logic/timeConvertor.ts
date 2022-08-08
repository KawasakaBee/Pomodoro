export function timeConvertor(time: number): string {
  let minutes = Math.ceil(time / 60);
  let hours = Math.floor(time / 3600);

  if (minutes >= 60) (minutes %= 60), hours++;

  const minutesToString = minutes.toString();
  const minutesEnd = minutesToString[minutesToString.length - 1] === '1' && minutes !== 11 ? 'ты' : 'т';

  const hoursToString = hours.toString();
  const hoursEnd = hoursToString[hoursToString.length - 1] === '1' && hours !== 11 ? 'а' : 'ов';

  return `${hours !== 0 ? hours + ' час' + hoursEnd : ''} ${minutes + ' мину' + minutesEnd}`;
}
