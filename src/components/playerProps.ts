import { Tokens,  } from "tic-tac-toe";
import { Player } from "../App";

export type PlayerProps = {
  initialName: string;
  token: Tokens;
  isActive: boolean;
  currentValue: Player | undefined;
  onSavePlayerName: (name: string) => void
}
