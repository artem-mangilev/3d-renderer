/**
 * @typedef IColor
 * @prop {number} red
 * @prop {number} green
 * @prop {number} blue
 * 
 * @typedef {[number, number, number]} I3DVector
 * 
 * @typedef ISphere
 * @prop {I3DVector} center
 * @prop {number} radius
 * @prop {IColor} color
 * 
 * @typedef {'ambient' | 'point' | 'directional'} LightType
 * 
 * @typedef AmbientLight
 * @prop {LightType} type
 * @prop {number} intensity
 * 
 * @typedef PointLight
 * @prop {LightType} type
 * @prop {number} intensity 
 * @prop {I3DVector} position
 * 
 * @typedef DirectionalLight
 * @prop {LightType} type
 * @prop {number} intensity 
 * @prop {I3DVector} direction
 */