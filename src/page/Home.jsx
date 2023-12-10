import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../component/home/map/Map'
import PostList from '../component/home/post/PostList'
import PostSection from '../component/home/post/PostSection'
import { Container, HomeSection } from '../styled-component/home/homeStyles'

const Home = () => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [showPostList, setShowPostList] = useState(true)

  useEffect(() => {
    togglePostList()
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
