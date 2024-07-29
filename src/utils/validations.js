export function isNameValid(name) {
  const nameRegex = /[a-zA-Z]$/;

  return nameRegex.test(name);
}

export function isBirthValid(birth) {
  const birthRegex = /(\d{2})\/?(\d{2})\/?(\d{4})$/;

  return birthRegex.test(birth);
}

export function isEmailValid(email) {
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}/;

  return emailRegex.test(email);
}

export function isPhoneValid(phone) {
  const phoneRegex = /(\d{2})\d{5}\d{4}/;

  return phoneRegex.test(phone);
}

export function isPasswordValid(password) {
  const hasMinLength = password.length >= 10;
  const hasUppercase = /[A-Z]/g.test(password);
  const hasNumber = /[0-9]/g.test(password);
  const hasSpecialCharacter = /[!@#$%^&*{}<>;'(),.?":|]/g.test(password);

  return hasMinLength && hasUppercase && hasNumber && hasSpecialCharacter;
}

export function isLocalValid(local) {
  let isFilled = true;

  if (local === '' || local === undefined) {
    isFilled = false;
  }

  return isFilled;
}
