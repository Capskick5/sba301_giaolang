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

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return null;
}
