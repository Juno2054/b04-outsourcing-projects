import React from 'react'
import { useLocation } from 'react-router-dom'

import DetailComponent from '../component/detail/DetailComponent'

function Detail() {
  const location = useLocation()
  const posts = location.state
  // console.log(posts)

  return (
    <>
      <DetailComponent post={posts} />
    </>
  )
}

export default Detail
