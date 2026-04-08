import http from "./http";

export const shoesApi = {

  getShoesPage: (params) => http.get("/shoes", { params }),
  
  // Lấy danh mục để đổ vào dropdown
  getCategories: () => http.get("/categories"),
  
  // Lấy chi tiết 1 đôi giày
  getShoeById: (id) => http.get(`/shoes/${id}`),
  
  // Xóa 1 đôi giày
  deleteShoe: (id) => http.delete(`/shoes/${id}`),
  
  // Tạo mới giày
  createShoe: (data) => http.post("/shoes", data),

};