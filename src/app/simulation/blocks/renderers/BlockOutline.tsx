import { Edges } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import { ColorRepresentation } from 'three'
import BlockState from '../../BlockState'
import getColor from '../../utils/BlockColors'

type OutlineColorMode = 'blockColor' | 'custom'

export default function BlockOutline(props: {
  visible: boolean
  outlineColorMode: OutlineColorMode
  blockState?: BlockState
  outlineColor?: ColorRepresentation
  position?: Vector3
  size?: [width: number, height: number, depth: number]
}) {
  return (
    <mesh position={props.position}>
      <boxGeometry args={props.size} />
      <meshStandardMaterial visible={false} />
      <Edges
        visible={props.visible}
        scale={1}
        renderOrder={1000}
        color={
          props.outlineColorMode == 'blockColor'
            ? getColor(props.blockState!.color ?? 0).lightOutline
              ? '#fff'
              : '#000'
            : props.outlineColor
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
