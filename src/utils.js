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
  return polygon;
}

function boundingboxToPolygone(bbox) {
  return bbox;
}


module.exports = {
  addLngLat,
  updateLastLngLat,
  polygonToBoundingbox,
  boundingboxToPolygone
};
