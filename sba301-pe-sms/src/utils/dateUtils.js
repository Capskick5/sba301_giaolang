/**
 * Mục đích file:
 * - Chứa các hàm xử lý ngày tháng để tái sử dụng nhiều nơi.
 * - Chuẩn màn hình yêu cầu dd/MM/yyyy.
 */

/**
 * Chuyển Date/string từ API sang dd/MM/yyyy để hiển thị trên UI.
 * Hỗ trợ cả chuỗi ISO, yyyy-MM-dd hoặc đối tượng Date.
 */
export function formatDateForDisplay(value) {
  if (!value) return '';

  if (typeof value === 'string') {
    // Nếu backend trả thẳng đúng định dạng dd/MM/yyyy thì dùng luôn.
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return value;

    // Nếu backend trả yyyy-MM-dd thì tách chuỗi trực tiếp để tránh lệch múi giờ.
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

/** Chuyển dd/MM/yyyy sang yyyy-MM-dd để gửi cho backend Spring Boot. */
export function formatDateForApi(value) {
  if (!value) return '';
  const [day, month, year] = value.split('/');
  return `${year}-${month}-${day}`;
}

/** Kiểm tra chuỗi có đúng định dạng dd/MM/yyyy hay không. */
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

/** Trả về ngày hiện tại theo định dạng dd/MM/yyyy để hiển thị trên header. */
export function getTodayAsText() {
  return formatDateForDisplay(new Date());
}
