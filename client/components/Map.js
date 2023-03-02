import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
// import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_API_KEY = 'AIzaSyBKbRqUGtMYi4hi9bZis1JCUM7J9bMZdFA';

const Map = (props) => {
  const [locationPins, setLocationPins] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [mapKey, setMapKey] = useState(0);

  const handleClick = ({ x, y, lat, lng, event }) => {
    if (props.activatedLoc) {
      props.updateLocFromMap(props.activatedLoc, lat, lng)
      props.toggleSetLoc()

      const newLocationPins = []
      for (let pin of locationPins) {
        if (pin.props.label != props.activatedLoc) {
          newLocationPins.push(pin);
        }
      };

      let icon;
      if (props.activatedLoc === 'A') icon = 'twemoji:dog'
      if (props.activatedLoc === 'B') icon = 'noto:ghost'

      newLocationPins.push(
        <LocationPin
          key={lat + lng}
          lat={lat}
          lng={lng}
          label={props.activatedLoc}
          icon={icon}
        />
      )
      setLocationPins(newLocationPins);
      if (newLocationPins.length === 2) {
        const tempLineCoordinates = [
          { lat: newLocationPins[0].props.lat, lng: newLocationPins[0].props.lng },
          { lat: newLocationPins[1].props.lat, lng: newLocationPins[1].props.lng }
        ]
        setLineCoordinates(tempLineCoordinates);
        setMapKey(mapKey + 1);
      }
    }

  }

  const handleGoogleMapApi = (google) => {
    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2,
      strokeColor: "#007090ff"
    };

    const line = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      // strokeColor: "#007090ff",
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "10px"
        }
      ],
      strokeWeight: 1,
    })

    return line.setMap(google.map);
  }

  return (
    <div className="google-map">
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={props.locations.A}
        defaultZoom={20}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={(google) => handleGoogleMapApi(google)}
        onClick={handleClick}
        onChildClick={handleClick}
        options={props.mapOptions}
      >
        {locationPins}

      </GoogleMapReact>
    </div>
  )
};

const LocationPin = ({ label, icon }) => (
  <div className="pin">
    <Icon icon={icon} className="pin-icon" />
    <p className="pin-label">{label}</p>
  </div>
)

const DistanceLabel = ({ label }) => (
  <div className="dist-label">

  </div>
)

export default Map;