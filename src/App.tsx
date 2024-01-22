import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Log from "./components/Log";
import Player from "./components/Player";
import { BoardLocation } from "./BoardLocation";
import { AllowedBoxValues, PlayerToken } from "./PlayerToken";


const initialBoard: AllowedBoxValues[][] = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined]
]

type Player = {
  'name': string;
  'token': string;
};

type PlayerList = {
  'player1': Player,
  'player2': Player
}


function App() {
  const [currentTurn, setCurrentTurn] = useState<PlayerToken>('X');
  const [players, setPlayer] = useState<PlayerList | undefined>(undefined);
  const [board, setBoard] = useState<AllowedBoxValues[][]>(initialBoard);
  
  function validateWinnerRow(location: BoardLocation): boolean {
    if (board[location.x].some((item) => item === undefined))
      return false
    
    return board[location.x][0] === board[location.x][1] && (board[location.x][1] === board[location.x][2]);
  }

  function validateWinnerColumn(location: BoardLocation): boolean {
    const someIsEmpty = board.some((row) => {
      return row[location.y] === undefined
    });

    if (someIsEmpty)
      return false;
    
    return board[0][location.y] === board[1][location.y] && (board[1][location.y] === board[2][location.y]);
  }

  function validateWinnerDiagonal(location: BoardLocation): boolean {
    return false;
  }

  function hasWon(location: BoardLocation): boolean {
    return validateWinnerRow(location) || validateWinnerColumn(location) || validateWinnerDiagonal(location);
  }

  function isValidMovement(location: BoardLocation): boolean {
    return (board[location.x][location.y] === undefined)
  }
  
  function updateBoard(location: BoardLocation) {
    setBoard((previous) => {
      const newBoard = [...previous.map((row) => [...row])];

      newBoard[location.x][location.y] = currentTurn;

      return newBoard;
    });
  }

  function onBoardClicked(location: BoardLocation): void {
    if (hasWon(location)) {
      console.log('Game over');
      return;
    }

    if(isValidMovement(location)) {
      updateBoard(location);

      setCurrentTurn((oldTurn) => oldTurn === 'O' ? 'X' : 'O')
    } else {
      console.log('Invalid movement:', location);
    }
  }

  function setPlayerName(playerId: 'player1' | 'player2', token: string, name: string) {
    setPlayer((oldPlayers: PlayerList | undefined) => {
      if (oldPlayers === undefined)
        return oldPlayers;

      let newPlayer: Player = {'name': name, 'token': token};

      if (playerId === 'player1') {
        return { ...oldPlayers, 'player1': newPlayer }
      }

      return { ...oldPlayers, 'player2': newPlayer }
    });
  }

  return (
    <>
      <Header />
      <div id="game-container">
        <ol id="players">
          <Player
            token="X"
            initialName="Player #1"
            onSavePlayerName={ (name: string) => setPlayerName('player1', 'X', name) }
          />
          <Player
            token="O"
            initialName="Player #2"
            onSavePlayerName={ (name: string) => setPlayerName('player2', 'O', name) }
          />
        </ol>
        <Board value={board} boxClicked={(location) => onBoardClicked(location)} />
      </div>
      <Log />
    </>
  );
}

export default App;
