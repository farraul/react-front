import { isEmpty } from '../utilities/arrays';

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
