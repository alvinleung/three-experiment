uniform float amplitude;

attribute float displacement;

uniform float time;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;



void main() {
  vNormal = normal;
  vUv = uv;
  vPosition = position; 
  // vec3 combinedPosition = vec3(position.x , position.y + sin(time * 0.001), position.z);

  // gl_Position = projectionMatrix * modelViewMatrix * vec4(combinedPosition, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}