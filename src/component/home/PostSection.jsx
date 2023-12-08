import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostCarousel from './PostCarousel'
import PostFormModal from './PostFormModal'

const PostSection = ({ onPlaceClick }) => {
  const mapPlaceData = useSelector((state) => state.mapPlace)
  const { mapPlaces } = mapPlaceData
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <PostMainSection>
      <ButtonContainer>
        <Button onClick={openModal}>글 작성하기</Button>
        {modal && <PostFormModal closeModal={closeModal} />}
      </ButtonContainer>
      <PostCarouselList>
        <ul>
          {mapPlaces &&
            mapPlaces.map((place) => (
              <li key={place.id}>
                <StyledHeading onClick={() => onPlaceClick(place)}>
                  {place.mapName}
                </StyledHeading>
                <PostCarousel place={place} />
              </li>
            ))}
        </ul>
      </PostCarouselList>
    </PostMainSection>
  )
}

export default PostSection

const PostMainSection = styled.section`
  flex-basis: 25%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f14e4e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ea3267;
  }
`

const StyledHeading = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  cursor: pointer;
`

const PostCarouselList = styled.div``
