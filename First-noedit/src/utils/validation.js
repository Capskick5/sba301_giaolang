import { isValidDateString } from './dateUtils';

export function isBlank(value) {
  return !String(value ?? '').trim();
}

export function isNumberInRange(value, min, max) {
  const number = Number(value);
  return !Number.isNaN(number) && number >= min && number <= max;
}

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
    // errors.productionDate = 'Use dd/MM/yyyy.';
  }

  if (isBlank(form.importDate)) {
    errors.importDate = 'Import date is required.';
  } else if (!isValidDateString(form.importDate)) {
    // errors.importDate = 'Use dd/MM/yyyy.';
  }

  if (isBlank(form.categoryId)) {
    errors.categoryId = 'Category is required.';
  }

  return errors;
}