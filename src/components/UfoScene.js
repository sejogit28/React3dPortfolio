/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: tab1bit0 (https://sketchfab.com/tab1bit0)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/ufo-8288a85fdf9d48f6a9a9ec6df27d5aa0
title: ufo
*/

import React, { useRef } from 'react'
import {useFrame} from "@react-three/fiber";
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const group2Ref = useRef()
  const group3Ref = useRef()
  const { nodes, materials } = useGLTF('/models/ufoModel/scene.gltf')

  useFrame(({clock}) =>
    {
        const elaspedTime = clock.getElapsedTime();
        group2Ref.current.rotation.z = elaspedTime /10; 
         //group3Ref.current.rotation.y = elaspedTime /10; 
    })

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={group2Ref} position={[0,0,5]} rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={group3Ref} position={[6,33,-3]}  rotation={[Math.PI / 2, 0, 0]}>
          <group  rotation={[0, 0, -Math.PI]} scale={[-2, 0.48, 2]}>
            <mesh geometry={nodes.mesh_0.geometry} material={materials.Body} />
            <mesh geometry={nodes.mesh_1.geometry} material={materials.Glass} />
            <mesh geometry={nodes.mesh_2.geometry} material={materials['Dome.belt']} />
            <mesh geometry={nodes.mesh_3.geometry} material={materials.Bottom} />
            <mesh geometry={nodes.mesh_4.geometry} material={materials['Glass.mini']} />
            <mesh geometry={nodes.mesh_5.geometry} material={materials['Bottom.001']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/ufoModel/scene.gltf')
