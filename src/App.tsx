import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Log from "./components/Log";
import Player from "./components/Player";

type Player = {
  'name': string;
  'token': string;
};

type PlayerList = {
  'player1': Player,
  'player2': Player
}

function App() {
  const [players, setPlayer] = useState<PlayerList | undefined>(undefined);

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
        <Board />
      </div>
      <Log />
    </>
  );
}

export default App;
