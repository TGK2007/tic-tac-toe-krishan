// Importing React library
import React from "react";

// Functional component representing the Game Over screen
const GameOver = ({ winner, onRestart }) => {
    return (
        <div id="game-over">
            
            <h2>Game Over!</h2>
            
           
            {winner && <p>{winner} won!</p>}
            
           
            {!winner && <p>It's a draw</p>}
            
           
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    );
}

// Exporting the GameOver component
export default GameOver;
