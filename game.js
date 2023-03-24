const playerFact = (sign) => {
  return { sign };
};

const game = (() => {
  const gameboard = (() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((s, i) => {
      s.dataset.index = i;
    });

    /**
     * Update the selected square.
     * @param {int} squareIndex The index of the square.
     * @param {player} player The player-object.
     * @returns `null` if invalid (i.e blocked), `true` if player won, otherwise `false`.
     */
    const select = (squareIndex, player) => {
      if (!isValidChoice(squareIndex)) return null;
      squares[squareIndex].innerText = player.sign;
      return check(squareIndex, player.sign);
    };

    const isValidChoice = (index) => squares[index].innerText === '';

    /**
     * Check if some has won.
     * @param {int} index The selected index.
     * @param {string} sign The sign to check equals to.
     * @returns `true` if some won, otherwise `false`.
     */
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

      return row() || col() || diag1() || diag2();
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
  let ended = false;
  let nSelected = 0;

  const select = (e) => {
    if (e.target.dataset.index == null) return;
    if (ended) return;

    const retVal = gameboard.select(e.target.dataset.index, currentPlayer);
    if (retVal === null) return;
    if (retVal === true) {
      // Someone won
      console.log(currentPlayer.sign + ' won!');
      ended = true;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    nSelected++;
    if (nSelected >= 9) {
      // No-one won
      console.log("It's a tie!");
      ended = true;
    }
  };

  document.addEventListener('click', select);
})();
