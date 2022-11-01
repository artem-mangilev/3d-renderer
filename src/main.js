import { Canvas } from "./canvas.js"
import { Color } from "./color.js"
import { intersectRaySphere } from "./math.js";

const canvas = new Canvas(
  document.getElementById('canvas')
)

const viewportSize = 1;
const projectionPlaneDistance = 1;

/**
 * @type {ISphere[]}
 */
const spheres = [
  {
    center: [0, -1, 3],
    radius: 1,
    color: { red: 255, green: 0, blue: 0 }
  },
  {
    center: [2, 0, 4],
    radius: 1,
    color: { red: 0, green: 0, blue: 255 }
  },
  {
    center: [-2, 0, 4],
    radius: 1,
    color: { red: 0, green: 255, blue: 0 }
  }
]

/**
 * Traces ray
 * 
 * @param {I3DVector} origin 
 * @param {I3DVector} direction 
 * @param {number} tMin - min ratio that defines direction vector length
 * @param {number} tMax - max ratio that defines direction vector length
 * @returns {IColor}
 */
function traceRay(origin, direction, tMin, tMax) {
  let closestT = Infinity
  let closestSphere = null

  for (const sphere of spheres) {
    const [t1, t2] = intersectRaySphere(origin, direction, sphere)

    if ((t1 > tMin && t1 < tMax) && t1 < closestT) {
      closestT = t1
      closestSphere = sphere
    }

    if ((t2 > tMin && t2 < tMax) && t2 < closestT) {
      closestT = t2
      closestSphere = sphere
    }
  }

  if (closestSphere === null) {
    return { red: 255, green: 255, blue: 255 }
  }

  return closestSphere.color
}

/**
 * canvas to viewport
 * 
 * @param {number} x 
 * @param {number} y
 * @returns {I3DVector}
 */
function canvasToViewPort(x, y) {
  return [
    x * (viewportSize / canvas.canvasW),
    y * (viewportSize / canvas.canvasH),
    projectionPlaneDistance
  ]
}

function render() {
  const origin = [0, 0, 0]

  for (let x = -canvas.canvasW / 2; x <= canvas.canvasW / 2; x++) {
    for (let y = -canvas.canvasH / 2; y <= canvas.canvasH / 2; y++) {
      const distance = canvasToViewPort(x, y)
      const color = traceRay(origin, distance, 1, Infinity)
      canvas.putPixel(x, y, color)
    }    
  }
}

render()