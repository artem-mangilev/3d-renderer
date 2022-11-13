import { Canvas } from "./canvas.js"
import { Color } from "./color.js"
import { intersectRaySphere, numberVectorProduct, sumVectors, vector, vectorDotProduct, vectorLength, vectorNumberDivision } from "./math.js";

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
    color: { red: 255, green: 0, blue: 0 },
    specular: 500
  },
  {
    center: [2, 0, 4],
    radius: 1,
    color: { red: 0, green: 0, blue: 255 },
    specular: 500
  },
  {
    center: [-2, 0, 4],
    radius: 1,
    color: { red: 0, green: 255, blue: 0 },
    specular: 10
  },
  {
    center: [0, -5001, 0],
    radius: 5000,
    color: { red: 255, green: 255, blue: 0 },
    specular: 1000
  }
]

/**
 * @type {(AmbientLight | PointLight | DirectionalLight)[]}
 */
const lights = [
  {
    type: 'ambient',
    intensity: 0.2
  }, 
  {
    type: 'point',
    intensity: 0.6,
    position: [2, 1, 0]
  },
  {
    type: 'directional',
    intensity: 0.6,
    direction: [1, 4, 4]
  }
]

/**
 * compute lighting for point
 * 
 * @param {I3DVector} point
 * @param {I3DVector} normal 
 * @param {I3DVector} view vector from object to camera
 * @param {number} specular shineness of object
 */
function computeLighting(point, normal, view, specular) {
  let lightingLevel = 0

  for (const light of lights) {
    if (light.type === 'ambient') {
      lightingLevel += light.intensity
    } else {
      let lightDirection

      if (light.type === 'point') {
        lightDirection = vector(light.position, point)
      } else {
        lightDirection = light.direction
      }

      // diffuse
      const normalDotLightDirection = vectorDotProduct(normal, lightDirection)
      if (normalDotLightDirection > 0) {
        lightingLevel += (light.intensity * normalDotLightDirection) / (vectorLength(normal) * vectorLength(lightDirection))
      }

      // specular
      if (specular !== -1) {
        const reflectionVector = sumVectors(
          numberVectorProduct(
            vectorDotProduct(normal, lightDirection),
            numberVectorProduct(2, normal)
          ),
          numberVectorProduct(-1, lightDirection)
        )

        const reflectionDotView = vectorDotProduct(reflectionVector, view)

        if (reflectionDotView > 0) {
          lightingLevel += 
            light.intensity * Math.pow(reflectionDotView / (vectorLength(reflectionVector) * vectorLength(view)), specular)
        }
      }
    }
  }

  return lightingLevel
}

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

  const intersectionPoint = sumVectors(origin, numberVectorProduct(closestT, direction))
  let normal = vector(intersectionPoint, closestSphere.center)
  normal = vectorNumberDivision(normal, vectorLength(normal)) // cant understand why we should normalize, without this line result the same

  return Color.multiply(
    closestSphere.color, 
    computeLighting(
      intersectionPoint, 
      normal, 
      numberVectorProduct(-1, direction), 
      closestSphere.specular
    )
  )
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