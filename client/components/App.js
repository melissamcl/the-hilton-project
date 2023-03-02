import React from "react";

import Form from './Form.js';
import Map from './Map.js';

const locations = {
  A: {
    lat: 35.84912,
    lng: -78.67654
  },
  B: {
    lat: 35.84898,
    lng: -78.67632
  },
}

const App = () => {
  return (
    <div>
      <Form />
      <Map locations={locations} />
    </div>
  )
}

export default App;