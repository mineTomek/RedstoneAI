import { useTexture } from '@react-three/drei'
import { useState } from 'react'
import { NearestFilter } from 'three'
import Block from '../Block'
import BlockOutline from './BlockOutline'

export default function WoolBlockRenderer(props: {
  block: Block
  selection: { setSelected: (selected: boolean) => void; selected: boolean }
}) {
  const [hovered, setHovered] = useState(false)

  const color =
    hovered || props.selection.selected
      ? props.block.blockState.getColorAsHex()! < 0xdddddd
        ? props.block.blockState.getColorAsHex()! + 0x222222
        : 0xffffff
      : props.block.blockState.getColorAsHex()!

  const texture = useTexture('/assets/textures/block/wool.png')
  texture.magFilter = NearestFilter

  return (
    <mesh
      position={props.block.blockPos.convertToVector()}
      onClick={event => {
        event.stopPropagation()
        if (event.shiftKey) {
          props.selection.setSelected(!props.selection.selected)
        }
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        color={
          hovered ? (color < 0xdddddd ? color + 0x222222 : 0xffffff) : color
        }
      />

      <BlockOutline
        visible={props.selection.selected}
        outlineColorMode='blockColor'
        blockState={props.block.blockState}
      />
    </mesh>
  )
}
