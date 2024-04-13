import * as THREE from 'three'
import { useMatcapTexture, Center, Text3D, OrbitControls, Text } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const boxGeometry = new THREE.BoxGeometry()
const material = new THREE.MeshMatcapMaterial()

export default function Bars({
  stateName = 'Kentucky',
  numOfMonths = 50,
  positionZOffset = 0,
  textPosition,
  textRotation,
}) {
  // console.log('textRotation: ', textRotation)

  // Data
  const numOfDeaths = Array.from({ length: 50 }, () => Math.random() * 5.0)

  const bars = useRef([])
  const text = useRef()

  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  useFrame((state, delta) => {})

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true

    // rotate stateName correctly
    const quaternion = new THREE.Quaternion()
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
    text.current.applyQuaternion(quaternion)
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
    text.current.applyQuaternion(quaternion)
    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0), Math.PI)
    text.current.applyQuaternion(quaternion)
  }, [])

  return (
    <>
      {/* stateName 2D text */}
      <Text
        ref={text}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[-(numOfMonths / 2) - 0.5, 0, positionZOffset]}
        scale={1 / stateName.length}
      >
        {stateName}
      </Text>

      {/* Row of bars for this given state */}
      {[...Array(numOfMonths)].map((value, index) => (
        <mesh
          ref={(element) => (bars.current[index] = element)}
          key={index}
          geometry={boxGeometry}
          material={material}
          position={[index - numOfMonths / 2, numOfDeaths[index] / 2, positionZOffset]}
          scale={[0.5, 0.5, numOfDeaths[index]]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </>
  )
}
