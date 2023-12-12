// Importing React library
import React from "react";

// Functional component representing the game board
const GameBoard = ({ onSelectSquare, board }) => {
    // Rendering the game board
    return (
        <ol id="game-board">
            {/* Mapping through each row in the board */}
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {/* Mapping through each column in the row */}
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                {/* Button for each square, calling onSelectSquare on click */}
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null ? true : false}>
                                    {/* Displaying the player symbol in the button */}
                                    {playerSymbol} 
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}

// Exporting the GameBoard component
export default GameBoard;
