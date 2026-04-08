/**
 * Mục đích file:
 * - Chứa các hàm validate đơn giản cho form.
 * - Giữ logic validation tách khỏi page để code dễ đọc hơn.
 */
import { isValidDateString } from './dateUtils';

/** Kiểm tra giá trị có bắt buộc nhập hay không. */
export function isBlank(value) {
  return !String(value ?? '').trim();
}

/** Kiểm tra số nằm trong đoạn cho trước. */
export function isNumberInRange(value, min, max) {
  const number = Number(value);
  return !Number.isNaN(number) && number >= min && number <= max;
}

/** Validate toàn bộ form thêm/sửa shoes. */
export function validateShoesForm(form) {
  const errors = {};

  if (isBlank(form.shoesName)) {
    errors.shoesName = 'Shoes name is required.';
  }

  if (isBlank(form.price)) {
    errors.price = 'Price is required.';
  } else if (!isNumberInRange(form.price, 0, 1000000000)) {
    errors.price = 'Price must be from 0 to 1000000000.';
  }

  if (isBlank(form.manufacturer)) {
    errors.manufacturer = 'Manufacturer is required.';
  }

  if (isBlank(form.productionDate)) {
    errors.productionDate = 'Production date is required.';
  } else if (!isValidDateString(form.productionDate)) {
    errors.productionDate = 'Use dd/MM/yyyy.';
  }

  if (isBlank(form.importDate)) {
    errors.importDate = 'Import date is required.';
  } else if (!isValidDateString(form.importDate)) {
    errors.importDate = 'Use dd/MM/yyyy.';
  }

  if (isBlank(form.categoryId)) {
    errors.categoryId = 'Category is required.';
  }

  return errors;
}
