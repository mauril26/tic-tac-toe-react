import { GameOverProps } from "./gameOverProps"

export default function GameOver(props: GameOverProps) {
  return (
    <div id="game-over">
      <h1>Game over</h1>
      { props.isDraw && <p>Draw!</p> }
      { props.isVictory && <p>Player { props.winner } won!</p>}
      <button onClick={() => props.restart()}>Restart</button>
    </div>
  ) 
}