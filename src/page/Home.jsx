import React from 'react'
import Map from '../component/home/Map'
import PostList from '../component/home/PostList'
import PostSection from '../component/home/PostSection'
import { Container, HomeSection } from '../styled-component/home/homeStyles'

const Home = () => {
  return (
    <HomeSection>
      <Container>
        <PostSection />
        <PostList />
        <Map />
      </Container>
    </HomeSection>
  )
}

export default Home
