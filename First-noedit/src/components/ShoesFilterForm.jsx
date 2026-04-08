
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ShoesFilterForm({
  categories,
  filters,
  onChange,
  onFilter,
  onAddNew,
}) {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-4">Shoes List</h4>

      <Row className="justify-content-center mb-3">
        <Col md={7}>
          <Row className="align-items-center mb-3">
            <Col sm={3} className="text-sm-end mb-2 mb-sm-0">
              <Form.Label className="mb-0">Category:</Form.Label>
            </Col>
            <Col sm={4}>
              <Form.Select
                name="categoryId"
                value={filters.categoryId}
                onChange={onChange}
              >
                <option value=""></option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col sm={3} className="text-sm-end mb-2 mb-sm-0">
              <Form.Label className="mb-0">Shoes Name:</Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="shoesName"
                value={filters.shoesName}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Col>

        <Col md={3} className="d-flex align-items-end gap-2 mt-3 mt-md-0">
          <Button variant="outline-primary" className="w-100" onClick={onFilter}>
            Filter
          </Button>
          <Button variant="outline-primary" className="w-100" onClick={onAddNew}>
            Add New
          </Button>
        </Col>
      </Row>
    </div>
  );
}
