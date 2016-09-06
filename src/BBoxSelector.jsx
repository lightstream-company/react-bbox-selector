import React, { Component } from 'React';
import mapboxgl from 'mapbox-gl';
import addLngLat from './addLngLat';
import updateLastLngLat from './updateLastLngLat';

class BBoxSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointToAdd: 0,
      collection: []
    };
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/streets-v9',
      container: this.refs.mapcontent
    //    interactive: false
    });

    this.map.on('click', (clickEvent) => {
      if (!this.drawing) {
        this.onMouseEvent(clickEvent);
        this.map.once('mousemove', (firstMoveEvent) => {
          this.onMouseEvent(firstMoveEvent);
          this.drawing = true;
        });
      } else {
        this.drawing = false;
      }
    });
    this.map.on('mousemove', (moveEvent) => {
      if (this.drawing) {
        this.setCollection(updateLastLngLat(moveEvent.lngLat.wrap().toArray(), this.state.collection));
      }
    });

    this.map.on('load', () => {
      this.map.addSource('boxes', {
        type: 'geojson',
        data: this.getGeoJSONData()
      });
      this.map.addLayer({
        id: 'boxes',
        type: 'fill',
        source: 'boxes',
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
    });
  }
  getGeoJSONData() {
    return {
      type: 'FeatureCollection',
      features: this.state.collection
    };
  }
  setCollection(collection) {
    this.setState({
      collection
    });
    this.map.getSource('boxes').setData(this.getGeoJSONData());
  }
  onMouseEvent(e) {
    this.setCollection(addLngLat(e.lngLat.wrap().toArray(), this.state.collection));
  }
  clear() {
    this.setCollection([]);
  }
  render() {
    const props = {
      onClick: () => {
        this.setState({
          pointToAdd: 2
        });
      },
      disabled: this.state.pointToAdd > 0
    };
    return <div>
      <button {...props}>Add bouding box</button>
      <button onClick={() => this.clear()}>Clear</button>
      <div ref="mapcontent"></div>
    </div>;
  }
}

export default BBoxSelector;
