import { Vector3 } from '@react-three/fiber'
import SimulationBlock, { Facing } from '../SimulationBlock'
import Block from '../blocks/Block'
import RedstoneTorch from '../blocks/RedstoneTorch'

export class SimulatorUtils {
  static calculateCenterPosition(
    minPosArr: number[],
    maxPosArr: number[]
  ): Vector3 {
    return [
      (minPosArr[0] + maxPosArr[0]) / 2,
      (minPosArr[1] + maxPosArr[1]) / 2,
      (minPosArr[2] + maxPosArr[2]) / 2,
    ]
  }

  static calculateCameraDistance(maxPosArr: number[], minPosArr: number[]) {
    return (
      Math.max(
        maxPosArr[0] - minPosArr[0],
        maxPosArr[1] - minPosArr[1],
        maxPosArr[2] - minPosArr[2]
      ) + 1
    )
  }

  static createBlocks(data: any) {
    let blocks: SimulationBlock[] = []
    let jsonObject = data.blocks as { type: string; data: SimulationBlock }[]
    jsonObject.forEach(jsonBlock => {
      switch (jsonBlock.type) {
        case 'redstone_torch':
          blocks.push(new RedstoneTorch(jsonBlock.data.position, Facing.Down))
          break
        default:
          blocks.push(
            new Block(jsonBlock.data.position, jsonBlock.data.colorGroup)
          )
      }
    })
    return blocks
  }
}
