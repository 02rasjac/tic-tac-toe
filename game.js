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
      check(squareIndex, player.sign);
    };

    const check = (index, sign) => {
      const row = () => {
        const firstIndex = getFirstIndexInRow(index);
        for (let i = firstIndex; i < firstIndex + 3; i++) {
          if (sign !== squares[i].innerText) return false;
        }
        return true;
      };

      const col = () => {
        const firstIndex = getFirstIndexInCol(index);
        for (let i = firstIndex; i < firstIndex + 7; i += 3) {
          if (sign !== squares[i].innerText) return false;
        }
        return true;
      };

      const diag1 = () => {
        for (let i = 2; i < 7; i += 2) {
          if (sign !== squares[i].innerText) return false;
        }
        return true;
      };

      const diag2 = () => {
        for (let i = 0; i < 9; i += 4) {
          if (sign !== squares[i].innerText) return false;
        }
        return true;
      };

      if (row() || col() || diag1() || diag2()) console.log('Someone won');
    };

    const getFirstIndexInRow = (index) => {
      if (index < 3) return 0;
      if (index > 5) return 6;
      return 3;
    };

    const getFirstIndexInCol = (index) => {
      const mod = index % 3;
      if (mod === 0) return 0;
      if (mod === 1) return 1;
      return 2;
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
