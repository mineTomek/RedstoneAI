import SimulationBlock, { Facing } from '../SimulationBlock'
import BlockRenderer from './renderers/BlockRenderer'

export default class Block implements SimulationBlock {
  position = [0, 0, 0]

  colorGroup?: number = 0
  renderer = BlockRenderer

  facing?: Facing = undefined
  state?: boolean = undefined
  locked?: boolean = undefined
  subtract?: boolean = undefined

  constructor(position: number[], colorGroup?: number) {
    this.position = position
    this.colorGroup = colorGroup
  }

  use(): void {
    throw new Error('Method not implemented.')
  }
}
