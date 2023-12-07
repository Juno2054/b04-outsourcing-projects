import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../API/firebase/firebase.API'
import {
  setMapPlaces,
  setSelectedButton,
} from '../../redux/modules/home/mapPlaceSlice'
import {
  Button,
  ButtonWrapper,
  MapSection,
} from '../../styled-component/home/mapStyles'

function Map() {
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

  const handleButtonClick = (buttonId) => {
    dispatch(setSelectedButton(buttonId === selectedButton ? null : buttonId))
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

export default Map
