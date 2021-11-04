import React from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components';
import Controls from './Controls'
import SampleModel from './components/SampleModel'

export default function Three() {
  return (
    <Container>
      <Canvas>
        <directionalLight position={[1,1,1]} />
        <Controls />
        <SampleModel />
        <gridHelper /> {/* わかりやすいようにGridPanelを表示 */}
      </Canvas>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`