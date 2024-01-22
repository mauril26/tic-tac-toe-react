import { PlayerToken } from "../PlayerToken";

export type PlayerProps = {
  initialName: string;
  token: PlayerToken;
  onSavePlayerName: (name: string) => void
}
