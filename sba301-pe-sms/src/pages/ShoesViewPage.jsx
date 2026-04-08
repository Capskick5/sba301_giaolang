/**
 * Mục đích file:
 * - Màn hình xem chi tiết shoes.
 * - Chỉ hiển thị dữ liệu, không cho chỉnh sửa.
 */
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getShoesById } from '../api/shoesApi';
import PageMessage from '../components/PageMessage.jsx';
import { formatDateForDisplay } from '../utils/dateUtils';

export default function ShoesViewPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** Tải chi tiết theo id khi mở trang. */
  useEffect(() => {
    loadDetail();
  }, [id]);

  /** Gọi API lấy chi tiết shoes. */
  async function loadDetail() {
    try {
      setLoading(true);
      setError('');
      const response = await getShoesById(id);
      setItem(response.data);
    } catch {
      setError('Failed to load shoes detail.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-5">VIEW DETAILS</h3>

      <PageMessage loading={loading} error={error} />

      {!loading && !error && item && (
        <Row className="justify-content-center">
          <Col md={7}>
            <Row className="mb-3">
              <Col sm={5} className="text-sm-end fw-semibold">Shoes Name:</Col>
              <Col sm={7}>{item.shoesName}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={5} className="text-sm-end fw-semibold">Manufacturer:</Col>
              <Col sm={7}>{item.manufacturer}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={5} className="text-sm-end fw-semibold">Type:</Col>
              <Col sm={7}>{item.categoryName}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={5} className="text-sm-end fw-semibold">Price (đ):</Col>
              <Col sm={7}>{item.price}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={5} className="text-sm-end fw-semibold">Production date:</Col>
              <Col sm={7}>{formatDateForDisplay(item.productionDate)}</Col>
            </Row>
            <Row className="mb-5">
              <Col sm={5} className="text-sm-end fw-semibold">Import Date:</Col>
              <Col sm={7}>{formatDateForDisplay(item.importDate)}</Col>
            </Row>

            <div className="text-center">
              <Button variant="outline-primary" onClick={() => navigate('/shoes')}>
                Back
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
