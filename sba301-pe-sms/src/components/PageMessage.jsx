/**
 * Mục đích file:
 * - Hiển thị loading hoặc lỗi theo dạng Alert Bootstrap.
 * - Dùng lại ở nhiều màn hình để code gọn hơn.
 */
import { Alert, Spinner } from 'react-bootstrap';

export default function PageMessage({ loading, error }) {
  /** Nếu đang tải dữ liệu thì hiện spinner. */
  if (loading) {
    return (
      <div className="py-4 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  /** Nếu có lỗi thì hiện thông báo lỗi. */
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return null;
}
