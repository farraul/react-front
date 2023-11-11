import { isEmpty, AddQueryByField } from '../utilities/arrays';

describe('isEmpty function', () => {
  it('should return true for empty strings', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return true for undefined values', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for null values', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for NaN values', () => {
    expect(isEmpty(NaN)).toBe(true);
  });

  it('should return false for non-empty strings', () => {
    expect(isEmpty('test')).toBe(false);
  });

  it('should return false for non-NaN numbers', () => {
    expect(isEmpty(10)).toBe(false);
  });
});

describe('AddQueryByField', () => {
  it('should add query by field', () => {
    const options = {
      name: 'John Doe',
      age: 30,
      city: 'Los Angeles',
    };

    const expectedQuery = '?name=John Doe&age=30&city=Los Angeles';
    const actualQuery = AddQueryByField(options);

    expect(actualQuery).toEqual(expectedQuery);
  });

  it('should not add empty fields', () => {
    const options = {
      name: 'John Doe',
      age: null,
      city: '',
    };

    const expectedQuery = '?name=John Doe';
    const actualQuery = AddQueryByField(options);

    expect(actualQuery).toEqual(expectedQuery);
  });

  it('should handle multiple fields', () => {
    const options = {
      name: 'John Doe',
      age: 30,
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    };

    const expectedQuery = '?name=John Doe&age=30&city=Los Angeles&state=California&country=USA';
    const actualQuery = AddQueryByField(options);

    expect(actualQuery).toEqual(expectedQuery);
  });
});
