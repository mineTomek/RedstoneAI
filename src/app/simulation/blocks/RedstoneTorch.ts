import Block from './Block'
import RedstoneTorchRenderer from './renderers/RedstoneTorchRenderer'

export default class RedstoneTorch extends Block {
  renderer = RedstoneTorchRenderer

  transparent = true

  getName() {
    return 'Redstone Torch'
  }

  onUse() {
    console.log('onUse', this)
  }
}
