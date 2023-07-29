import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

fromlocalStorage();

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onInput(e) {
  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
}
function fromlocalStorage() {
  const defaultvalue = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!defaultvalue) {
    return;
  }
  refs.input.value = defaultvalue.email || '';
  refs.textarea.value = defaultvalue.message || '';
}
