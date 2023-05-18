import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const FORM_STORAGE_KEY = 'feedback-form-state';

const restoreFormFromLocalStorage = () => {
  if(localStorage.getItem(FORM_STORAGE_KEY)){
    const serializedState = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
    email.value = serializedState.email;
    message.value = serializedState.message;
  }
};
restoreFormFromLocalStorage();

const data = {
  email: email.value || "",
  message: message.value || ""
};

const saveDataToLocalStorage = event => {
  if(event.target.name === 'email' || event.target.name === 'message'){
    data.email = email.value.trim();
    data.message = message.value.trim();
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('Set state error: ', error.message);
    };
  }
};

const onFormSubmit = event => {
  event.preventDefault();
  if(
    email.value.trim() === '' || message.value.trim() === '') {
    alert('Всі поля повинні бути заповнені!');
    return;
  }
  console.log(data);

  localStorage.removeItem(FORM_STORAGE_KEY);
  form.reset();
  
  data.email = '';
  data.message = '';
};

form.addEventListener('input', throttle(saveDataToLocalStorage, 500));
form.addEventListener('submit', onFormSubmit);


