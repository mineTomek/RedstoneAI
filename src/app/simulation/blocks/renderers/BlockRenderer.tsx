import { Edges,useTexture } from '@react-three/drei'
import { useState } from 'react'
import { NearestFilter } from 'three'
import generateColors from '../../BlockColors'
import SimulationBlock from '../../SimulationBlock'
import { Vector3 } from '@react-three/fiber'

export default function BlockRenderer(props: {
  block: SimulationBlock
  click: { setClicked: (clicked: boolean) => void; clicked: boolean }
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = props.block.colorGroup
    ? parseInt(generateColors(props.block.colorGroup))
    : 0xffffff

  const color =
    hovered || props.click.clicked
      ? baseColor < 0xdddddd
        ? baseColor + 0x222222
        : 0xffffff
      : baseColor

  const texture = useTexture('/assets/textures/block.png')
  texture.magFilter = NearestFilter

  return (
    <mesh
      position={props.block.position as Vector3}
      onClick={event => {
        event.stopPropagation()
        if (event.shiftKey) {
          props.click.setClicked(!props.click.clicked)
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
        visible={props.click.clicked}
        scale={1}
        renderOrder={1000}
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
