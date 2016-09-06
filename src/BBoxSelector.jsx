import React, { Component } from 'React';
import mapboxgl from 'mapbox-gl';
import addLngLat from './addLngLat';

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
    this.map.on('click', this.onMouseEvent.bind(this));
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
  onMouseEvent(e) {
    if (this.state.pointToAdd > 0) {
      this.setState({
        pointToAdd: this.state.pointToAdd - 1
      });
      this.setState({
        collection: addLngLat(e.lngLat.wrap().toArray(), this.state.collection)
      });
      this.map.getSource('boxes').setData(this.getGeoJSONData());
    }
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
      <div ref="mapcontent"></div>
    </div>;
  }
}

export default BBoxSelector;
