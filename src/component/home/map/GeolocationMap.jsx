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
    isPanto: false, 
  });

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
  const navigate = useNavigate()

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

    const EventMarkerContainer = ({ position, content, onClick }) => {
      const map = useMap();
      const [isVisible, setIsVisible] = useState(false);
    
      const handleMarkerClick = () => {
        const confirmed = window.confirm('이 장소에 대한 게시글을 보시겠어요?');
        if (confirmed) {
          navigate(`/detail/${onClick.id}`, { state: onClick });
        }
      };
    
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
          
      );
    };
    
  return (
    <>
    <Map
      center={state.center}
      style={{
        width: 'auto',
        height: '88%',
        border: '2px solid #ea3267',
        borderRadius: '10px',
        margin: '10px',
      }}
      level={3}
      isPanto={state.isPanto} 
    >
      {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: '5px', color: '#000' }}>
            {state.errMsg ? state.errMsg : '여기에 계신가요?!'}
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
      <p>
        <button
          onClick={() =>
            setState({
              center: { lat: 33.452613, lng: 126.570888 },
              isPanto: false,
            })
          }
        >
          지도 중심좌표 이동시키기
        </button>
      </p>
    </>
  );
};

export default GeolocationMap
