import React from 'react'
import styled from 'styled-components'
import PostCarousel from './PostCarousel'
import PostFormToggle from './PostFormToggle'

function PostButton() {
  return (
    <PostToggleSection>
      <PostFormToggle />
      <PostCarousel />
    </PostToggleSection>
  )
}

export default PostButton

const PostToggleSection = styled.section`
  flex-basis: 25%;
`
