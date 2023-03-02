import React from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
// import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_API_KEY = 'AIzaSyBKbRqUGtMYi4hi9bZis1JCUM7J9bMZdFA';

const Map = (props) => {
  const handleClick = ({ x, y, lat, lng, event }) => {
    if (props.activatedLoc === 'A') {
      props.setLocA([lat, lng])
    }
    if (props.activatedLoc === 'B') {
      props.setLocB([lat, lng])
    }
    props.deactivateSetLoc()
  }

  const handleChildClick = (lat, lng, label) => {
    console.log('Map.handleChildClick:', lat, lng, label)
  }

  const locationPins = [
    // <LocationPin
    //   lat={locations.locations.A.lat}
    //   lng={locations.locations.A.lng}
    //   label={''}
    // />,

  ]

  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={props.locations.A}
        defaultZoom={20}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => console.log('Map.GoogleMapReact component:', 'loaded map')}
        onClick={handleClick}
        onChildClick={handleChildClick}
      >
        {locationPins}

      </GoogleMapReact>
    </div>
  )
};

const LocationPin = ({ label }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-label">{label}</p>
  </div>
)

// const loader = new Loader({
//   apiKey: "AIzaSyBKbRqUGtMYi4hi9bZis1JCUM7J9bMZdFA",
//   version: "weekly",
//   libraries: ["places"]
// });

// const mapOptions = {
//   center: {
//     lat: 35.8,
//     lng: -78.7
//   },
//   zoom: 8
// };

// loader
//   .load()
//   .then((google) => {
//     new google.maps.Map(document.getElementById("map"), mapOptions);
//   })
//   .catch(e => {
//     console.log('google map error')
//   });

export default Map;