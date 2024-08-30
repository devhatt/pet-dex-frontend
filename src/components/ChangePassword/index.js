import { Component } from 'pet-dex-utilities';
import { isPasswordValid } from '../../utils/validations';
import TextInput from '../TextInput';
import Button from '../Button';
import './index.scss';

const events = ['password:change'];

const html = `
  <form
    data-select="change-password"
    class="change-password"
    action="submit"
  >
    <h3 class="change-password__title">
      Senha antiga
    </h3>
    <div data-select="password" class="change-password__input"></div>
    <span data-select="password-error" class="change-password__error">Senha inválida</span>          
    <hr class="change-password__separator"/>
    
    <h3 class="change-password__title">Nova senha</h3>
    
    <div data-select="new-password" class="change-password__input"></div>
    <span data-select="new-password-error" class="change-password__error">Senha inválida</span>
    <span data-select="new-password-error-match" class="change-password__error">As senhas não coincidem</span>
    <div data-select="confirm-password" class="change-password__input"></div>
    <span data-select="confirm-password-error" class="change-password__error">Senha inválida</span>
    <span data-select="confirm-password-error-match" class="change-password__error">As senhas não coincidem</span>
    
    <ul class="change-password__tips">
      <li>Insira no mínimo 10 caracteres</li>
      <li>A senha deve conter uma letra maiúscula</li>
      <li>Deve conter um caractere especial</li>
    </ul>
    </form>
`;

export default function ChangePassword() {
  Component.call(this, { html, events });
  const $changePasswordForm = this.selected.get('change-password');
  const $passwordInputContainer = this.selected.get('password');
  const $currentPasswordErrorMessage = this.selected.get('password-error');
  const $newPasswordInputContainer = this.selected.get('new-password');
  const $newPasswordErrorMessage = this.selected.get('new-password-error');
  const $newPasswordErrorMatch = this.selected.get('new-password-error-match');
  const $confirmPasswordInputContainer = this.selected.get('confirm-password');
  const $confirmPasswordErrorMessage = this.selected.get(
    'confirm-password-error',
  );
  const $confirmPasswordErrorMatch = this.selected.get(
    'confirm-password-error-match',
  );

  const currentPasswordInput = new TextInput({
    placeholder: 'Senha',
    assetPosition: 'suffix',
    type: 'password',
  });
  const newPasswordInput = new TextInput({
    placeholder: 'Nova senha',
    assetPosition: 'suffix',
    type: 'password',
  });
  const confirmPasswordInput = new TextInput({
    placeholder: ' Confirmar senha',
    assetPosition: 'suffix',
    type: 'password',
  });
  const submitButton = new Button({
    text: 'Salvar',
    isFullWidth: true,
    isDisabled: true,
  });

  currentPasswordInput.mount($passwordInputContainer);
  newPasswordInput.mount($newPasswordInputContainer);
  confirmPasswordInput.mount($confirmPasswordInputContainer);
  submitButton.mount($changePasswordForm);

  const validateSubmit = () => {
    if (
      currentPasswordInput.getValue() &&
      newPasswordInput.getValue() &&
      confirmPasswordInput.getValue()
    ) {
      submitButton.enable();
    } else {
      submitButton.disable();
    }
  };

  submitButton.selected.get('button').classList.add('change-password__button');
  currentPasswordInput.selected
    .get('input-text')
    .addEventListener('input', () => {
      $currentPasswordErrorMessage.classList.remove('show-error');
      validateSubmit();
    });
  newPasswordInput.selected.get('input-text').addEventListener('input', () => {
    $newPasswordErrorMessage.classList.remove('show-error');
    validateSubmit();
  });
  confirmPasswordInput.selected
    .get('input-text')
    .addEventListener('input', () => {
      $confirmPasswordErrorMessage.classList.remove('show-error');
      validateSubmit();
    });

  submitButton.listen('click', () => {
    let validPasswords = true;
    const newPassword = newPasswordInput.selected.get('input-text').value;
    const confirmPassword =
      confirmPasswordInput.selected.get('input-text').value;

    const showErrorMessage = (field, error) => {
      const password = field.selected.get('input-text').value;
      if (!isPasswordValid(password)) {
        validPasswords = false;
        error.classList.add('show-error');
        field.inputError();
      }
    };

    showErrorMessage(currentPasswordInput, $currentPasswordErrorMessage);
    showErrorMessage(newPasswordInput, $newPasswordErrorMessage);
    showErrorMessage(confirmPasswordInput, $confirmPasswordErrorMessage);

    if (confirmPassword !== newPassword) {
      validPasswords = false;
      $newPasswordErrorMatch.classList.add('show-error');
      $confirmPasswordErrorMatch.classList.add('show-error');
      newPasswordInput.inputError();
      confirmPasswordInput.inputError();
    }

    const removeErrors = (div) => {
      div.classList.remove('show-error');
    };

    if (validPasswords) {
      removeErrors($currentPasswordErrorMessage);
      removeErrors($newPasswordErrorMessage);
      removeErrors($confirmPasswordErrorMessage);
      removeErrors($newPasswordErrorMatch);
      removeErrors($confirmPasswordErrorMatch);
      this.emit('password:change');
    }
  });
}
ChangePassword.prototype = Object.assign(
  ChangePassword.prototype,
  Component.prototype,
);
