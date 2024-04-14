import Position from '../Position'

export class SimulatorUtils {
  static calculateCameraPosition(
    minPos: Position,
    maxPos: Position,
    horizontalOffset: number
  ): Position {
    return new Position(
      (minPos.x + maxPos.x) / 2 + horizontalOffset,
      (minPos.y + maxPos.y) / 2,
      (minPos.z + maxPos.z) / 2 + horizontalOffset
    )
  }

  static calculateCameraDistance(maxPos: Position, minPos: Position) {
    return (
      Math.max(maxPos.x - minPos.x, maxPos.y - minPos.y, maxPos.z - minPos.z) +
      1
    )
  }

  // static createBlocks(data: any) {
  //   let blocks: SimulationBlock[] = []
  //   let jsonObject = data.blocks as { type: string; data: SimulationBlock }[]
  //   jsonObject.forEach(jsonBlock => {
  //     switch (jsonBlock.type) {
  //       case 'redstone_torch':
  //         blocks.push(new RedstoneTorch(jsonBlock.data.position, Direction.Down))
  //         break
  //       default:
  //         blocks.push(
  //           new Block(jsonBlock.data.position, jsonBlock.data.colorGroup)
  //         )
  //     }
  //   })
  //   return blocks
  // }
}
