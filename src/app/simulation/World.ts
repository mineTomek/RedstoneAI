import Block from './blocks/Block'
import RedstoneTorch from './blocks/RedstoneTorch'
import WoolBlock from './blocks/WoolBlock'
import Circuit from './Circuit'
import Position from './Position'
import { SimulatorUtils } from './utils/SimulatorUtils'

export default class World {
  private blocks: Block[] = []

  private initalized = false

  initBlocks(circuit: Circuit) {
    if (this.initalized) {
      return
    }

    this.blocks = []
    circuit.blocks.forEach(block => {
      switch (block.id) {
        case 'redstone_torch':
          this.blocks.push(new RedstoneTorch(block.state, block.position, this))
          break
        case 'wool':
        default:
          this.blocks.push(new WoolBlock(block.state, block.position, this))
      }
    })

    this.initalized = true
  }

  isInitalized() {
    return this.initalized
  }

  getBlocks(): Block[] {
    return this.blocks
  }

  getBlock(position: Position): Block | undefined {
    return this.blocks.find(block => {
      return block.blockPos === position
    })
  }

  setBlock(position: Position, block: Block) {
    const index = this.blocks.findIndex(block => block.blockPos === position)
    if (index === -1) {
      this.blocks.push(block)
    } else {
      this.blocks[index] = block
    }
  }

  containsBlock(position: Position): boolean {
    return this.getBlock(position) != undefined
  }

  getCameraSettings(defaultDistance: number) {
    let minPos: Position = new Position(Infinity, Infinity, Infinity)

    let maxPos: Position = new Position(-Infinity, -Infinity, -Infinity)

    this.blocks.forEach(block => {
      if (
        block.blockPos.getDistanceFromOrigin() < minPos.getDistanceFromOrigin()
      ) {
        minPos = block.blockPos
      }
      if (block.blockPos > maxPos) {
        maxPos = block.blockPos
      }
    })

    return {
      centerPos: SimulatorUtils.calculateCameraPosition(minPos, maxPos, 0),
      cameraPos: SimulatorUtils.calculateCameraPosition(
        minPos,
        maxPos,
        SimulatorUtils.calculateCameraDistance(minPos, maxPos) * defaultDistance
      ),
      circuitBounds: {
        minPos,
        maxPos,
      },
    }
  }
}
