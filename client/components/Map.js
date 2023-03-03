import React, { useState, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'

// import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const Map = (props) => {
  const [locationPins, setLocationPins] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const [mapCenter, setMapCenter] = useState({ lat: 35.7796, lng: -78.6381 });
  const [mapZoom, setMapZoom] = useState(15);
  // const [distancePin, setDistancePin] = useState([]);

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
        const lat1 = newLocationPins[0].props.lat
        const lng1 = newLocationPins[0].props.lng
        const lat2 = newLocationPins[1].props.lat
        const lng2 = newLocationPins[1].props.lng

        const tempLineCoordinates = [
          { lat: lat1, lng: lng1 },
          { lat: lat2, lng: lng2 }
        ]
        setLineCoordinates(tempLineCoordinates);
        setMapKey(mapKey + 1);

        props.getDist(lat1, lng1, lat2, lng2);
        // const midLat = (lat1 + lat2) / 2
        // const midLong = (lng1 + lng2) / 2

        // const newDistLabel = []
        // newDistLabel.push(
        //   <DistanceLabel
        //     key={lat + lng}
        //     lat={midLat}
        //     lng={midLong}
        //     label={dist}
        //   />
        // )
        // console.log(newDistLabel);
        // setDistancePin(newDistLabel);
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

  const handleChange = ({ center, zoom }) => {
    const newCenter = center;
    const newZoom = zoom;

    setMapCenter(newCenter);
    setMapZoom(newZoom);
  }

  return (
    <div className="google-map">
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={mapCenter}
        zoom={mapZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={(google) => handleGoogleMapApi(google)}
        onClick={handleClick}
        onChildClick={handleClick}
        onChange={handleChange}
        options={props.mapOptions}
      >
        {locationPins}
        {/* {distancePin} */}

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

// const DistanceLabel = ({ label }) => {
//   return (
//     <div className="dist-label">
//       {label}
//     </div>
//   )
// }


export default Map;