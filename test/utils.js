const {expect} = require('chai');
const {updateLastLngLat, addLngLat, polygonToBoundingbox, boundingboxToPolygone} = require('../src/utils');

describe('utils', () => {
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
          coordinates: [[
            [10, 10],
            [-10, 10],
            [-10, -10],
            [10, -10],
            [10, 10]
          ]]
        }
      });

      collection = addLngLat([50, 50], collection);
      expect(collection).to.be.deep.equal([{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [10, 10],
            [-10, 10],
            [-10, -10],
            [10, -10],
            [10, 10]
          ]]
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
          coordinates: [[
            [10, 10],
            [-10, 10],
            [-10, -10],
            [10, -10],
            [10, 10]
          ]]
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [50, 50],
            [-50, 50],
            [-50, -50],
            [50, -50],
            [50, 50]
          ]]
        }
      }]);
    });
  });

  describe('polygonToBoundingbox', () => {
    it.skip('should covert polygon to bbox', () => {
      expect(polygonToBoundingbox({
        type: 'Polygon',
        coordinates: [[
          [50, 50],
          [-50, 50],
          [-50, -50],
          [50, -50],
          [50, 50]
        ]]
      })).to.be.deep.equal([-50, -50, 50, 50]);
    });
  });

  describe.skip('boundingboxToPolygone', () => {
    it('should polygon to bbox', () => {
      expect(boundingboxToPolygone([-50, -50, 50, 50])).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[
          [50, 50],
          [-50, 50],
          [-50, -50],
          [50, -50],
          [50, 50]
        ]]
      });
    });
  });


});
