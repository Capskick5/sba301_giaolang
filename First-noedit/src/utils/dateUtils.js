
export function formatDateForDisplay(value) {
  if (!value) return '';

  if (typeof value === 'string') {

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return value;

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-');
      return `${day}/${month}/${year}`;
    }
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateForApi(value) {
  if (!value) return '';
  const [day, month, year] = value.split('/');
  return `${year}-${month}-${day}`;
}

export function isValidDateString(value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const [dayText, monthText, yearText] = value.split('/');
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function getTodayAsText() {
  return formatDateForDisplay(new Date());
}
