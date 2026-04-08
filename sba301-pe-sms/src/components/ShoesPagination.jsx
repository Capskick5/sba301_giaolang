/**
 * Mục đích file:
 * - Hiển thị thanh phân trang đơn giản giống đề thi.
 * - Không cho người dùng chọn size/sort trên UI, chỉ điều hướng trang.
 */
import { Col, Pagination, Row } from 'react-bootstrap';

export default function ShoesPagination({ pageInfo, onPageChange }) {
  /** Sinh ra mảng số trang từ 0 đến totalPages - 1. */
  const pages = Array.from({ length: pageInfo.totalPages }, (_, index) => index);

  return (
    <Row className="align-items-center">
      <Col md={6} className="mb-3 mb-md-0">
        Show {pageInfo.contentLength} of {pageInfo.totalElements} records
      </Col>

      <Col md={6} className="d-flex justify-content-md-end">
        <Pagination className="mb-0">
          <Pagination.Prev
            disabled={pageInfo.first}
            onClick={() => onPageChange(pageInfo.currentPage - 1)}
          />

          {pages.map((page) => (
            <Pagination.Item
              key={page}
              active={page === pageInfo.currentPage}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={pageInfo.last}
            onClick={() => onPageChange(pageInfo.currentPage + 1)}
          />
        </Pagination>
      </Col>
    </Row>
  );
}
