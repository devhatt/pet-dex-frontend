export function isNameValid(name) {
  const nameRegex = /[a-zA-Z]$/;

  return nameRegex.test(name);
}

export function isSurnameValid(surname) {
  const surnameRegex = /[a-zA-Z]$/;

  return surnameRegex.test(surname);
}

export function isBirthValid(birthday) {
  const birthdayRegex = /(\d{2})\/?(\d{2})\/?(\d{4})$/;

  return birthdayRegex.test(birthday);
}

export function isEmailValid(email) {
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}/;

  return emailRegex.test(email);
}

export function isPhoneValid(phone) {
  const phoneRegex = /\(?(\d{2})\)? \d{5}-?\d{4}/;

  return phoneRegex.test(phone);
}

export function isPasswordValid(password) {
  const minLength = password.length >= 10;
  const uppercase = /[A-Z]/g;
  const number = /[0-9]/g;
  const specialCharacter = /[!@#$%^&*{}<>;'(),.?":|]/g;

  return minLength && uppercase && number && specialCharacter;
}

export function isRepeatPasswordValid(password) {
  const minLength = password.length >= 10;
  const uppercase = /[A-Z]/g;
  const number = /[0-9]/g;
  const specialCharacter = /[!@#$%^&*{}<>;'(),.?":|]/g;

  return minLength && uppercase && number && specialCharacter;
}
