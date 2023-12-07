import React from 'react'
import styled from 'styled-components'
import Map from '../component/home/Map'
import PostButton from '../component/home/PostButton'
import PostList from '../component/home/PostList'

const Home = () => {
  return (
    <HomeSection>
      <Container>
        <PostButton />
        <PostList />
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
