import React, { useEffect, useState } from "react";
import Map from './Map.js';


const locations = {
  A: {
    lat: 35.84912,
    lng: -78.67654
  }
}

const Form = () => {
  const [activatedLoc, activateLoc] = useState('')
  const [formValues, setFormValues] = useState({
    timeStr: '',
    trigger: '',
    intensity: 0,
    locA: { lat: '', long: '', name: '' }
  })
  const [locA, setLocA] = useState([]);
  const [locB, setLocB] = useState([]);

  const handleChange = (e) => {
    const newFormValues = { ...formValues };
    let elId = e.target.id;

    if (e.target.name === 'intensity') elId = 'intensity';

    newFormValues[elId] = e.target.value;
    setFormValues(newFormValues);
  }

  const handleLocChange = (e) => {
    const newFormValues = { ...formValues };
    const selectedLoc = e.target.id.substring(0, 4);
    const newLocValues = { ...newFormValues[selectedLoc] }

    console.log(newLocValues)
  }

  const handleSubmit = () => {
    const timeStr = document.querySelector('#timestamp').value;
    const trigger = document.querySelector('#trigger').value;
    const intensity = document.querySelector('input[name="intensity"]:checked').value
    const latA = locA

    // fetch('localhost:3000/events/', {
    //   method: 'POST',
    //   body: JSON.stringify
    // })
    window.alert(intensity)
  }

  const activateSetLoc = (locId) => {
    console.log(`Form.activateSetLoc: ready to set ${locId}`)
    activateLoc(locId)
  }

  return (
    <form id="main-form" onSubmit={handleSubmit}>
      <div className="form-elements">
        <label>Event time: </label>
        <input
          id="timeStr"
          type="datetime-local"
          onChange={handleChange}
          value={formValues.timeStr}
        />
      </div>
      <div className="form-elements">
        <label>Trigger: </label>
        <select
          id="trigger"
          defaultValue={'Select trigger'}
          onChange={handleChange}
          value={formValues.trigger}
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>
      <div className="form-elements">
        <label>Intensity: </label>
        <div>
          <input
            id="intensity-0"
            type="radio"
            name="intensity"
            value="0"
            checked={formValues.intensity === "0"}
            onChange={handleChange}
          />0
        </div>
        <div>
          <input
            id="intensity-1"
            type="radio"
            name="intensity"
            value="1"
            checked={formValues.intensity === "1"}
            onChange={handleChange}
          />
          1
        </div>
        <div>
          <input
            id="intensity-2"
            type="radio"
            name="intensity"
            value="2"
            checked={formValues.intensity === "2"}
            onChange={handleChange}
          />2
        </div>
        <div>
          <input
            id="intensity-3"
            type="radio"
            name="intensity"
            value="3"
            checked={formValues.intensity === "3"}
            onChange={handleChange}
          />3
        </div>
        <div>
          <input
            id="intensity-4"
            type="radio"
            name="intensity"
            value="4"
            checked={formValues.intensity === "4"}
            onChange={handleChange}
          />4
        </div>
        <div>
          <input
            id="intensity-5"
            type="radio"
            name="intensity"
            value="5"
            checked={formValues.intensity === "5"}
            onChange={handleChange}
          />5
        </div>
      </div>

      <Map
        locations={locations}
        activatedLoc={activatedLoc}
        deactivateSetLoc={() => activateLoc('')}
        setLocA={setLocA}
        setLocB={setLocB}
      />

      <div className="form-elements">
        <label>Location A: </label>
        <input
          id="locA-lat"
          className="latlong"
          placeholder={'lat'}
          value={formValues.locA.lat}
          onChange={handleLocChange}
        />
        <input
          id="locA-long"
          className="latlong"
          placeholder={'long'}
          value={formValues.locA.long}
          onChange={handleLocChange}
        />
        <input id="locA-name"
          placeholder="optional name"
          value={formValues.locA.name}
          onChange={handleLocChange}
        />
        <button
          type="button"
          onClick={() => activateSetLoc('A')}>
          Set on map
        </button>
      </div>

      <div className="form-elements">
        <label>Location B: </label>
        <input id="latB" placeholder={'lat'} value={locB[0]}></input>
        <input id="longB" placeholder={'long'} value={locB[1]}></input>
        <input id="nameB" placeholder="optional name" value={locB[2]}></input>
        <button type="button" onClick={() => activateSetLoc('B')}>Set on map</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form;