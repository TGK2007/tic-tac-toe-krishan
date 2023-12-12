// Importing React library and the useState hook
import React, { useState } from "react";

// Functional component representing a player in the game
const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    // State to manage whether the player name is being edited
    const [isEditing, setIsEditing] = useState(false);

    // State to store the current player name
    const [playerName, setPlayerName] = useState(initialName);

    // Event handler to toggle editing mode and save changes
    const onEditHandler = () => {
        setIsEditing((editing) => !editing);
        
        // If editing is true, save changes using the onChangeName prop
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    // Event handler to capture changes in the input field
    const handleInputChange = (event) => {
        // Update the state with the new input value
        setPlayerName(event.target.value);
    };

    // Variable to conditionally render player name as text or input field
    let editPlayerName = <span className="player-name">{playerName}</span>

    // If in editing mode, render an input field for editing the player name
    if (isEditing) {
        editPlayerName = (<input type="text" required value={playerName} onChange={handleInputChange} />)
    }

    // Rendering the player component
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {/* Displaying the player name (text or input field) */}
                {editPlayerName}
                {/* Displaying the player symbol */}
                <span className="player-symbol">{symbol}</span>
            </span>
            {/* Button to toggle between editing and saving mode */}
            <button onClick={onEditHandler}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}

// Exporting the Player component
export default Player;
