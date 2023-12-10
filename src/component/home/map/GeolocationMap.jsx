import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { selectPosts } from '../../../redux/modules/home/postsSlice'

const GeolocationMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    isPanto: false,
  })

  const [map, setMap] = useState(null)
  console.log(state.center)
  console.log(map)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }))
    }
  }, [])

  const posts = useSelector(selectPosts)
  const selectedButtonData = useSelector((state) => {
    const selectedButtonId = state.mapPlace.selectedButton
    const mapPlaces = state.mapPlace.mapPlaces
    return mapPlaces.find((button) => button.id === selectedButtonId)
  })

  const filteredPosts = selectedButtonData
    ? posts.filter(
        (post) =>
          selectedButtonData.category_group_code === post.category_group_code
      )
    : []

  return (
    <>
      <p>
        <StyledButton
          onClick={(e) => {
            map.setCenter(
              new window.kakao.maps.LatLng(state.center.lat, state.center.lng)
            )
          }}
        >
          현재위치 이동
        </StyledButton>
      </p>
      <Map
        center={state.center}
        style={{
          width: 'auto',
          height: '88%',
          borderRadius: '10px',
          margin: '10px',
        }}
        level={3}
        isPanto={state.isPanto}
        onCreate={setMap}
      >
        {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: '5px'}}>
              {state.errMsg ? state.errMsg : '현재 위치'}
            </div>
          </MapMarker>
        )}
        {filteredPosts.map((post) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${post.lat}-${post.lng}`}
            position={{ lat: post.lat, lng: post.lng }}
            content={post.title}
            onClick={post}
          />
        ))}
      </Map>
  
    </>
  )
}

const StyledButton = styled.button`
position:absolute;
z-index:10;
  background-color:black;
  top:5%;
  left:5%;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 13px;
  font-weight:bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d80054;
  }
`;

export default GeolocationMap

// Maker보이게 하기
const EventMarkerContainer = ({ position, content, onClick }) => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const handleMarkerClick = () => {
    const confirmed = window.confirm('이 장소에 대한 게시글을 보시겠어요?')
    if (confirmed) {
      navigate(`/detail/${onClick.id}`, { state: onClick })
    }
  }

  return (
    <MapMarker
      position={position}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        size: new window.kakao.maps.Size(24, 35),
        alt: 'custom marker',
      }}
      onClick={handleMarkerClick}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && (
        <div
          style={{
            padding: '5px',
            color: '#000',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '200px',
          }}
        >
          {content}
        </div>
      )}
    </MapMarker>
  )
}