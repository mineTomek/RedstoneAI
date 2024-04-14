import SimulationBlock, { Facing } from '../SimulationBlock'
import RedstoneTorchRenderer from './renderers/RedstoneTorchRenderer'

export default class RedstoneTorch implements SimulationBlock {
  position = [0, 0, 0]

  colorGroup?: number = undefined
  renderer = RedstoneTorchRenderer

  facing?: Facing = Facing.Down
  state?: boolean = undefined
  locked?: boolean = undefined
  subtract?: boolean = undefined

  constructor(position: number[], facing?: Facing) {
    this.position = position
    this.facing = facing
  }

  use(): void {
    throw new Error('Method not implemented.')
  }
}
