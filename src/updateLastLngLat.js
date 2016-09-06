module.exports = function updateLastLngLat(lngLat, collection) {
  const firstPoint = collection[collection.length - 1].geometry.coordinates[0][0];
  const newPoint = lngLat;
  const path = [
    firstPoint,
    [newPoint[0], firstPoint[1]],
    newPoint,
    [firstPoint[0], newPoint[1]],
    firstPoint
  ];
  collection[collection.length - 1] = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [path]
    }
  };
  return collection;
};
