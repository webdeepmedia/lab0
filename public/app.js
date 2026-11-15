const btn = document.getElementById('btn');
const title = document.getElementById('title');

let clicked = false;

btn.addEventListener('click', () => {
  clicked = !clicked;

  if (clicked) {
    title.textContent = 'You clicked the button!';
  } else {
    title.textContent = 'Hello from Lab 0';
  }
});