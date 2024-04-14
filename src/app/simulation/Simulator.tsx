'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import Circuit from './Circuit'
import World from './World'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Simulator(props: {
  circuit: string
  className?: string
}) {
  const [autoRotate, setAutoRotate] = useState(true)
  const [selectedBlock, setSelectedBlock] = useState(-1)

  const world = useRef(new World())

  const { data, error } = useSWR(
    '/api/prebuilt?circuit=' + props.circuit,
    fetcher
  )

  if (error) {
    return (
      <div className='flex justify-center items-center'>
        Failed to load circuit
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex justify-center items-center'>Loading circuit...</div>
    )
  }

  world.current.initBlocks(Circuit.fromJSON(data))

  const { centerPos, cameraPos, circuitBounds } =
    world.current.getCameraSettings(3)

  return (
    <Canvas
      onPointerLeave={() => setAutoRotate(true)}
      camera={{
        near: 0.01,
        position: cameraPos.convertToVector(),
      }}
      className={props.className}
    >
      <ambientLight />
      <pointLight
        position={[10, 10, 10]}
        intensity={2 * 500}
      />
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        onStart={() => setAutoRotate(false)}
        target={centerPos.convertToVector()}
        minDistance={
          process.env.NODE_ENV == 'production'
            ? Math.max(
                circuitBounds?.maxPos.x ?? 0,
                circuitBounds?.maxPos.y ?? 0,
                circuitBounds?.maxPos.z ?? 0
              ) + 2
            : 0.1
        }
      />
      {world.current.getBlocks().map((block, i) => {
        return (
          <block.renderer
            key={`block_${i}`}
            block={block}
            selection={{
              setSelected: selected =>
                selected ? setSelectedBlock(i) : setSelectedBlock(-1),
              selected: selectedBlock === i,
            }}
          />
        )
      })}
    </Canvas>
  )
}
