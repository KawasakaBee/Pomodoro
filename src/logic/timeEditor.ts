const hoursTable = [
  'час',
  'часа',
  'часа',
  'часа',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'часов',
  'час',
  'часа',
  'часа',
  'часа',
];

export function timeEditor(time: number): string {
  const totalTime = time * 25;
  let hours = 0;
  const minutes = totalTime % 60;
  if (totalTime > 60) hours = Math.floor(totalTime / 60);

  return `${hours ? hours + ' ' + hoursTable[hours - 1] : ''}  ${minutes} мин`;
}
