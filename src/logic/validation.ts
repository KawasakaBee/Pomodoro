export function validation(text: string): [boolean, string] {
  if (text.length === 0) return [true, 'Строка не должна быть пустой'];
  if (text.length > 30) return [true, 'Строка должна быть короче 30 символов'];

  return [false, 'Название задачи'];
}
