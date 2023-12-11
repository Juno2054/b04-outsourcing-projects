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
    <MapWrap>
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
    </MapWrap>
    
  )
}

export default MapButton

const MapWrap= styled.div`
  /* border:1px solid red; */
`

const MapSection = styled.section`
width:50%;
position:absolute;
z-index:10;
  top:5%;
  right:10%;
  display: flex;
  gap:5px;
  flex-direction: row-reverse;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQuery.md`
  right:5%;
    flex-direction: column;
    align-items: flex-end;
 `}
  ${({ theme }) => theme.mediaQuery.sm`
    flex-direction: column;
 `}

`

const ButtonWrapper = styled.div`
  /* padding: 10px; */
`

const Button = styled.button`
  font-size:13px;
  padding:10px;
  background-color: ${(props) => (props.selected ? 'black' : 'white')};
  border: ${(props) => (props.selected ? '1px solid black' : 'none')}; /* border 속성명 수정 */
  color: #ea3267;
  font-weight:bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-left:px;

  &:hover {
    background-color: black;
  }
`
