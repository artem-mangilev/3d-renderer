export class Color {
  /**
   * Multiplies color
   * 
   * @todo handle clamping
   * 
   * @param {IColor} color
   * @param {number} factor 
   * @returns {IColor}
   */
  static multiply(color, factor) {
    return {
      red: color.red * factor,
      green: color.green * factor,
      blue: color.blue * factor
    }
  }

  /**
   * Sum colors
   * 
   * @todo handle clamping
   * 
   * @param {IColor} color1 
   * @param {IColor} color2 
   * @returns {IColor}
   */
  static sum(color1, color2) {
    return {
      red: color1.red + color2.red,
      green: color1.green + color2.green,
      blue: color1.blue + color2.blue
    }
  } 
}