/**
 * Mục đích file:
 * - Dùng chung cho cả màn hình Add New Shoes và Edit Shoes.
 * - Thực hiện validate cơ bản, hiển thị lỗi inline màu đỏ cạnh input.
 */
import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createShoes,
  getCategories,
  getShoesById,
  getShoesPage,
  updateShoes,
} from '../api/shoesApi';
import PageMessage from '../components/PageMessage.jsx';
import { formatDateForApi, formatDateForDisplay } from '../utils/dateUtils';
import { validateShoesForm } from '../utils/validation';

const INITIAL_FORM = {
  shoesName: '',
  price: '',
  manufacturer: '',
  productionDate: '',
  importDate: '',
  categoryId: '',
};

export default function ShoesFormPage({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = useMemo(() => mode === 'edit', [mode]);

  /** Tải categories và dữ liệu edit khi cần. */
  useEffect(() => {
    loadInitialData();
  }, [id, isEditMode]);

  /**
   * Nạp dữ liệu đầu màn hình.
   * - Create: chỉ cần categories.
   * - Edit: cần categories + chi tiết bản ghi.
   */
  async function loadInitialData() {
    try {
      setLoading(true);
      setError('');

      const categoryResponse = await getCategories();
      const categoryData = categoryResponse.data ?? [];
      setCategories(categoryData);

      if (isEditMode) {
        const detailResponse = await getShoesById(id);
        const item = detailResponse.data;

        // Vì ShoesResponse hiện tại chỉ có categoryName, ta map ngược từ name -> id.
        const matchedCategory = categoryData.find(
          (category) => category.categoryName === item.categoryName
        );

        setForm({
          shoesName: item.shoesName ?? '',
          price: item.price ?? '',
          manufacturer: item.manufacturer ?? '',
          productionDate: formatDateForDisplay(item.productionDate),
          importDate: formatDateForDisplay(item.importDate),
          categoryId: matchedCategory?.id ? String(matchedCategory.id) : '',
        });
      }
    } catch {
      setError('Failed to load form data.');
    } finally {
      setLoading(false);
    }
  }

  /** Cập nhật state form khi người dùng gõ. */
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));

    // Khi người dùng sửa, xóa lỗi cũ của field đó để UX nhẹ nhàng hơn.
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  /**
   * Kiểm tra tên shoes có bị trùng hay không.
   * Cách làm giữ đơn giản cho sinh viên: gọi API list và dò trong dữ liệu trả về.
   */
  async function isDuplicateShoesName() {
    const response = await getShoesPage({
      page: 0,
      size: 100,
      sortBy: 'shoesName',
      direction: 'asc',
      shoesName: form.shoesName.trim(),
    });

    const list = response.data?.content ?? [];

    return list.some((item) => {
      const sameName = item.shoesName?.trim().toLowerCase() === form.shoesName.trim().toLowerCase();
      const differentId = String(item.shoesId) !== String(id ?? '');
      return sameName && differentId;
    });
  }

  /** Chuẩn hóa dữ liệu form sang payload đúng kiểu backend mong đợi. */
  function buildPayload() {
    return {
      shoesName: form.shoesName.trim(),
      price: Number(form.price),
      quantity: 0,
      manufacturer: form.manufacturer.trim(),
      productionDate: formatDateForApi(form.productionDate),
      importDate: formatDateForApi(form.importDate),
      categoryId: Number(form.categoryId),
    };
  }

  /** Submit form cho cả create và edit. */
  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateShoesForm(form);
    setErrors(validationErrors);
    setSubmitMessage('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const duplicated = await isDuplicateShoesName();
      if (duplicated) {
        setErrors((previous) => ({
          ...previous,
          shoesName: 'Shoes name already exists.',
        }));
        return;
      }

      const payload = buildPayload();

      if (isEditMode) {
        await updateShoes(id, payload);
        setSubmitMessage('Update successfully.');
      } else {
        await createShoes(payload);
        setSubmitMessage('Create successfully.');
        setForm(INITIAL_FORM);
      }
    } catch {
      setError(isEditMode ? 'Update failed.' : 'Create failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-5">{isEditMode ? 'Edit Shoes' : 'Add New Shoes'}</h3>

      {submitMessage && <Alert variant="success">{submitMessage}</Alert>}
      <PageMessage loading={loading} error={error} />

      {!loading && !error && (
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col md={9}>
              <Row className="align-items-start mb-3">
                <Col md={3} className="text-md-end">
                  <Form.Label>Shoes name:</Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="text"
                    name="shoesName"
                    value={form.shoesName}
                    onChange={handleChange}
                    isInvalid={!!errors.shoesName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.shoesName}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className="align-items-start mb-3">
                <Col md={3} className="text-md-end">
                  <Form.Label>Price:</Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className="align-items-start mb-3">
                <Col md={3} className="text-md-end">
                  <Form.Label>Manufacture:</Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="text"
                    name="manufacturer"
                    value={form.manufacturer}
                    onChange={handleChange}
                    isInvalid={!!errors.manufacturer}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.manufacturer}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className="align-items-start mb-3">
                <Col md={3} className="text-md-end">
                  <Form.Label>Production Date</Form.Label>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="date"
                    placeholder="dd/MM/yyyy"
                    name="productionDate"
                    value={form.productionDate}
                    onChange={handleChange}
                    isInvalid={!!errors.productionDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productionDate}
                  </Form.Control.Feedback>
                </Col>

                <Col md={2} className="text-md-end mt-3 mt-md-0">
                  <Form.Label>Import Date</Form.Label>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="date"
                    placeholder="dd/MM/yyyy"
                    name="importDate"
                    value={form.importDate}
                    onChange={handleChange}
                    isInvalid={!!errors.importDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.importDate}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className="align-items-start mb-4">
                <Col md={3} className="text-md-end">
                  <Form.Label>Category:</Form.Label>
                </Col>
                <Col md={3}>
                  <Form.Select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    isInvalid={!!errors.categoryId}
                  >
                    <option value=""></option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.categoryId}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row>
                <Col md={{ span: 7, offset: 3 }} className="d-flex gap-3">
                  <Button variant="outline-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outline-primary" type="button" onClick={() => navigate('/shoes')}>
                    Back
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}
