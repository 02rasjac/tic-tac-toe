const playerFact = (playerNum) => {
  const pNum = playerNum;
  const choices = document.querySelector(`#p${pNum}`);
  let name;
  let sign;
  let color;

  const update = () => {
    name = choices.querySelector(`#p${pNum}-name`).value;
    sign = choices.querySelector(`#p${pNum}-sign`).value;
    color = choices.querySelector(`#p${pNum}-color`).value;
  };

  update();

  return {
    get name() {
      return name;
    },
    get sign() {
      return sign;
    },
    get color() {
      return color;
    },
    update,
  };
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
      squares[squareIndex].style.color = player.color;
      return check(squareIndex, player.sign);
    };

    const reset = () => {
      squares.forEach((s) => {
        s.innerText = '';
      });
    };

    const enable = () => {
      squares.forEach((s) => {
        s.classList.remove('disabled');
      });
    };

    const disable = () => {
      squares.forEach((s) => {
        s.classList.add('disabled');
      });
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

    return { select, reset, enable, disable };
  })();

  const player1 = playerFact(1);
  const player2 = playerFact(2);
  let currentPlayer = player1;
  let ended = true;
  let nSelected = 0;

  const select = (e) => {
    if (e.target.dataset.index == null) return;
    if (ended) return;

    const retVal = gameboard.select(e.target.dataset.index, currentPlayer);
    if (retVal === null) return;
    if (retVal === true) {
      endGame();
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    nSelected++;
    if (nSelected >= 9) {
      endGame(true);
    }
  };

  const endGame = (tie = false) => {
    if (tie) {
      console.log("It's a tie!");
    } else {
      console.log(currentPlayer.sign + ' won!');
    }

    ended = true;
    gameboard.disable();
  };

  const randomizePlayer = () => {
    currentPlayer = Math.random() < 0.5 ? player1 : player2;
  };

  const startReset = () => {
    document.querySelector('#start-reset').innerText = 'Reset';
    gameboard.reset();
    gameboard.enable();

    nSelected = 0;
    ended = false;

    player1.update();
    player2.update();
    randomizePlayer();
  };

  document.addEventListener('click', select);
  document.querySelector('#start-reset').addEventListener('click', startReset);
})();
