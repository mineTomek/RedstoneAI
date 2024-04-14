import BlockState from '../BlockState'
import Position from '../Position'
import World from '../World'
import { Renderer } from './Renderers/Renderer'

export default abstract class Block {
  blockState: BlockState
  blockPos: Position

  abstract transparent: boolean

  world: World

  abstract renderer: Renderer

  constructor(blockState: BlockState, blockPos: Position, world: World) {
    this.blockState = blockState
    this.blockPos = blockPos
    this.world = world
  }

  abstract getName(): string
  abstract onUse(): void
}
