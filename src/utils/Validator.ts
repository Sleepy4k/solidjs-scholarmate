const Validator = {
  required: (value: string) => value.length === 0 ? { isMissing: 'is required' } : null,
  email: (value: string) => !value.includes('@') ? { isInvalid: 'invalid email' } : null,
  minLength: (value: string) => value.length < 0 ? { isMinLength: 'must be more than 8 characters' } : null,
  maxLength: (value: string) => value.length > 255 ? { isMaxLength: 'must be less than 255 characters' } : null,
  minPassword: (value: string) => value.length < 8 ? { isMinPassword: 'must be less than 701 characters' } : null,
  minLengthNumber: (value: string) => parseInt(value, 10) < 0 ? { isMinLengthNumber: 'must be more or equal to 0 characters' } : null,
  maxToefl: (value: string) => parseInt(value, 10) > 701 ? { isMaxToefl: 'must be less than 701 characters' } : null,
  maxIelts: (value: string) => parseInt(value, 10) > 10 ? { isMaxIelts: 'must be less than 10 characters' } : null,
  isNumber: (value: string) => isNaN(Number(value)) ? { isNumber: 'must be a number' } : null,
  range: (value: string, min: number, max: number) => {
    const num = Number(value);
    return num < min || num > max ? { isRange: `must be between ${min} and ${max}` } : null;
  }
};

export default Validator;