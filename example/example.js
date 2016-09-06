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
      <BBoxSelector boxes={[[-10, -10, 10, 10]]} onBoundingBoxChange={(col) => this.setState({
        bbox: col
      })} />
      {this.state.bbox.map((box, i) => <pre key={i}>{box.join()}</pre>)}
    </div>;
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
