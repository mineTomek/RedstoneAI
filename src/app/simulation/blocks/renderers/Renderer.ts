import Block from '../Block'

export type Renderer = (props: {
  block: Block
  selection: { setSelected: (selected: boolean) => void; selected: boolean }
}) => JSX.Element
