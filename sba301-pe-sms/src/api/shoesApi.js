/**
 * Mục đích file:
 * - Gom toàn bộ lời gọi API liên quan đến Shoes và Category.
 * - Giúp page/component không phải viết axios trực tiếp quá nhiều.
 *
 * Ghi chú:
 * - Các endpoint được đặt theo quy ước REST phổ biến cho đề CRUD.
 * - Nếu backend thật của đề thi dùng tên endpoint khác một chút,
 *   chỉ cần sửa file này là toàn bộ project sẽ chạy lại theo endpoint mới.
 */
import http from './http';

/** Lấy danh sách category để đổ vào combobox. */
export function getCategories() {
  return http.get('/categories');
}

/**
 * Lấy danh sách shoes có phân trang.
 * API kỳ vọng trả về PageResponse<ShoesResponse>.
 */
export function getShoesPage(params) {
  return http.get('/shoes', { params });
}

/** Lấy chi tiết 1 shoes theo id. */
export function getShoesById(id) {
  return http.get(`/shoes/${id}`);
}

/** Tạo mới shoes. */
export function createShoes(payload) {
  return http.post('/shoes', payload);
}

/** Cập nhật shoes theo id. */
export function updateShoes(id, payload) {
  return http.put(`/shoes/${id}`, payload);
}

/** Xóa shoes theo id. */
export function deleteShoes(id) {
  return http.delete(`/shoes/${id}`);
}
