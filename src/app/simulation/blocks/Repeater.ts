import Block from './Block'
import RepeaterRenderer from './renderers/RepeaterRenderer'

export default class Repeater extends Block {
  renderer = RepeaterRenderer

  transparent = true

  getName() {
    return 'Repeater'
  }

  onUse() {
    console.log('onUse', this)
  }
}
