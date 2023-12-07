import React from 'react'
import styled from 'styled-components'
import PostCarousel from './PostCarousel'
import PostFormModal from './PostFormModal'

function PostSection() {
  return (
    <PostToggleSection>
      <PostFormModal />
      <PostCarousel />
    </PostToggleSection>
  )
}

export default PostSection

const PostToggleSection = styled.section`
  flex-basis: 25%;
`
