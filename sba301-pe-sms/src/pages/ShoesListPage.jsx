/**
 * Mục đích file:
 * - Màn hình chính: filter + danh sách + phân trang.
 * - Quản lý việc gọi API lấy categories, lấy page shoes, xóa dữ liệu.
 */
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteShoes, getCategories, getShoesPage } from '../api/shoesApi';
import PageMessage from '../components/PageMessage.jsx';
import ShoesFilterForm from '../components/ShoesFilterForm.jsx';
import ShoesPagination from '../components/ShoesPagination.jsx';
import ShoesTable from '../components/ShoesTable.jsx';

const DEFAULT_SIZE = 5;
const DEFAULT_SORT_BY = 'shoesName';
const DEFAULT_DIRECTION = 'asc';

export default function ShoesListPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: '', shoesName: '' });
  const [submittedFilters, setSubmittedFilters] = useState({ categoryId: '', shoesName: '' });
  const [pageInfo, setPageInfo] = useState({
    content: [],
    currentPage: 0,
    pageSize: DEFAULT_SIZE,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    contentLength: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /** Tải categories 1 lần khi mở màn hình. */
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * Mỗi khi filter đã submit thay đổi thì tải lại page đầu tiên.
   * Đây là kỹ thuật phổ biến để tách trạng thái "đang gõ" và "đã lọc".
   */
  useEffect(() => {
    loadShoesPage(0, submittedFilters);
  }, [submittedFilters]);

  /** Lấy danh sách category. */
  async function loadCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data ?? []);
    } catch {
      setError('Failed to load categories.');
    }
  }

  /** Lấy page shoes theo filter + phân trang. */
  async function loadShoesPage(page, activeFilters) {
    try {
      setLoading(true);
      setError('');

      const params = {
        page,
        size: DEFAULT_SIZE,
        sortBy: DEFAULT_SORT_BY,
        direction: DEFAULT_DIRECTION,
      };

      // Chỉ đính kèm tham số filter khi người dùng thực sự nhập.
      if (activeFilters.categoryId) params.categoryId = activeFilters.categoryId;
      if (activeFilters.shoesName) params.shoesName = activeFilters.shoesName.trim();

      const response = await getShoesPage(params);
      const data = response.data;

      setPageInfo({
        content: data.content ?? [],
        currentPage: data.currentPage ?? 0,
        pageSize: data.pageSize ?? DEFAULT_SIZE,
        totalElements: data.totalElements ?? 0,
        totalPages: data.totalPages ?? 0,
        first: data.first ?? true,
        last: data.last ?? true,
        contentLength: (data.content ?? []).length,
      });
    } catch {
      setError('Failed to load shoes list.');
    } finally {
      setLoading(false);
    }
  }

  /** Cập nhật input filter khi người dùng nhập. */
  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
  }

  /** Nhấn nút Filter thì cố định filter hiện tại và tải lại từ trang 1. */
  function handleFilterSubmit() {
    setSubmittedFilters({ ...filters });
  }

  /** Điều hướng sang trang create. */
  function handleAddNew() {
    navigate('/shoes/new');
  }

  /** Điều hướng sang trang view. */
  function handleView(item) {
    navigate(`/shoes/${item.shoesId}`);
  }

  /** Điều hướng sang trang edit. */
  function handleEdit(item) {
    navigate(`/shoes/${item.shoesId}/edit`);
  }

  /** Xóa 1 bản ghi, sau đó tải lại trang hiện tại. */
  async function handleDelete(item) {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.shoesName}"?`);
    if (!confirmed) return;

    try {
      await deleteShoes(item.shoesId);
      setSuccessMessage('Delete successfully.');

      // Nếu xóa hết dữ liệu của trang cuối thì lùi về trang trước.
      const shouldGoPreviousPage = pageInfo.contentLength === 1 && pageInfo.currentPage > 0;
      const nextPage = shouldGoPreviousPage ? pageInfo.currentPage - 1 : pageInfo.currentPage;
      await loadShoesPage(nextPage, submittedFilters);
    } catch {
      setError('Delete failed.');
    }
  }

  /** Đổi trang nhưng vẫn giữ filter đã submit trước đó. */
  function handlePageChange(page) {
    loadShoesPage(page, submittedFilters);
  }

  return (
    <div>
      <ShoesFilterForm
        categories={categories}
        filters={filters}
        onChange={handleFilterChange}
        onFilter={handleFilterSubmit}
        onAddNew={handleAddNew}
      />

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <PageMessage loading={loading} error={error} />

      {!loading && !error && (
        <>
          <ShoesTable
            shoes={pageInfo.content}
            pageInfo={pageInfo}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <ShoesPagination pageInfo={pageInfo} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
