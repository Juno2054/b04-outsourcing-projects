import React, { useState } from 'react'
import styled from 'styled-components'

function Map() {
  // 더미 데이터 배열 생성
  const buttonsData = [
    { id: 1, label: 'Hot Place' },
    { id: 2, label: 'Hotel' },
    { id: 3, label: 'Food' },
  ]

  const [selectedButton, setSelectedButton] = useState(null)

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId === selectedButton ? null : buttonId)
  }

  return (
    <MapSection>
      {buttonsData.map((button) => (
        <ButtonWrapper key={button.id}>
          <Button
            onClick={() => handleButtonClick(button.id)}
            selected={selectedButton === button.id}
          >
            {button.label}
          </Button>
        </ButtonWrapper>
      ))}
    </MapSection>
  )
}

export default Map

const MapSection = styled.section`
  position: relative;
  flex-basis: 75%;
  background-image: url(https://cdn.pixabay.com/photo/2018/06/18/23/03/europe-3483539_1280.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
`

const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  padding: 5px;
`

const Button = styled.button`
  margin: 0;
  padding: 10px 20px;
  background-color: ${(props) => (props.selected ? '#f20b4c' : '#e04b76')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f20b4c;
  }
`
