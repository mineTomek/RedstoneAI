import model from '$/models/block/repeater_1tick.json'
import { useReducer, useState } from 'react'
import Block from '../Block'
import BlockOutline from './BlockOutline'
import constructMesh from './ConstructMesh'

export default function RepeaterRenderer(props: {
  block: Block
  selection: { setSelected: (selected: boolean) => void; selected: boolean }
}) {
  const [hovered, setHovered] = useState(false)

  const [_, forceUpdate] = useReducer(x => x + 1, 0)

  const pixelSize = 1 / 16

  return (
    <group
      position={props.block.blockPos.convertToVector()}
      onPointerEnter={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={event => {
        event.stopPropagation()
        if (event.shiftKey) {
          props.selection.setSelected(!props.selection.selected)
        } else {
          props.block.blockState.lit = !props.block.blockState.lit

          forceUpdate()
        }
      }}
      dispose={null}
    >
      <BlockOutline
        visible={props.selection.selected}
        outlineColorMode='custom'
        outlineColor='#000'
        position={[0, -0.5 + pixelSize, 0]}
        size={[1, 2 * pixelSize, 1]}
      />
      <primitive
        object={constructMesh(model)}
        position={[-0.5, -0.5, -0.5]}
      />
    </group>
  )
}
