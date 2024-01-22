import { ReactNode } from "react";
import { boardProps } from "./boardProps";
import { isLocation } from "../BoardLocation";

export default function Board(props: boardProps) {
  function onBoardClickHandle(row: number, column: number): void {
    const location = { 'x': row, 'y': column };
    
    if( isLocation(location)) {
      props.boxClicked(location);
    } else {
      console.error('Invalid location!');
    }
  }

  function getRow(currentRowIndex: number): ReactNode {
    const result = new Array<boolean>(props.value[currentRowIndex].length).fill(true).map((_, index) => {
      const token = props.value[currentRowIndex][index];
      
      return (
        <li key={`${currentRowIndex}${index}`}>
          <button onClick={() => onBoardClickHandle(currentRowIndex, index)}>{token}</button>
        </li>
      )
    });

    return <ol>{result}</ol>; 
  }

  function getBoard(): ReactNode {
    console.log(props);

    const result = new Array<boolean>(props.value.length).fill(true).map((_, index) => <li key={index}>{getRow(index)}</li>)
    return result
  }

  return (
    <ol id="game-board">
      {getBoard()}
    </ol>
  )
}
