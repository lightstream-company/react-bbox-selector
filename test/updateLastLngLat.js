const {expect} = require('chai');
const addLngLat = require('../src/addLngLat');
const updateLastLngLat = require('../src/updateLastLngLat');

describe('updateLastLngLat', () => {
  it('should update last point', () => {
    var collection = [];
    collection = addLngLat([10, 10], collection);
    collection = addLngLat([-10, -10], collection);
    collection = updateLastLngLat([-30, -30], collection);
    expect(collection[0]).to.be.deep.equal({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [10, 10],
          [-30, 10],
          [-30, -30],
          [10, -30],
          [10, 10]
        ]]
      }
    });
  });
});
