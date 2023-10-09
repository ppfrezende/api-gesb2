export function convertDate(date: string) {
  const parts = date.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const formattedDate = new Date(year, month, day);
  const formattedYear = formattedDate.getFullYear();
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
  const formattedDay = String(formattedDate.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda, se necessário

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}
