export class Canvas {
  /**
   * 
   * @param {HTMLCanvasElement} canvasEl 
   */
  constructor(canvasEl) {
    this.context = canvasEl.getContext('2d')

    this.canvasW = canvasEl.width
    this.canvasH = canvasEl.height
  }

  /**
   * Puts pixel on canvas
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {IColor} color
   */
  putPixel(x, y, { red, green, blue } = { red: 0, green: 0, blue: 0 }) {
    this.context.fillStyle = `rgb(${red},${green},${blue})`

    this.context.fillRect(
      (this.canvasW / 2) + x,
      (this.canvasH / 2) - y, 
      1, 
      1
    )
  }
}