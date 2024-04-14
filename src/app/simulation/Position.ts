import { Vector3 } from 'three'

export default class Position {
  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {}

  toString(): string {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }

  getDistanceFromOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  convertToVector() {
    return new Vector3(this.x, this.y, this.z)
  }
}
