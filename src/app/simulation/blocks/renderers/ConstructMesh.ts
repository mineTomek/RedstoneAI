import * as THREE from 'three'
import MCModel,{ ModelElement } from './MCModel'

export default function constructMesh(modelData: MCModel) {
  const group = new THREE.Group()

  modelData.elements.forEach((element, i) => {
    // if (i !== 0) return

    const mesh = createElement(element, modelData)

    group.add(mesh)
  })

  return group
}

function createElement(element: ModelElement, modelData: MCModel) {
  const from = new THREE.Vector3(
    element.from[0],
    element.from[1],
    element.from[2]
  ).divideScalar(16)
  const to = new THREE.Vector3(
    element.to[0],
    element.to[1],
    element.to[2]
  ).divideScalar(16)

  const size = new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z)

  const geometry = new THREE.BoxGeometry(size.x, size.y, size.z)

  const materials = createMaterials(element, modelData, {
    x: size.x * 16,
    y: size.y * 16,
    z: size.z * 16,
  })

  const mesh = new THREE.Mesh(geometry, materials)

  mesh.position.set(
    (from.x + to.x) / 2,
    (from.y + to.y) / 2,
    (from.z + to.z) / 2
  )

  return mesh
}

function createMaterials(
  element: ModelElement,
  modelData: MCModel,
  size: { x: number; y: number; z: number }
) {
  const materials: THREE.Material[] = []

  const faces = [
    element.faces.west,
    element.faces.east,
    element.faces.up,
    element.faces.down,
    element.faces.north,
    element.faces.south,
  ]

  const faceNames = ['west', 'east', 'up', 'down', 'north', 'south']

  faces.forEach((face, index) => {
    if (!face) return

    const textureName = modelData.textures[face.texture.slice(1)]

    let texturePath = `/assets/textures/${textureName}.png`

    // texturePath = 'assets/textures/uv_preview.png'

    const texture: THREE.Texture = new THREE.TextureLoader().load(texturePath)

    texture.magFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
    })

    let faceSize = { x: 0, y: 0 }

    switch (faceNames[index]) {
      case 'up':
      case 'down':
        faceSize = { x: size.x, y: size.z }
        break
      case 'east':
      case 'west':
        faceSize = { x: size.z, y: size.y }
        break
      case 'north':
      case 'south':
        faceSize = { x: size.x, y: size.y }
        break
    }

    const [x, y, u, v] = face.uv
    // material.map!.offset.set(x / 16, y / 16)
    // material.map!.repeat.set(faceSize.x / 16, faceSize.y / 16)

    console.log(`--- ${faceNames[index]} ---`)
    console.log('UV', face.uv)
    console.log('Face Size', faceSize)
    console.log('Texture Stretching', {
      u: faceSize.x / 16,
      v: faceSize.y / 16,
    })
    materials.push(material)
  })

  return materials
}

// function createElement(element: ModelElement): THREE.Mesh {
//   const geometry = new THREE.BufferGeometry()

//   const vertices: number[] = []
//   const indices: number[] = []

//   const from = new THREE.Vector3().fromArray(element.from.map(a => a / 16))

//   const to = new THREE.Vector3().fromArray(element.to.map(a => a / 16))

//   console.log('From', from)
//   console.log('To', to)

//   let offset = 0

//   const directions = [
//     // x+
//     [
//       [1, 1, -1],
//       [1, -1, -1],
//       [1, -1, 1],
//       [1, 1, 1],
//     ],
//     // x-
//     [
//       [-1, 1, 1],
//       [-1, -1, -1],
//       [-1, -1, 1],
//       [-1, 1, -1],
//     ],
//     // y+
//     [
//       [1, 1, 1],
//       [-1, 1, 1],
//       [-1, 1, -1],
//       [1, 1, -1],
//     ],
//     // y-
//     [
//       [1, -1, 1],
//       [-1, -1, 1],
//       [-1, -1, -1],
//       [1, -1, -1],
//     ],
//     // z+
//     [
//       [1, 1, 1],
//       [-1, 1, 1],
//       [-1, -1, 1],
//       [1, -1, 1],
//     ],
//     // z-
//     [
//       [1, 1, -1],
//       [-1, 1, 1],
//       [-1, -1, -1],
//       [1, -1, -1],
//     ],
//   ]

//   directions.forEach(direction => {
//     direction.forEach(vertex => {
//       vertices.push(
//         selectMinMax(vertex[0] > 0, from.x, to.x),
//         selectMinMax(vertex[1] > 0, from.y, to.y),
//         selectMinMax(vertex[2] > 0, from.z, to.z)
//       )
//     })

//     indices.push(
//       offset + 0,
//       offset + 1,
//       offset + 2,
//       offset + 2,
//       offset + 3,
//       offset + 4
//     )

//     offset += 4
//   })

//   console.log("Vertices", vertices)
//   console.log("Indices", indices)

//   geometry.setIndex(indices)

//   geometry.setAttribute(
//     'position',
//     new THREE.BufferAttribute(new Float32Array(vertices), 3)
//   )

//   const material = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     side: THREE.DoubleSide,
//   })

//   return new THREE.Mesh(geometry, material)
// }

// function selectMinMax(isMax: boolean, a: number, b: number) {
//   return isMax ? Math.max(a, b) : Math.min(a, b)
// }
