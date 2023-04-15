import { useState } from "react"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = (currentMove % 2 ==0);
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((_, move) => {
    const description = (move === 0)
      ? 'Go to start'
      : 'Go to move #' + move;

      if (move === currentMove) {
        return <li>You're at move #{move}</li>
      }
    
      return (
        <li key={move}>
          <button onClick={() => setCurrentMove(move)}>{description}</button>
        </li>
      )
    
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
      <button onClick={()=>{document.querySelector('.game-info ol').classList.toggle('reversed')}}>Reverse order</button>
    </div>
  )
}



function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    let newSquares = squares.slice();
    newSquares[i] = (xIsNext) ? 'X' : 'O';
    onPlay(newSquares);
  
  }

  let winner = calculateWinner(squares);
  let status = (winner) ? `Winner: ${winner}` : `Next player: ${(xIsNext) ? 'X' : 'O'}`;  

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {
          [0, 1, 2].map(i => {
            return <Square key={i} val={squares[i]} onSquareClick={() => handleClick(i)}></Square>
          })
        }
      </div>
      <div className="board-row">
        {
          [3, 4, 5].map(i => {
            return <Square key={i} val={squares[i]} onSquareClick={() => handleClick(i)}></Square>
          })
        }
      </div>
      <div className="board-row">
        {
          [6, 7, 8].map(i => {
            return <Square key={i} val={squares[i]} onSquareClick={() => handleClick(i)}></Square>
          })
        }
      </div>
    </>
  )
}

function Square({val, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {val}
    </button>
  );
}


function calculateWinner(squares) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    // If a, b and c are all the same symbol, return that symbol.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}