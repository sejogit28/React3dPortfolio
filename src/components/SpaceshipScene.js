/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: overlaps (https://sketchfab.com/overlaps)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/91964c1ce1a34c3985b6257441efa500
title: Space exploration [WLP series #8]
*/

import React, { useRef } from 'react'


import {useFrame} from "@react-three/fiber";
import{useGLTF} from '@react-three/drei';

export default function SpaceshipScene(props) {
  const group = useRef()
  const group2Ref = useRef()
  const { nodes, /* materials */ } = useGLTF('/models/spaceshipModel/scene.gltf')
  
    useFrame(({clock}) =>
    {
        const elaspedTime = clock.getElapsedTime();
        group2Ref.current.rotation.y = elaspedTime /-500; 
        //group2Ref.current.rotation.y = elaspedTime/-10;
        //group2Ref.current.rotation.z = elaspedTime/-10;    
    })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[3, 1, -18.33]} ref={group2Ref} >
        <group  position={[0,-2,0]} rotation={[250, 0, 83.5]} scale={[7, 7, 7]}>
          <mesh geometry={nodes.planet001_1.geometry} material={nodes.planet001_1.material} />
          <mesh  geometry={nodes.planet001_2.geometry} material={nodes.planet001_2.material} />        
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/spaceshipModel/scene.gltf')
