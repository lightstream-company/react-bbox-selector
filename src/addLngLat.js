module.exports = function addLngLat(lngLat, collection) {
  const lastBbox = collection[collection.length - 1];

  if (!lastBbox || lastBbox.geometry.type === 'Polygon') {
    collection.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: lngLat
      }
    });
  } else {
    const firstPoint = collection[collection.length - 1].geometry.coordinates;
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
        coordinates: path
      }
    };
  }

  return collection;
};
