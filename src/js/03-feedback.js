import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
  KEY_LOCAL_STORAGE: 'feedback-form-state',
};

fromlocalStorage();

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onInput() {
  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };

  localStorage.setItem(refs.KEY_LOCAL_STORAGE, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(refs.KEY_LOCAL_STORAGE)));
  localStorage.removeItem(refs.KEY_LOCAL_STORAGE);
  refs.form.reset();
}
function fromlocalStorage() {
  const defaultvalue = JSON.parse(localStorage.getItem(refs.KEY_LOCAL_STORAGE));

  if (!defaultvalue) {
    return;
  }
  refs.input.value = defaultvalue.email;
  refs.textarea.value = defaultvalue.message;
}
