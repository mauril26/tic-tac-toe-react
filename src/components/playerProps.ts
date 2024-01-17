export type PlayerProps = {
  initialName: string;
  token: 'X' | 'O';
  onSavePlayerName: (name: string) => void
}
