const {expect} = require('chai');
const addLngLat = require('../src/addLngLat');

describe('addLngLat', () => {

  it('should add multiple points', () => {

    var collection = [];
    collection = addLngLat([10, 10], collection);
    expect(collection[0]).to.be.deep.equal({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10, 10]
      }
    });

    collection = addLngLat([-10, -10], collection);
    expect(collection[0]).to.be.deep.equal({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [10, 10],
          [-10, 10],
          [-10, -10],
          [10, -10],
          [10, 10]
        ]
      }
    });

    collection = addLngLat([50, 50], collection);
    expect(collection).to.be.deep.equal([{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [10, 10],
          [-10, 10],
          [-10, -10],
          [10, -10],
          [10, 10]
        ]
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [50, 50]
      }
    }]);

    collection = addLngLat([-50, -50], collection);
    expect(collection).to.be.deep.equal([{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [10, 10],
          [-10, 10],
          [-10, -10],
          [10, -10],
          [10, 10]
        ]
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [50, 50],
          [-50, 50],
          [-50, -50],
          [50, -50],
          [50, 50]
        ]
      }
    }]);

  });


});
