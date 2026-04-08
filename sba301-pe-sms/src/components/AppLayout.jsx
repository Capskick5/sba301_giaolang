/**
 * Mục đích file:
 * - Tạo khung giao diện chung cho các màn hình.
 * - Hiển thị phần logo, ngày tháng và vùng nội dung bên trong.
 */
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { getTodayAsText } from '../utils/dateUtils';

export default function AppLayout() {
  /** Layout dạng khung đơn giản giống đề thi. */
  return (
    <Container className="py-4">
      <div className="border">
        <Row className="g-0 border-bottom align-items-center">
          <Col xs="auto" className="px-3 py-3 border-end fw-bold">
            Logo
          </Col>
          <Col className="px-3 py-3 text-end">Date: {getTodayAsText()}</Col>
        </Row>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
