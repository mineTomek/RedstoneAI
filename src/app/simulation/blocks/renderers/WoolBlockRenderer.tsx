import { Edges, useTexture } from '@react-three/drei'
import { useState } from 'react'
import { NearestFilter } from 'three'
import getColor from '../../utils/BlockColors'
import Block from '../Block'

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

  const texture = useTexture('/assets/textures/block.png')
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
        transparent
      />

      <Edges
        visible={props.selection.selected}
        scale={1}
        renderOrder={1000}
        color={
          getColor(props.block.blockState.color ?? 0).lightOutline
            ? '#fff'
            : '#000'
        }
      >
        <meshBasicMaterial
          transparent
          color='#000'
          depthTest={false}
        />
      </Edges>
    </mesh>
  )
}
