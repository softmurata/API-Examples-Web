import React, { Suspense } from 'react'
import Avatar from './Avatar'

export default function SampleModel() {
  return (
    <Suspense fallback={null}>
      <Avatar url='../models/AnimeGirl.vrm' />
    </Suspense>
  )
}