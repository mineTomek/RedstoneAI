import { Direction } from './Direction'
import generateColors from './utils/BlockColors'

export default class BlockState {
  redstonePower?: number
  lit?: boolean
  facing?: Direction
  color?: number

  constructor(
    redstonePower?: number,
    lit?: boolean,
    facing?: Direction,
    color?: number
  ) {
    this.redstonePower = redstonePower
    this.lit = lit
    this.facing = facing
    this.color = color
  }

  getColorAsHex() {
    return this.color ? generateColors(this.color) : undefined
  }
}
