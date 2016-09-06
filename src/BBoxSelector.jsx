import React, { Component, PropTypes } from 'React';
import mapboxgl from 'mapbox-gl';
import { addLngLat, updateLastLngLat, boundingboxToPolygone, polygonToBoundingbox } from './utils';

class BBoxSelector extends Component {
  constructor(props) {
    super(props);
    var collection = [];
    if (props.boxes) {
      collection = props.boxes.map((bbox) => {
        return {
          type: 'Feature',
          geometry: boundingboxToPolygone(bbox)
        };
      });
    }
    this.state = {
      collection
    };
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      style: this.props.mapStyle || 'mapbox://styles/mapbox/streets-v9',
      container: this.refs.mapcontent
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
        paint: Object.assign({
          'fill-color': '#fff',
          'fill-opacity': 0.2,
          'fill-outline-color': '#000'
        }, this.props.layerStyle)
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
    if (this.props.onBoundingBoxChange) {
      this.props.onBoundingBoxChange(this.state.collection.filter((item) => {
        return item.geometry.type === 'Polygon';
      }).map((item) => {
        return polygonToBoundingbox(item.geometry);
      }));
    }
  }
  onMouseEvent(e) {
    this.setCollection(addLngLat(e.lngLat.wrap().toArray(), this.state.collection));
  }
  clear() {
    this.setCollection([]);
  }
  undo() {
    this.setCollection(this.state.collection.slice(0, -1));
  }
  render() {
    return <div>
      <button onClick={() => this.clear()}>Clear</button>
      <button onClick={() => this.undo()}>Undo</button>
      <div ref="mapcontent"></div>
    </div>;
  }
}

BBoxSelector.propTypes = {
  mapStyle: PropTypes.any,
  layerStyle: PropTypes.object,
  boxes: PropTypes.array,
  onBoundingBoxChange: PropTypes.func
};

export default BBoxSelector;
