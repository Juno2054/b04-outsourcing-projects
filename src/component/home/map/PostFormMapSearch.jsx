import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function PostFormMapSearch({ onLocationClick }) {
  const { kakao } = window
  const [locations, setLocations] = useState([])
  const searchInputRef = useRef('')
  const [changeView, setChangeView] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [clickedLocation, setClickedLocation] = useState(null)

  useEffect(() => {
    if (!changeView) return

    const ps = new kakao.maps.services.Places()
    const options = {
      category_group_code: 'FD6',
      page: 2,
    }
    ps.keywordSearch(
      searchInputRef.current.value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          let locations = []
          for (var i = 0; i < data.length; i++) {
            locations.push({
              place_name: data[i].place_name,
              category_group_code: data[i].category_group_code,
              road_address_name: data[i].road_address_name,
              place_url: data[i].place_url,
              category_group_name: data[i].category_group_name,
              address_name: data[i].address_name,
              phone: data[i].phone,
              id: data[i].id,
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
            })
          }
          setLocations(locations)
          setChangeView(false)
        }
      }
    )
  }, [changeView])

  const handleLocationClick = (location) => {
    setShowSearchResults(false);
    setClickedLocation(location);
    onLocationClick(location);
    setLocations([]); 
    console.log(location);
  };
  
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setChangeView(true)
        }}
      >
       <SearchInput type="text" ref={searchInputRef} placeholder="주소지를 정확히 입력해주세요!"/>
        <SearchButton type="button" onClick={() => setChangeView(true)}>
        주소 검색하기
      </SearchButton>
      </form>

      {!showSearchResults && locations.length > 0 && (
      <ToggleButton type="button" onClick={() => setShowSearchResults(true)}>
        검색 결과 보기
      </ToggleButton>
    )}

    {showSearchResults && (
      <ToggleButton type="button" onClick={() => setShowSearchResults(false)}>
        검색 결과 숨기기
      </ToggleButton>
    )}
      {showSearchResults && locations.length > 0 && (
        <div>
          {locations.map((location, index) => (
            <StDiv key={index} onClick={() => handleLocationClick(location)}>
              <h2>
                장소 이름: {location?.place_name}
              </h2>
              <h2>전화번호: {location?.phone}</h2>
              <h2>지번 주소: {location?.address_name}</h2>
              <h2>도로명 주소: {location?.road_address_name}</h2>
              <Link to={location?.place_url} target="_blank">
                {location?.place_url}
              </Link>
            </StDiv>
          ))}
        </div>
      )}

      {clickedLocation && (
        <div>
          <SelectedLocationHeading>이곳이 맞나요?</SelectedLocationHeading>
          <StDiv>
            <h2>지번 주소: {clickedLocation?.address_name}</h2>
            <h2>전화번호: {clickedLocation?.phone}</h2>
            <h2>도로명 주소: {clickedLocation?.road_address_name}</h2>
            <h2>
              위치: lat {clickedLocation?.position.lat}, lng{' '}
              {clickedLocation?.position.lng}
            </h2>
            <Link to={clickedLocation?.place_url} target="_blank">
              {clickedLocation?.place_url}
            </Link>
          </StDiv>
        </div>
      )}
    </>
  )
}

export default PostFormMapSearch

const SearchButton = styled.button`
  background-color:black;
  color: white;
  font-size: 13px;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  width:120px;

  &:hover {
    background-color: #ea3267;
    color:white;
    font-weight: bold;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 10px;
  width: 337px;
  outline: none;
  margin-top:20px;
`;

const ToggleButton = styled.button`
  text-align: center;
  background-color:black;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  border:1px solid black;

  h2 {
    margin: 0;
    font-size: 15px;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SelectedLocationHeading = styled.h2`
  font-size: 15px;
  text-align:center;
  margin-bottom: 15px;
  margin-top:15px;
`;