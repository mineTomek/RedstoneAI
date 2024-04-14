import BlockRenderer from './blocks/renderers/BlockRenderer'

export default interface SimulationBlock {
  use(): void

  position: number[]

  /**
   * This is a group of colors. Objects with the same color will be assigned the same color.
   */
  colorGroup?: number

  /**
   * Block renderer function component that has to be the same as BlockRenderer
   */
  renderer: typeof BlockRenderer

  facing?: Facing

  state?: boolean

  locked?: boolean

  subtract?: boolean
}

export enum Facing {
  None,
  Up,
  Down,
  North,
  East,
  South,
  West,
}
