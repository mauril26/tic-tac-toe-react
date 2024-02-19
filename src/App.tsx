import { useState } from "react";

import { BoardBox, MoveResult, TicTacToe, Tokens, Coordinate } from 'tic-tac-toe'

import Board from "./components/Board";
import Header from "./components/Header";
import Log from "./components/Log";
import Player from "./components/Player";
import GameOver from "./components/GameOver";

export type Player = {
  'name': string;
  'token': string;
};

type PlayerList = {
  'player1': Player,
  'player2': Player
}

let game = new TicTacToe();
let isVictory = false;
let isDrawn = false;

function App() {
  const [currentTurn, setCurrentTurn] = useState<Tokens>(game.getCurrentPlayer());
  const [players, setPlayer] = useState<PlayerList | undefined>(undefined);
  const [board, setBoard] = useState<BoardBox[][]>(game.getBoard());

  function isCurrentTurn(token: Tokens): boolean {
    return currentTurn === token;
  }

  function updateBoard() {
    setBoard(() => [...game.getBoard().map((row) => [...row])]);
  }

  function hasFinished(): boolean {
    return isDrawn || isVictory;
  }

  function onBoardClicked(location: Coordinate): void {
    const result = game.makeMove({ x: location.x, y: location.y });

    if (result === MoveResult.Invalid) {
      console.log('Invalid movement:', location);
      return;
    }

    updateBoard();
    
    if (result === MoveResult.Victory) {
      isVictory = true;
      return;
    }
    
    if (result === MoveResult.Draw) {
      isDrawn = true;
      return;
    }

    setCurrentTurn(game.getCurrentPlayer());
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

  function onRestart(): void {
    game = new TicTacToe();
    isVictory = false;
    isDrawn = false;

    setCurrentTurn(game.getCurrentPlayer());
    updateBoard();
  }

  return (
    <>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            token="X"
            initialName="Player #1"
            currentValue={players?.player1}
            onSavePlayerName={ (name: string) => setPlayerName('player1', 'X', name) }
            isActive={isCurrentTurn("X")}
          />
          <Player
            token="O"
            initialName="Player #2"
            currentValue={players?.player2}
            onSavePlayerName={ (name: string) => setPlayerName('player2', 'O', name) }
            isActive={isCurrentTurn("O")}
          />
        </ol>
        {hasFinished()
          &&
          <GameOver
            isDraw={isDrawn}
            isVictory={isVictory}
            winner={isCurrentTurn("O") ? 'O' : 'X'}
            restart={() => onRestart()}
          />}
        <Board value={board} boxClicked={(location) => onBoardClicked(location)} />
      </div>
      <Log />
    </>
  );
}

export default App;
