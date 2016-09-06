import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import BBoxSelector from '../src/BBoxSelector.jsx';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';

ReactDOM.render(<BBoxSelector />, document.getElementById('app'));
