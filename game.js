const playerFact = (sign) => {
  return { sign };
};

const game = (() => {
  const gameboard = (() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((s, i) => {
      s.dataset.index = i;
    });

    const select = (squareIndex, player) => {
      squares[squareIndex].innerText = player.sign;
    };

    return { select };
  })();

  const player1 = playerFact('X');
  const player2 = playerFact('O');
  let currentPlayer = player1;

  const select = (e) => {
    if (e.target.dataset.index == null) return;
    gameboard.select(e.target.dataset.index, currentPlayer);
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  document.addEventListener('click', select);
})();
