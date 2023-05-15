import React from 'react';

import Form from './Form.js';

const App = () => {
  return (
    <div id="app">
      <div id="title">
        <img id="hilton-gif" src="/assets/hilton.gif" />
        <h1>The Hilton Project</h1>
      </div>

      <Form />
      <div id="result"></div>
    </div>
  );
};

export default App;
