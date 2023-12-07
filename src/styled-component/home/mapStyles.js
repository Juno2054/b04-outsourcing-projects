import styled from 'styled-components'

const MapSection = styled.section`
  position: relative;
  flex-basis: 75%;
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

export { Button, ButtonWrapper, MapSection }
