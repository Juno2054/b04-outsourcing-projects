import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostCard from './CarouselCard'

const PostCarousel = () => {
  const selectPosts = useSelector((state) => state.postsSlice.posts)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    const lastIndex = selectPosts.length - 1
    const shouldResetIndex = currentSlide === lastIndex
    const index = shouldResetIndex ? 0 : currentSlide + 1
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    const lastIndex = selectPosts.length - 1
    const shouldResetIndex = currentSlide === 0
    const index = shouldResetIndex ? lastIndex : currentSlide - 1
    setCurrentSlide(index)
  }

  return (
    <SliderContainer>
      <SlideList>
        {selectPosts.map((post, index) => (
          <SlideItem key={post.id} active={index === currentSlide}>
            <PostCard post={post} />
          </SlideItem>
        ))}
      </SlideList>
      <PrevButton onClick={prevSlide}>{'<'}</PrevButton>
      <NextButton onClick={nextSlide}>{'>'}</NextButton>
    </SliderContainer>
  )
}

export default PostCarousel

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`

const SlideList = styled.ul`
  display: flex;
  overflow-x: hidden;
  padding: 0;
  list-style-type: none;
`

const SlideItem = styled.li`
  display: ${({ active }) => (active ? 'block' : 'none')};
`

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  padding: 5px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: #ea3267;
`

const PrevButton = styled(SliderButton)`
  left: 10px;
`

const NextButton = styled(SliderButton)`
  right: 10px;
`
