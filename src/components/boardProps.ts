import { BoardLocation } from "../BoardLocation"
import { AllowedBoxValues } from "../PlayerToken"

export type boardProps = {
  'value': AllowedBoxValues[][]
  'boxClicked': (location: BoardLocation) => void
}