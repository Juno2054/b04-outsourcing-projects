import React from 'react'
import styled from 'styled-components'
import GeolocationMap from './GeolocationMap'
import MapButton from './MapButton'

function Map() {
  return (
    <MapSection>
      <MapButton />
      <GeolocationMap />
    </MapSection>
  )
}

export default Map

const MapSection = styled.section`
  position: relative;
  flex-basis: 50%;
  border:1px solid green;
`
