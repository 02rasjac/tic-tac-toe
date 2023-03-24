const game = (() => {
  const gameboard = (() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((s, i) => {
      s.dataset.index = i;
    });

    const select = (square, player) => {
      console.log({ square, player });
    };

    return { select };
  })();

  const select = (e) => {
    if (e.target.dataset.index == null) return;
    console.log(e.target);
  };

  document.addEventListener('click', select);
})();
