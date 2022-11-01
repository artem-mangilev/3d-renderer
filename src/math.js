/**
 * Vector dot product
 * 
 * @param {I3DVector} vec1 
 * @param {I3DVector} vec2
 * @returns number
 */
export function vectorDotProduct([v1x, v1y, v1z], [v2x, v2y, v2z]) {
  return v1x * v2x +
    v1y * v2y +
    v1z * v2z
}

/**
 * create vector
 * 
 * @param {I3DVector} point1
 * @param {I3DVector} point2
 * @returns {I3DVector}
 */
export function vector([p1x, p1y, p1z], [p2x, p2y, p2z]) {
  return [
    p1x - p2x,
    p1y - p2y,
    p1z - p2z
  ]
}

/**
 * get ray sphere intersection points
 * 
 * @param {I3DVector} origin - ray origin
 * @param {I3DVector} direction - ray direction
 * @param {ISphere} sphere
 * @returns {[number, number]}
 */
export function intersectRaySphere(origin, direction, sphere) {
  const COVector = vector(origin, sphere.center)

  const a = vectorDotProduct(direction, direction)
  const b = 2 * vectorDotProduct(COVector, direction)
  const c = vectorDotProduct(COVector, COVector) - sphere.radius ** 2

  const discriminant = b * b - 4 * a * c

  if (discriminant < 0) {
    return [Infinity, Infinity]
  }

  return [
    (-b + Math.sqrt(discriminant)) / (2 * a),
    (-b - Math.sqrt(discriminant)) / (2 * a),
  ]
}
