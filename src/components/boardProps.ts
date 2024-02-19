import { BoardBox, Coordinate } from "tic-tac-toe"

export type boardProps = {
  'value': BoardBox[][]
  'boxClicked': (location: Coordinate) => void
}