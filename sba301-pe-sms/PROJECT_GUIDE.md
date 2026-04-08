# sba301-pe-sms

## 1) Mục tiêu dự án
Đây là project React dùng **JavaScript thuần** để làm bài CRUD Shoes theo đề mẫu. Dự án dùng đúng nhóm công nghệ gọn nhẹ:
- React
- Vite
- React Bootstrap
- Axios
- React Router DOM

Project được giữ ở mức **đủ chuẩn công nghiệp nhưng compact** để sinh viên có thể đọc nhanh, học nhanh, reverse engineering nhanh và hoàn thành bài trong khoảng 80 phút.

---

## 2) Cấu trúc thư mục
```text
sba301-pe-sms/
├─ src/
│  ├─ api/
│  │  ├─ http.js
│  │  └─ shoesApi.js
│  ├─ components/
│  │  ├─ AppLayout.jsx
│  │  ├─ PageMessage.jsx
│  │  ├─ ShoesFilterForm.jsx
│  │  ├─ ShoesPagination.jsx
│  │  └─ ShoesTable.jsx
│  ├─ pages/
│  │  ├─ ShoesFormPage.jsx
│  │  ├─ ShoesListPage.jsx
│  │  └─ ShoesViewPage.jsx
│  ├─ utils/
│  │  ├─ dateUtils.js
│  │  └─ validation.js
│  ├─ App.jsx
│  └─ main.jsx
├─ .gitignore
├─ index.html
├─ package.json
├─ PROJECT_GUIDE.md
└─ vite.config.js
```

### Ý nghĩa từng thư mục
- **api/**: chứa mã gọi backend.
- **components/**: chứa các UI nhỏ dùng lại được.
- **pages/**: chứa các màn hình chính.
- **utils/**: chứa hàm tiện ích như format ngày, validation.

Cấu trúc này là kiểu **1 tầng, gọn nhẹ**, không chia quá sâu.

---

## 3) Luồng chạy tổng quát
### 3.1 Khi mở ứng dụng
- `main.jsx` render `App.jsx`
- `App.jsx` khai báo router
- route mặc định chuyển về `/shoes`
- `ShoesListPage.jsx` sẽ tải categories và danh sách shoes có phân trang

### 3.2 Khi filter
- Người dùng nhập `Category` và `Shoes Name`
- Bấm `Filter`
- Page gọi lại API danh sách với query params tương ứng

### 3.3 Khi xem chi tiết
- Bấm `View`
- Điều hướng sang `/shoes/:id`
- `ShoesViewPage.jsx` gọi API chi tiết theo `id`

### 3.4 Khi tạo mới
- Bấm `Add New`
- Điều hướng sang `/shoes/new`
- `ShoesFormPage.jsx` ở chế độ create
- Validate dữ liệu
- Gửi `POST /shoes`

### 3.5 Khi sửa
- Bấm `Edit`
- Điều hướng sang `/shoes/:id/edit`
- `ShoesFormPage.jsx` ở chế độ edit
- Gọi API chi tiết để đổ dữ liệu cũ lên form
- Validate dữ liệu
- Gửi `PUT /shoes/{id}`

### 3.6 Khi xóa
- Bấm `Delete`
- Hỏi xác nhận bằng `window.confirm`
- Gửi `DELETE /shoes/{id}`
- Tải lại danh sách

---

## 4) Kỹ thuật đã áp dụng

### 4.1 Router
Dùng `react-router-dom` để chuyển màn hình:
- `/shoes`
- `/shoes/new`
- `/shoes/:id`
- `/shoes/:id/edit`

### 4.2 Axios instance dùng chung
Tạo `http.js` để cấu hình:
- `baseURL = http://localhost:8080/api`
- `Content-Type = application/json`

Lợi ích:
- Không lặp lại URL gốc ở nhiều nơi.
- Khi backend đổi prefix, chỉ sửa 1 chỗ.

### 4.3 Tách API ra riêng
`shoesApi.js` gom toàn bộ hàm API.
Lợi ích:
- Page sạch hơn
- Dễ sửa endpoint
- Dễ bảo trì

### 4.4 Tách component giao diện nhỏ
Danh sách được chia thành:
- `ShoesFilterForm`
- `ShoesTable`
- `ShoesPagination`

Lợi ích:
- Page chính ngắn gọn hơn
- Dễ đọc hơn cho người mới học

### 4.5 Validation thủ công, không dùng thư viện ngoài
Để giữ project đơn giản, validation được viết tay trong:
- `validation.js`
- `ShoesFormPage.jsx`

Các rule đã làm:
- Required
- Price là số trong đoạn
- Date đúng `dd/MM/yyyy`
- Tên shoes không trùng

### 4.6 Xử lý tên bị trùng
Project đang kiểm tra trùng bằng cách:
- Gọi API danh sách với `shoesName`
- Dò trong `content`
- Nếu trùng tên thì báo lỗi inline

Cách này **không phải tối ưu nhất cho production lớn**, nhưng rất phù hợp cho bài thi và giúp sinh viên dễ hiểu.

### 4.7 Format ngày
UI dùng `dd/MM/yyyy` theo đề.
Backend thường dễ nhận `yyyy-MM-dd` hơn.
Vì vậy dự án có 2 chiều xử lý:
- Hiển thị: `formatDateForDisplay()`
- Gửi API: `formatDateForApi()`

---

## 5) Ghi chú quan trọng về DTO và API
Bạn cung cấp DTO như sau:
- `ShoesRequest` có `categoryId`
- `ShoesResponse` chỉ có `categoryName`

Điều này dẫn đến một điểm quan trọng:
- Ở màn hình **Edit**, để set lại combobox category, frontend phải map từ `categoryName` sang `categoryId` bằng danh sách category.

Project hiện tại đã xử lý đúng tình huống này bằng đoạn logic:
- load categories
- load detail shoes
- tìm category có `category.categoryName === item.categoryName`
- lấy `category.id` gán vào form

### Giả định nhỏ đang dùng
Trong `buildPayload()`, project đang gửi thêm:
```json
"quantity": 0
```
Lý do:
- `ShoesRequest` có field `quantity`
- nhưng UI đề thi không có ô nhập `quantity`
- để không tự ý thêm field lên giao diện, project tạm gửi giá trị mặc định là `0`

Nếu backend thật bắt buộc `quantity` khác 0 thì khi đó đề hoặc API cần bổ sung rõ hơn.

---

## 6) Endpoint hiện đang dùng trong source code
Project hiện đang dùng quy ước REST rất phổ biến:
- `GET /api/categories`
- `GET /api/shoes`
- `GET /api/shoes/{id}`
- `POST /api/shoes`
- `PUT /api/shoes/{id}`
- `DELETE /api/shoes/{id}`

### Query params của API danh sách
Project đang gửi:
- `page`
- `size`
- `sortBy`
- `direction`
- `categoryId` (nếu có)
- `shoesName` (nếu có)

Nếu backend thật trong đề thi dùng tên khác như `sortField`, `sortDir`, `keyword`, ... thì chỉ cần sửa trong `src/api/shoesApi.js` hoặc chỗ build params ở `ShoesListPage.jsx`.

---

## 7) Vì sao cấu trúc này được xem là “gọn nhưng vẫn chuẩn”
Project này không đi theo hướng enterprise nặng nề.
Nó chọn mức cân bằng:
- Có phân tầng cơ bản
- Có tách API
- Có tách page / component / utils
- Có router
- Có validation
- Có reusable component nhỏ

Nhưng vẫn tránh:
- chia folder quá sâu
- custom hook quá nhiều
- context quá sớm
- Redux/Zustand
- form library phức tạp
- CSS framework ngoài đề

Đây là mức rất phù hợp cho:
- sinh viên mới học React
- bài thi 80 phút
- project cần đọc hiểu và dựng lại nhanh

---

## 8) Cách chạy dự án
```bash
npm install
npm run dev
```

Ứng dụng chạy ở:
```text
http://localhost:5173
```

Backend giả định chạy ở:
```text
http://localhost:8080
```

---

## 9) Phiên bản thư viện đã khóa trong package.json
Project đang dùng các version mới tại thời điểm tạo file:
- React 19.2.4
- React DOM 19.2.4
- Vite 8.0.0
- React Bootstrap 2.10.10
- React Router DOM 7.13.1
- Axios 1.13.6
- Bootstrap 5.3.8

---

## 10) Hướng học lại để tự làm được bài tương tự
Bạn có thể tự tái tạo project bằng trình tự sau:
1. Tạo project Vite React JavaScript
2. Cài React Bootstrap, Bootstrap, Axios, React Router DOM
3. Tạo router với 4 route chính
4. Tạo axios instance
5. Viết file API riêng
6. Làm màn hình list trước
7. Gắn filter
8. Gắn pagination
9. Làm màn hình view
10. Làm form create
11. Tái sử dụng form cho edit
12. Thêm validation inline
13. Thêm delete

---

## 11) Điểm học được từ source code này
Khi đọc project, bạn nên chú ý các ý sau:
- Vì sao nên tách `api/` riêng
- Vì sao nên có `utils/` cho ngày tháng và validation
- Vì sao `ShoesFormPage` dùng chung cho create/edit là tốt hơn viết 2 page riêng
- Vì sao `submittedFilters` tách khỏi `filters`
- Vì sao mapping `categoryName -> categoryId` là cần thiết khi API detail chưa trả `categoryId`
- Vì sao code bài thi nên ưu tiên **rõ ràng, dễ đọc, ít tầng trừu tượng**

---

## 12) Gợi ý tinh chỉnh rất nhỏ nếu backend thật khác project hiện tại
Nếu backend thật trả field khác, bạn chỉ cần sửa một số chỗ nhỏ:
- khác tên endpoint: sửa `src/api/shoesApi.js`
- khác tên query param filter: sửa `loadShoesPage()` trong `ShoesListPage.jsx`
- detail trả thêm `categoryId`: sửa `ShoesFormPage.jsx` để dùng trực tiếp, không cần map qua `categoryName`
- backend yêu cầu format date khác: sửa `dateUtils.js`

---

## 13) Kết luận
Đây là project mẫu theo hướng:
- dễ đọc
- dễ dạy
- dễ học lại
- đủ clean
- không thừa cấu hình
- không dùng TypeScript
- không thêm framework ngoài đề

Nếu cần mở rộng tiếp trong lớp học, bạn có thể nâng cấp dần từ nền tảng này mà không phải đập bỏ cấu trúc cũ.
