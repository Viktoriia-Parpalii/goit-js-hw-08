import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const data = {};

form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInput, 500));

function onInput(e) {
  data[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  form.reset();
}
