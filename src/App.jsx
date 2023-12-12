// Importing necessary components and constants
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./components/winning-combinations";

import React, { useState } from "react"

// Constant representing player names
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// Initial empty game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]


// Helper function outside of component function to determine the active player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // If there are turns and the first player is 'X', set the current player to 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

// Function to derive the winner based on the current game board and players
const deriveWinner = (gameBoard, players) => {
  let winner;

  // Check each winning combination
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    // If all three symbols in a combination are the same, set the winner
    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

// Function to derive the game board based on the list of turns
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  // Update the game board based on the turns
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // State for players and game turns
  const [players, setPlayers] = useState({ PLAYERS });
  const [gameTurns, setGameTurns] = useState([]);

  // Derive active player, game board, winner, and draw status
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Handle selecting a square on the game board
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Add the new turn to the list of turns
      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex },
        player: activePlayer
      },
      ...prevTurns];
      return updatedTurns;
    });
  }

  // Handle restarting the game
  const handleRestart = () => {
    setGameTurns([]);
  }

  // Handle changing the name of a player
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    // Main component structure
    <main>
      <div id="game-container">
        {/* Display the players */}
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol="X" onChangeName={handlePlayerNameChange} />
          <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol="O" onChangeName={handlePlayerNameChange} />
        </ol>
        {/* Display the game over component if there is a winner or a draw */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        {/* Display the game board */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      {/* Display the game log */}
      <Log turns={gameTurns} />
    </main>
  )
}

// Export the App component
export default App;
