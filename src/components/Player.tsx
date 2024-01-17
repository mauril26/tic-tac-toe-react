import { useState } from "react";
import { PlayerProps } from "./playerProps";

export default function Player(props: PlayerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);

  function getButtonLabel() {
    return isEditing ? "Save" : "Edit";
  }

  function onEditButtonHandle() {
    setIsEditing((wasEditing) => {
      if (wasEditing && name) {
        props.onSavePlayerName(name);
      }

      return !wasEditing
    });   
  }

  function onNameChange(newName: string) {
    setName(newName);
  }

  function getPlayerName() {
    if (isEditing) {
      return (
        <input
          type="text"
          name="playerName"
          value={name ?? ''}
          placeholder={props.initialName}
          onChange={(event) => onNameChange(event.target.value)}
        />
      );
    } else {
      return <span className="player-name">{name ?? props.initialName}</span>;
    }
  }

  return (
    <>
      <li className="player">
        {getPlayerName()}
        <span className="player-symbol">{props.token}</span>
      </li>
      <button onClick={onEditButtonHandle}>{getButtonLabel()}</button>
    </>
  );
}
