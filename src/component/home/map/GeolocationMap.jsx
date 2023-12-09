import { useEffect, useState } from 'react'
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectPosts } from '../../../redux/modules/home/postsSlice'

const GeolocationMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
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
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }))
    }
  }, [])

  // 리덕스 posts 데이터 가져오기
  const posts = useSelector(selectPosts)
  // 디테일 페이지 네비게이트
  const navigate = useNavigate()

  const EventMarkerContainer = ({ position, content, onClick }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)

    return (
      <MapMarker
        position={position}
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          size: new window.kakao.maps.Size(24, 35),
          alt: 'custom marker',
        }}
        onClick={() => {
          navigate(`/detail/${onClick.id}`, { state: onClick })
        }}
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

  return (
    <Map
      center={state.center}
      style={{
        width: '100%',
        height: '450px',
      }}
      level={3}
    >
      {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: '5px', color: '#000' }}>
            {state.errMsg ? state.errMsg : '여기에 계신가요?!'}
          </div>
        </MapMarker>
      )}
      {posts.map((post) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${post.lat}-${post.lng}`}
          position={{ lat: post.lat, lng: post.lng }}
          content={post.title}
          onClick={post}
        />
      ))}
    </Map>
  )
}

export default GeolocationMap
