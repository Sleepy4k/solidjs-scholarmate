const Validator = {
  required: (value: string) => value.length === 0 ? { isMissing: 'Answer required' } : null,
  email: (value: string) => !value.includes('@') ? { isInvalid: 'Invalid email' } : null,
  maxLength: (value: string, length: number) => value.length > length ? { isInvalid: `Must be less than ${length} characters` } : null,
  minLength: (value: string, length: number) => value.length < length ? { isInvalid: `Must be more than ${length} characters` } : null,
  isNumber: (value: string) => isNaN(Number(value)) ? { isInvalid: 'Must be a number' } : null,
  range: (value: string, min: number, max: number) => {
    const num = Number(value);
    return num < min || num > max ? { isInvalid: `Must be between ${min} and ${max}` } : null;
  }
};

export default Validator;