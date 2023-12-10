import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostCarousel from './PostCarousel'

const PostSection = ({ onPlaceClick }) => {
  const mapPlaceData = useSelector((state) => state.mapPlace)
  const { mapPlaces } = mapPlaceData

  return (
    <PostMainSection>
      <ul>
        {mapPlaces &&
          mapPlaces.map((place) => (
            <li key={place.id}>
              <Header onClick={() => onPlaceClick(place)}>
                {place.mapName}
              </Header>
              <PostCarousel place={place} />
            </li>
          ))}
      </ul>
    </PostMainSection>
  )
}

export default PostSection

const PostMainSection = styled.section`
  flex-basis: 25%;
  overflow-y: scroll; 
  height: 100%; 
  max-height: 1100px;
`
const Header = styled.h2`
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    color: #ea3267;
  }

`
