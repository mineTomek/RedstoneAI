import BlockState from './BlockState'
import Position from './Position'

export default class Circuit {
  blocks: CircuitBlock[]

  constructor(blocks: CircuitBlock[]) {
    this.blocks = blocks
  }

  static fromJSON(json: any): Circuit {
    const blocks = json.blocks.map((block: any) => {
      const position = new Position(
        block.position.x,
        block.position.y,
        block.position.z
      )
      const state = new BlockState(
        block.state.redstonePower,
        block.state.lit,
        block.state.facing,
        block.state.color
      )
      return new CircuitBlock(block.id, position, state)
    })
    return new Circuit(blocks)
  }
}

class CircuitBlock {
  id: string
  position: Position
  state: BlockState

  constructor(id: string, position: Position, state: BlockState) {
    this.id = id
    this.position = position
    this.state = state
  }
}
