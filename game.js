const gameboard = (() => {
  const squares = document.querySelectorAll('.square');

  const select = (e) => {
    console.log(e.target);
  };

  squares.forEach((s) => {
    s.addEventListener('click', select);
  });
})();
