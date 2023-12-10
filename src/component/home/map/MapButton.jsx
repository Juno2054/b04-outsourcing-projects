import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { db } from '../../../API/firebase/firebase.API'
import {
  setMapPlaces,
  setSelectedButton
} from '../../../redux/modules/home/mapPlaceSlice'

function MapButton() {
  const dispatch = useDispatch()
  const mapPlace = useSelector((state) => state.mapPlace.mapPlaces)
  const selectedButton = useSelector((state) => state.mapPlace.selectedButton)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'map-place'))
        const fetchedMapPlace = []
        querySnapshot.forEach((doc) => {
          fetchedMapPlace.push({ id: doc.id, ...doc.data() })
        })
        dispatch(setMapPlaces(fetchedMapPlace))
      } catch (error) {
        console.error('데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [dispatch])

  const handleButtonClick = (buttonId, buttonData) => {
    dispatch(
      setSelectedButton(
        buttonId === selectedButton ? null : buttonId,
        buttonData
      )
    )
  }

  return (
    <MapSection>
      {mapPlace.map((button) => (
        <ButtonWrapper key={button.id}>
          <Button
            onClick={() => handleButtonClick(button.id)}
            selected={selectedButton === button.id}
          >
            {button.mapName}
          </Button>
        </ButtonWrapper>
      ))}
    </MapSection>
  )
}

export default MapButton

const MapSection = styled.section`
  position: relative;
  flex-basis: 75%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* padding-top: 10px; */
  border:1px solid blue;
`

const ButtonWrapper = styled.div`
  /* margin-bottom: 10px; */
  padding: 10px;
`

const Button = styled.button`
  margin: 0;
  /* padding: 10px 20px; */
  padding:10px;
  background-color: ${(props) => (props.selected ? '#f20b4c' : '#e04b76')};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f20b4c;
  }
`
