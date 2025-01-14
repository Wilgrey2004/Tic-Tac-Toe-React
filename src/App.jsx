import { useState } from "react";
import "./App.css";
import "./index.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const classNames = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={classNames}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinnder] = useState(null); // null es que no hay ganador y el false es que esta empate.
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    // vamos a acrear un nuevo tablero usando como base el tablero anterior
    const newBoard = [...board];
    // vamos a agregar el nuevo valor en el indice que ha activado la funcion, ya sea una x u una o
    newBoard[index] = turn;
    // vamos a settear el nuevo tablero en el lugar del anterior para que se rendertice.
    setBoard(newBoard);
    // Preguntamos si el el turno es de x o si es de o, ecaso de ser de x le toca a o y en caso de de o le toca a x
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    //setteamos el nuevo valor en el use state TURNS.
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinnder(newWinner);
    }

    //console.log(turn);
  };

  const resetGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinnder(null);
  }

  const checkWinner = (boardCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[a] === boardCheck[c]
      ) {
        return boardCheck[a]; // retorna el turno o el signo del ganador simplemente
      }
    }
    return null; // no hay ganador
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}> {TURNS.X} </Square>
          <Square isSelected={turn === TURNS.O}> {TURNS.O} </Square>
        </section>
        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Empate" : "Ganador " + winner}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
