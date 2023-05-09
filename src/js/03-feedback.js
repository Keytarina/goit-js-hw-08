import throttle from 'lodash.throttle';

const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const key = 'feedback-form-state';
const data = {};
// const restoreInput = () =>

const saveEmail = event => {
  data.email = event.target.value;
  saveDataToLocalStorage(data);
};
const saveMessage = event => {
  data.message = event.target.value;
  saveDataToLocalStorage(data);
};

const saveDataToLocalStorage = data => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log('Set state error: ', error.message);
  }
};

const restoreFormFromLocalStorage = () => {
  const сurrentData = localStorage.getItem(key);
  const serializedState = JSON.parse(сurrentData);
  email.value = serializedState.email;
  message.value = serializedState.message;
};

email.addEventListener('input', throttle(saveEmail, 500));
message.addEventListener('input', throttle(saveMessage, 500));
restoreFormFromLocalStorage();
