import * as THREE from 'three'
import { useControls } from 'leva'
import { useMatcapTexture, Center, Text3D, Text, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import Bars from './Bars'

const boxGeometry = new THREE.BoxGeometry()
const material = new THREE.MeshMatcapMaterial()

// Data
$.ajax({
  url: 'https://data.cdc.gov/resource/xkb8-kh2a.json',
  type: 'GET',
  data: {
    $limit: 5000,
  },
}).done(function (data) {
  const filteredData = data.filter((entry) => {
    return entry.state_name === 'Alaska'
  })
  console.log(filteredData)
})

const states = ['Alabama', 'Alaska', 'Arizona', 'Alabama', 'Alaska', 'Arizona']
// const states = [
//   'Alabama',
//   'Alaska',
//   'Arizona',
//   'Arkansas',
//   'California',
//   'Colorado',
//   'Connecticut',
//   'Delaware',
//   'District of Columbia',
//   'Florida',
//   'Georgia',
//   'Hawaii',
//   'Idaho',
//   'Illinois',
//   'Indiana',
//   'Iowa',
//   'Kansas',
//   'Kentucky',
//   'Louisiana',
//   'Maine',
//   'Maryland',
//   'Massachusetts',
//   'Michigan',
//   'Minnesota',
//   'Mississippi',
//   'Missouri',
//   'Montana',
//   'Nebraska',
//   'Nevada',
//   'New Hampshire',
//   'New Jersey',
//   'New Mexico',
//   'New York',
//   'New York City',
//   'North Carolina',
//   'North Dakota',
//   'Ohio',
//   'Oklahoma',
//   'Oregon',
//   'Pennsylvania',
//   'Rhode Island',
//   'South Carolina',
//   'South Dakota',
//   'Tennessee',
//   'Texas',
//   'United States',
//   'Utah',
//   'Vermont',
//   'Virginia',
//   'Washington',
//   'West Virginia',
//   'Wisconsin',
//   'Wyoming',
// ]
const numOfStates = states.length // based on the database... (53)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const numOfMonths = months.length

// an array of death count for each month
const numOfDeaths = Array.from({ length: 50 }, () => Math.random() * 5.0)

export default function Experience() {
  // debug
  const controls = useControls({
    textPosition: { x: 0, y: 0, z: 0 },
    textRotation: { x: 0, y: 0, z: 0 },
  })

  const bars = useRef([])
  const monthTexts = useRef([])

  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  useFrame((state, delta) => {})

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true

    // rotate monthTexts correctly
    const quaternion = new THREE.Quaternion()
    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0), -Math.PI / 2)
    for (let i = 0; i < numOfMonths; i++) {
      monthTexts[i].applyQuaternion(quaternion)
    }
  }, [])

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
        </Text3D>
      </Center>

      {[...Array(numOfStates)].map((value, index) => (
        <Bars
          key={index}
          stateName={states[index]}
          numOfMonths={numOfMonths}
          positionZOffset={index - numOfStates / 2}
          textPosition={controls.position}
          textRotation={[controls.textRotation.x, controls.textRotation.y, controls.textRotation.z]}
        />
      ))}

      {/* One row of month text */}
      {[...Array(numOfMonths)].map((value, index) => (
        <Text
          key={index}
          ref={(element) => (monthTexts[index] = element)}
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[index - numOfMonths / 2, 0, numOfStates / 2 - 0.5]}
          scale={1 / months[index].length}
        >
          {months[index]}
        </Text>
      ))}
    </>
  )
}
