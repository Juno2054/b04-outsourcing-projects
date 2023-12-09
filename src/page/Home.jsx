import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../component/home/Map'
import PostList from '../component/home/PostList'
import PostSection from '../component/home/PostSection'
import { Container, HomeSection } from '../styled-component/home/homeStyles'

const Home = () => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [showPostList, setShowPostList] = useState(true)

  useEffect(() => {
    togglePostList() // 컴포넌트가 처음 렌더링될 때 togglePostList 함수 호출
  }, [])

  const handlePlaceClick = (placeData) => {
    setSelectedPlace(placeData)
  }

  const togglePostList = () => {
    setShowPostList(!showPostList)
  }

  return (
    <HomeSection>
      <Container>
        <PostSection onPlaceClick={handlePlaceClick} />
        {showPostList && <PostList selectedPlace={selectedPlace} />}
        <div style={{ position: 'relative', marginTop: '450px' }}>
          <ToggleButton onClick={togglePostList}>
            {showPostList ? '<' : '>'}
          </ToggleButton>
        </div>
        <Map />
      </Container>
    </HomeSection>
  )
}
export default Home

const ToggleButton = styled.button`
  background-color: #f14e4e;
  font-weight: bold;
  height: 60px;
  color: #fff;
  border: none;
  padding: 10px 5px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  font-size: 30px;
`
