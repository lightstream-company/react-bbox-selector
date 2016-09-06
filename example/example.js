import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import BBoxSelector from '../src/BBoxSelector.jsx';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bbox: []
    };
  }
  render() {
    return <div>
      <BBoxSelector onBoundingBoxChange={(col) => this.setState({
        bbox: col
      })} />
      <pre>
        {JSON.stringify(this.state.bbox, null, ' ')}
      </pre>
    </div>;
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
