import React, { useState } from 'react'
import styled from 'styled-components'

function PostCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 더미 게시물 데이터
  const dummyPosts = [
    { id: 1, title: '첫 번째 게시물', content: '이것은 첫 번째 게시물입니다.' },
    { id: 2, title: '두 번째 게시물', content: '이것은 두 번째 게시물입니다.' },
    { id: 3, title: '세 번째 게시물', content: '이것은 세 번째 게시물입니다.' },
    { id: 4, title: '네 번째 게시물', content: '이것은 네 번째 게시물입니다.' },
  ]

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % dummyPosts.length
    setCurrentIndex(newIndex)
  }

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + dummyPosts.length) % dummyPosts.length
    setCurrentIndex(newIndex)
  }

  return (
    <CarouselWrapper>
      <CarouselTitle>Hot Place</CarouselTitle>
      <CarouselContainer>
        <LeftArrow onClick={goToPrevSlide}>{'>'}</LeftArrow>
        {dummyPosts.map((post, index) => (
          <Slide
            key={index}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
          </Slide>
        ))}
        <RightArrow onClick={goToNextSlide}>{'>'}</RightArrow>
      </CarouselContainer>
    </CarouselWrapper>
  )
}

export default PostCarousel

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  border: 3px solid #ea3267;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  height: 200px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: calc((100% - 200px) / 2);
    background: linear-gradient(to bottom, transparent, #ea3267);
    z-index: 1;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${Slide}:hover & {
    opacity: 1;
  }
`

const Content = styled.p`
  font-size: 16px;
  color: #444;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${Slide}:hover & {
    opacity: 1;
  }
`

const ArrowButton = styled.button`
  background-color: transparent;
  color: #ea3267;
  border: none;
  margin: 0 -30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  width: 30px;
  height: 30px;
`

const LeftArrow = styled(ArrowButton)`
  transform: rotate(180deg);
`

const RightArrow = styled(ArrowButton)``

const CarouselTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`

const CarouselWrapper = styled.div`
  margin-top: 20px;
`
