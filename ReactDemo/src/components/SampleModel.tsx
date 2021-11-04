import React, { Suspense } from 'react'
import Avatar from './Avatar'

interface Props {
  url: string
}

export default function SampleModel({ url }: Props) {

  if (url === undefined){
    url = '../models/AnimeGirl.vrm'
  }
  
  return (
    <Suspense fallback={null}>
      <Avatar url={url} />
    </Suspense>
  )
}