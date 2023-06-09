import React, { useEffect, useState } from 'react';
import Map from './Map.js';
import geodist from 'geodist';

const Form = () => {
  const [activatedLoc, activateLoc] = useState('');
  const [formValues, setFormValues] = useState({
    timeStr: '',
    trigger: '',
    intensity: 0,
    locA: { lat: '', long: '', name: '' },
    locB: { lat: '', long: '', name: '' },
  });
  const [mapOptions, setMapOptions] = useState({
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: [
      {
        stylers: [
          { saturation: 50 },
          { gamma: 1 },
          { lightness: 4 },
          { visibility: 'on' },
        ],
      },
    ],
    draggableCursor: 'default',
    cursor: 'default',
  });
  const [buttonClasses, setButtonClasses] = useState({
    A: 'button-inactive',
    B: 'button-inactive',
  });
  const [distance, setDistance] = useState(null);

  const handleChange = (e) => {
    const newFormValues = { ...formValues };
    let elId = e.target.id;

    if (e.target.name === 'intensity') elId = 'intensity';

    newFormValues[elId] = e.target.value;
    setFormValues(newFormValues);
  };

  const handleLocChange = (e) => {
    const newFormValues = { ...formValues };
    const selectedLoc = e.target.id.substring(0, 4);
    const newLocValues = { ...newFormValues[selectedLoc] };
    const selectedEl = e.target.id.substring(5);

    newLocValues[selectedEl] = e.target.value;
    newFormValues[selectedLoc] = newLocValues;
    setFormValues(newFormValues);

    const latA = newFormValues.locA.lat;
    const longA = newFormValues.locA.long;
    const latB = formVnewFormValuesalues.locB.lat;
    const longB = newFormValues.locB.long;
    getDist(latA, longA, latB, longB);
  };

  const getDist = (latA, longA, latB, longB) => {
    let distance;
    if (latA && longA && latB && longB) {
      distance = geodist(
        { latA, longA },
        { latB, longB },
        { exact: true, unit: 'feet' }
      );
    }

    setDistance(distance);
    console.log(distance);
  };

  const updateLocFromMap = (locId, ...newVals) => {
    const loc = `loc${locId}`;
    const newFormValues = { ...formValues };
    const newLocValues = { ...newFormValues[loc] };

    newLocValues.lat = newVals[0];
    newLocValues.long = newVals[1];

    newFormValues[loc] = newLocValues;
    setFormValues(newFormValues);
  };

  const handleSubmit = () => {
    // const [formValues, setFormValues] = useState({
    //   timeStr: '',
    //   trigger: '',
    //   intensity: 0,
    //   locA: { lat: '', long: '', name: '' },
    //   locB: { lat: '', long: '', name: '' },
    // })
    const reqBody = {
      timeStr: formValues.timeStr,
      trigger: formValues.trigger,
      intensity: formValues.intensity,
      latA: formValues.locA.lat,
      longA: formValues.locA.long,
      // nameA: formValues.locA.name,
      latB: formValues.locB.lat,
      longB: formValues.locB.long,
      // nameB: formValues.locB.name
    };

    fetch('/events', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        const res = document.getElementById('result');
        res.innerText = data;
      })
      .catch((err) => console.log(err));
  };

  const activateSetLoc = (locId) => {
    activateLoc(locId);

    const newMapOptions = { ...mapOptions };
    if (locId) {
      newMapOptions.draggableCursor = 'crosshair';
    } else {
      newMapOptions.draggableCursor = 'default';
    }

    setMapOptions(newMapOptions);

    const newButtonClasses = { A: 'button-inactive', B: 'button-inactive' };
    newButtonClasses[locId] = 'button-active';
    setButtonClasses(newButtonClasses);
  };

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
        <select id="trigger" onChange={handleChange} value={formValues.trigger}>
          <option value="">Select trigger</option>
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
            checked={formValues.intensity === '0'}
            onChange={handleChange}
          />
          0
        </div>
        <div>
          <input
            id="intensity-1"
            type="radio"
            name="intensity"
            value="1"
            checked={formValues.intensity === '1'}
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
            checked={formValues.intensity === '2'}
            onChange={handleChange}
          />
          2
        </div>
        <div>
          <input
            id="intensity-3"
            type="radio"
            name="intensity"
            value="3"
            checked={formValues.intensity === '3'}
            onChange={handleChange}
          />
          3
        </div>
        <div>
          <input
            id="intensity-4"
            type="radio"
            name="intensity"
            value="4"
            checked={formValues.intensity === '4'}
            onChange={handleChange}
          />
          4
        </div>
        <div>
          <input
            id="intensity-5"
            type="radio"
            name="intensity"
            value="5"
            checked={formValues.intensity === '5'}
            onChange={handleChange}
          />
          5
        </div>
      </div>

      <Map
        activatedLoc={activatedLoc}
        updateLocFromMap={updateLocFromMap}
        toggleSetLoc={() => {
          if (activatedLoc === 'A' && !formValues.locB.lat) activateSetLoc('B');
          else if (activatedLoc === 'B' && !formValues.locA.lat)
            activateSetLoc('A');
          else activateSetLoc('');
        }}
        mapOptions={mapOptions}
        getDist={getDist}
        distance={distance}
      />

      <div className="form-elements">
        <label>Location A: </label>
        <input
          id="locA-lat"
          className="latlong"
          placeholder={'lat'}
          value={formValues.locA.lat}
          onChange={handleLocChange}
          onInput={handleLocChange}
        />
        <input
          id="locA-long"
          className="latlong"
          placeholder={'long'}
          value={formValues.locA.long}
          onChange={handleLocChange}
        />
        <input
          id="locA-name"
          placeholder="optional name"
          value={formValues.locA.name}
          onChange={handleLocChange}
        />
        <button
          id="button-A"
          className={buttonClasses.A}
          type="button"
          onClick={() => {
            activateSetLoc('A');
          }}
        >
          Set on map
        </button>
      </div>

      <div className="form-elements">
        <label>Location B: </label>
        <input
          id="locB-lat"
          className="latlong"
          placeholder={'lat'}
          value={formValues.locB.lat}
          onChange={handleLocChange}
        />
        <input
          id="locB-long"
          className="latlong"
          placeholder={'long'}
          value={formValues.locB.long}
          onChange={handleLocChange}
        />
        <input
          id="locB-name"
          placeholder="optional name"
          value={formValues.locB.name}
          onChange={handleLocChange}
        />
        <button
          id="button-B"
          className={buttonClasses.B}
          type="button"
          onClick={() => activateSetLoc('B')}
        >
          Set on map
        </button>
      </div>

      <div id="form-buttons">
        <button id="button-submit" type="submit">
          Submit
        </button>
        <button id="button-reset" type="reset">
          Clear form
        </button>
      </div>
    </form>
  );
};

export default Form;
