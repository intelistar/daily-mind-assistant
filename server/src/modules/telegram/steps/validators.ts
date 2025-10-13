import validator from 'validator';

export function isValidName(name: string): boolean {
  return name.length > 1 && name.length < 50;
}

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}
