function updateLastLngLat(lngLat, collection) {
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
}

function addLngLat(lngLat, collection) {
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
        coordinates: [path]
      }
    };
  }

  return collection;
}

function polygonToBoundingbox(polygon) {
  const c = polygon.coordinates[0];
  return [
    Math.min(c[0][0], c[1][0], c[2][0], c[3][0], c[4][0]),
    Math.min(c[0][1], c[1][1], c[2][1], c[3][1], c[4][1]),
    Math.max(c[0][0], c[1][0], c[2][0], c[3][0], c[4][0]),
    Math.max(c[0][1], c[1][1], c[2][1], c[3][1], c[4][1])
  ];
}

function boundingboxToPolygone(b) {
  return {
    type: 'Polygon',
    coordinates: [[
      [b[2], b[3]],
      [b[0], b[3]],
      [b[0], b[1]],
      [b[2], b[1]],
      [b[2], b[3]]
    ]]
  };
}


module.exports = {
  addLngLat,
  updateLastLngLat,
  polygonToBoundingbox,
  boundingboxToPolygone
};
