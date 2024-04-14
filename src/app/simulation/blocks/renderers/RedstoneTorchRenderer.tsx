import { useGLTF } from '@react-three/drei'
import { ObjectMap, Vector3 } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import SimulationBlock from '../../SimulationBlock'

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
  block: SimulationBlock
  click: { setClicked: (clicked: boolean) => void; clicked: boolean }
}) {
  const [hovered, setHovered] = useState(false)

  const color = props.click.clicked ? 0xff88ff : hovered ? 0xffffff : 0x888888

  const { nodes } = useGLTF(
    `assets/models/redstone_torch_${hovered ? 'on' : 'off'}.gltf`
  ) as GLTFResult & ObjectMap

  ;(nodes.body.material as THREE.MeshStandardMaterial).color = new THREE.Color(
    color
  )

  return (
    <group
      position={props.block.position as Vector3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={event => {
        event.stopPropagation()
        if (event.shiftKey) {
          props.click.setClicked(!props.click.clicked)
        }
      }}
      dispose={null}
    >
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
