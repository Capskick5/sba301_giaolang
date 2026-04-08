/**
 * Mục đích file:
 * - Khai báo router tổng của ứng dụng.
 * - Điều hướng giữa danh sách, tạo mới, xem chi tiết, chỉnh sửa.
 */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ShoesFormPage from './pages/ShoesFormPage.jsx';
import ShoesListPage from './pages/ShoesListPage.jsx';
import ShoesViewPage from './pages/ShoesViewPage.jsx';

export default function App() {
  /**
   * Router tổng của toàn bộ ứng dụng.
   * Dùng layout chung để tái sử dụng phần khung màn hình.
   */
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/shoes" replace />} />
          <Route path="/shoes" element={<ShoesListPage />} />
          <Route path="/shoes/new" element={<ShoesFormPage mode="create" />} />
          <Route path="/shoes/:id" element={<ShoesViewPage />} />
          <Route path="/shoes/:id/edit" element={<ShoesFormPage mode="edit" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
