import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
  data: {},
};

fromlocalStorage();

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onInput(e) {
  refs.data[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(refs.data));
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
  refs.input.value = defaultvalue.email;
  refs.textarea.value = defaultvalue.message;
}
