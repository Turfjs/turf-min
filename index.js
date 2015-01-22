var inside = require('turf-inside');

/**
* Calculates the minimum value of a field for {@link Point} features within a set of {@link Polygon} features.
*
* @module turf/min
* @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
* @param {FeatureCollection} points a FeatureCollection of {@link Point} features
* @param {string} inField the field in input data to analyze
* @param {string} outField the field in which to store results
* @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
* with properties listed as `outField` values
* @example
* var polygons = turf.featurecollection([
*   turf.polygon([[
*     [72.809658, 18.961818],
*     [72.809658, 18.974805],
*     [72.827167, 18.974805],
*     [72.827167, 18.961818],
*     [72.809658, 18.961818]
*   ]]),
*   turf.polygon([[
*     [72.820987, 18.947043],
*     [72.820987, 18.95922],
*     [72.841243, 18.95922],
*     [72.841243, 18.947043],
*     [72.820987, 18.947043]
*   ]])
* ]);
* var points = turf.featurecollection([
*   turf.point([72.814464, 18.971396], {population: 200}),
*   turf.point([72.820043, 18.969772], {population: 600}),
*   turf.point([72.817296, 18.964253], {population: 100}),
*   turf.point([72.83575, 18.954837], {population: 200}),
*   turf.point([72.828197, 18.95094], {population: 300})]);
*
* var minimums = turf.min(
*   polygons, points, 'population', 'min');
*
* var result = turf.featurecollection(
*   points.features.concat(minimums.features));
*
* //=result
*/
module.exports = function(polyFC, ptFC, inField, outField){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    });
    poly.properties[outField] = min(values);
  });

  return polyFC;
};

function min(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, min is
        // undefined and is thus made the minimum element in the array
        if (x[i] < value || value === undefined) value = x[i];
    }
    return value;
}
