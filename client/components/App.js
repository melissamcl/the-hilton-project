import React from "react";

import Form from './Form.js';

const App = () => {
  return (
    <div id="app">
      <div id="title">
        <img id="hilton-gif" src="/assets/hilton.gif" />
        <h1>Hilton Tracker</h1>
      </div>

      <Form />
    </div>
  )
}

export default App;