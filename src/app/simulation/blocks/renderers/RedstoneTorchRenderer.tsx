import { Edges, useGLTF } from '@react-three/drei'
import { ObjectMap } from '@react-three/fiber'
import { useReducer, useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import Block from '../Block'

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh
    nxGlow: THREE.Mesh
    mesh_2: THREE.Mesh
    mesh_2_1: THREE.Mesh
    mesh_2_2: THREE.Mesh
    mesh_2_3: THREE.Mesh
    mesh_2_4: THREE.Mesh
    nzGlow: THREE.Mesh
    pzGlow: THREE.Mesh
  }
}

export default function RedstoneTorchRenderer(props: {
  block: Block
  selection: { setSelected: (selected: boolean) => void; selected: boolean }
}) {
  const [hovered, setHovered] = useState(false)

  const [_, forceUpdate] = useReducer(x => x + 1, 0)

  const pixelSize = 1 / 16

  const { nodes } = useGLTF(
    `assets/models/redstone_torch_${
      props.block.blockState.lit ?? false ? 'on' : 'off'
    }.gltf`
  ) as GLTFResult & ObjectMap

  ;(nodes.body.material as THREE.MeshStandardMaterial).color = new THREE.Color(
    0xffffff
  )

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
      <mesh position={[0, -2.5 * pixelSize, 0]}>
        <boxGeometry args={[4 * pixelSize, 11 * pixelSize, 4 * pixelSize]} />
        <meshStandardMaterial
          color={0x6dc53}
          visible={false}
        />
        <Edges
          visible={props.selection.selected}
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
      <group position={[-0.5, -0.5, -0.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={nodes.body.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.nxGlow.geometry}
          material={nodes.nxGlow.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.nzGlow.geometry}
          material={nodes.nzGlow.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pzGlow.geometry}
          material={nodes.pzGlow.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2.geometry}
          material={nodes.mesh_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2_1.geometry}
          material={nodes.mesh_2_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2_2.geometry}
          material={nodes.mesh_2_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2_3.geometry}
          material={nodes.mesh_2_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2_4.geometry}
          material={nodes.mesh_2_4.material}
        />
      </group>
    </group>
  )
}
