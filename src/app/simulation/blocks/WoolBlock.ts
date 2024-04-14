import Block from './Block'
import WoolBlockRenderer from './renderers/WoolBlockRenderer'

export default class WoolBlock extends Block {
  renderer = WoolBlockRenderer

  transparent = false

  getName() {
    return 'Wool'
  }

  onUse() {
    console.log('onUse', this)
  }
}
