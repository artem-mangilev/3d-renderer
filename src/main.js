import { Canvas } from "./canvas.js"
import { Color } from "./color.js"

const canvas = new Canvas(
  document.getElementById('canvas')
)

const color = Color.multiply({ red: 75, green: 50, blue: 50 }, 2)

canvas.putPixel(0, 0, color)
canvas.putPixel(1, 0, color)
canvas.putPixel(0, -1, color)
canvas.putPixel(1, -1, color)
