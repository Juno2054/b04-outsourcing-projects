import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../component/home/map/Map'
import PostList from '../component/home/post/PostList'
import PostSection from '../component/home/post/PostSection'

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
        <ToggleWrapper>
          <ToggleButton onClick={togglePostList}>
            {showPostList ? '<' : '>'}
          </ToggleButton>
        </ToggleWrapper>
        <Map />
      </Container>
    </HomeSection>
  )
}
export default Home

const HomeSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1;
  display: flex;
`

const ToggleWrapper = styled.div`
  position: relative;
  margin-top: 450px;
`

const ToggleButton = styled.button`
  font-weight: bold;
  height: 20px;
  color: black;
  border: none;
  padding: 10px 5px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  font-size: 20px;
  margin-left:10px;
`
