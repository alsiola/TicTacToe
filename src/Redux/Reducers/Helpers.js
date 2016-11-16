const winningStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

export function calcNextMove(squares, nextMove) {
    let lastMove = 'X';
    if(nextMove === 'X') {
        lastMove = 'Y';
    }

    // remove already taken squares
    let possibles = [0,1,2,3,4,5,6,7,8].filter(i => {
        return !squares[i];
    });

    // if we can win, then return first winning move
    const winningMoves = getWinningSquares(nextMove, squares);
    if (winningMoves.length > 0) {
        return winningMoves[0];
    }

    // if our opponent has a chance to win, block them
    const blockerMoves = getWinningSquares(lastMove, squares);
    if (blockerMoves.length > 0) {
        return blockerMoves[0];
    }

    // pick the move that gives us the most chances to win
    possibles.sort((i, j) => {
        const squaresAfterI = squares.slice();
        squaresAfterI[i] = nextMove;
        const squaresAfterJ = squares.slice();
        squaresAfterJ[j] = nextMove;

        const winnersAfterI = getWinningSquares(nextMove, squaresAfterI);
        const winnersAfterJ = getWinningSquares(nextMove, squaresAfterJ);

        return winnersAfterI.length < winnersAfterJ.length;
    }); 

    // if no move gives us a chance to win, then take center square if we can
    const squaresAfterPos0 = squares.slice();
    squaresAfterPos0[possibles[0]] = nextMove;
    if(getWinningSquares(nextMove, squaresAfterPos0).length === 0 && !squares[4]) {
        return 4;
    }
    return possibles[0];
}

 function getWinningSquares(move, squares) {
    const winningSquares = [];
    winningStates.forEach(winningState => {
      const [a,b,c] = winningState;
      if (squares[a] && squares[a] === move && squares[a] === squares[b] && !squares[c]) {
        winningSquares.push(c);
      } else if (squares[b] && squares[b] === move && squares[b] === squares[c] && !squares[a]) {
        winningSquares.push(a);
      } else if (squares[a] && squares[a] === move && squares[a] === squares[c] && !squares[b]) {
        winningSquares.push(b);
      }
    });
    return winningSquares;
  }

  
export function checkForWinner(squares) {
    for(let state of winningStates) {
        const [a,b,c] = state;
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return state;
        }
    }
    return [];
}

export function canMakeMove(squares, squareNum) {
    return !squares[squareNum] && checkForWinner(squares).length === 0;
}