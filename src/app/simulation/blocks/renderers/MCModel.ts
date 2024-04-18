export default interface MCModel {
  textures: ModelTextures
  elements: ModelElement[]
}

export interface ModelElement {
  from: number[]
  to: number[]

  faces: {
    down: ModelFace
    up: ModelFace
    north: ModelFace
    south: ModelFace
    west: ModelFace
    east: ModelFace
  }
}

export interface ModelFace {
  uv: number[]
  texture: string
}

export type ModelTextures = { [name: string]: string }
