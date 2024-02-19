export type GameOverProps = {
  'winner'?: string;
  'isDraw': boolean;
  'isVictory': boolean;
  'restart': () => void;
}