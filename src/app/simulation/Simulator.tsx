'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas, Vector3 as Vector3Fiber } from '@react-three/fiber'
import { useState } from 'react'
import useSWR from 'swr'
import { SimulatorUtils } from './utils/SimulatorUtils'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Simulator(props: {
  circuit: string
  className?: string
}) {
  const [autoRotate, setAutoRotate] = useState(true)

  const [selectedBlock, setSelectedBlock] = useState(-1)

  let minPos: Vector3Fiber = [100, 100, 100]

  let maxPos: Vector3Fiber = [-100, -100, -100]

  const { data, error } = useSWR(
    '/api/prebuilt?circuit=' + props.circuit,
    fetcher
  )

  if (error) return <div>Failed to load circuit</div>

  if (!data) return <div>Loading circuit...</div>

  let blocks = SimulatorUtils.createBlocks(data)

  blocks.forEach(block => {
    if (block.position < minPos) {
      minPos = block.position as Vector3Fiber
    }
    if (block.position > maxPos) {
      maxPos = block.position as Vector3Fiber
    }
  })

  const minPosArray = minPos as number[]
  const maxPosArray = maxPos as number[]

  let centerPos = SimulatorUtils.calculateCenterPosition(
    maxPosArray,
    maxPosArray
  )

  let centerPosArray = centerPos as number[]

  const cameraDistance = SimulatorUtils.calculateCameraDistance(
    minPosArray,
    maxPosArray
  )

  return (
    <Canvas
      onPointerLeave={() => setAutoRotate(true)}
      camera={{
        position: [
          centerPosArray[0] + cameraDistance,
          centerPosArray[1],
          centerPosArray[2] + cameraDistance,
        ],
        near: 0.01,
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
        target={centerPos}
        minDistance={
          process.env.NODE_ENV == 'production'
            ? Math.max(maxPosArray[0], maxPosArray[1], maxPosArray[2]) + 2
            : 0.1
        }
      />
      {blocks.map((block, i) => {
        return (
          <block.renderer
            key={`block_${i}`}
            block={block}
            click={{
              setClicked: clicked =>
                clicked ? setSelectedBlock(i) : setSelectedBlock(-1),
              clicked: selectedBlock === i,
            }}
          />
        )
      })}
    </Canvas>
  )
}
