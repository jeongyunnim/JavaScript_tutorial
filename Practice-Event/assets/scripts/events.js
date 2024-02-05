const buttons = document.querySelectorAll('button');

// button.onclick = function() {

// };

const buttonClickHandler = event => {
  event.target.disabled = true;
  console.log(event);
};

const anotherButtonClickHandler = () => {
  console.log('This was clicked!');
};

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

// button.addEventListener('click', buttonClickHandler);

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);`

// buttons.forEach(btn => {
//   btn.addEventListener('click', buttonClickHandler);
// });

// window.addEventListener('scroll', event => {
//   console.log(event);
// });

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault(); // 브라우저의 기본 동작을 막는다.
  console.log(event);
}) //submit은 드문 이벤트이기 때문에 모든 DOM요소에 존재하지 않는다.