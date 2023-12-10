import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostCard from './CarouselCard'

const PostCarousel = ({ place }) => {
  const selectPosts = useSelector((state) => state.postsSlice.posts)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    const lastIndex = filteredPosts.length - 1
    const index = currentSlide === lastIndex ? 0 : currentSlide + 1
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    const lastIndex = filteredPosts.length - 1
    const index = currentSlide === 0 ? lastIndex : currentSlide - 1
    setCurrentSlide(index)
  }

  const filteredPosts = selectPosts
    .filter((item) => item.mapName === place.mapName)
    .sort()
    .reverse()

  return (
    <SliderContainer>
      {filteredPosts.length === 0 ? (
        <Message>아직 등록된 게시물이 없습니다!</Message>
      ) : (
        <>
          <SlideList>
            {filteredPosts.map((post, index) => (
              <SlideItem key={post.id} active={index === currentSlide}>
                <PostCard post={post} />
              </SlideItem>
            ))}
          </SlideList>
          <SliderButton>
          <PrevButton onClick={prevSlide}>{'이전 글 '}</PrevButton>
          <NextButton onClick={nextSlide}>{'다음 글 '}</NextButton>
          </SliderButton>
        
        </>
      )}
    </SliderContainer>
  )
}

export default PostCarousel

const Message = styled.p`
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
`

const SliderContainer = styled.div`
  width: 100%;
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
  border: none;
  font-weight: bold;

`

const PrevButton = styled.button`
  font-size: 12px;
  background-color:black;
  color:white;
  border-radius:10px;
  padding: 10px;
  margin-left:10px;
`

const NextButton = styled.button`
  font-size: 12px;
  margin-left:10px;
  background-color:black;
  color:white;
  border-radius:10px;
  padding: 10px;
`
