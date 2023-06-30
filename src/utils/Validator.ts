const Validator = {
  required: (value: string) => value.length === 0 ? { isMissing: 'is required' } : null,
  email: (value: string) => !value.includes('@') ? { isInvalid: 'invalid email' } : null,
  maxLength: (value: string) => value.length > 255 ? { isMaxLength: 'must be less than 255 characters' } : null,
  minLength: (value: string) => value.length < 8 ? { isMinLength: 'must be more than 8 characters' } : null,
  isNumber: (value: string) => isNaN(Number(value)) ? { isNumber: 'must be a number' } : null,
  range: (value: string, min: number, max: number) => {
    const num = Number(value);
    return num < min || num > max ? { isRange: `must be between ${min} and ${max}` } : null;
  }
};

export default Validator;