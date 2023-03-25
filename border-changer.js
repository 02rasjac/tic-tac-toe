let creators = document.querySelectorAll('.player-creation');
creators.forEach((x) => {
  x.querySelector('.color-select').addEventListener('input', changeBorder);
});

function changeBorder(e) {
  e.target.parentElement.style.borderColor = e.target.value;
}
