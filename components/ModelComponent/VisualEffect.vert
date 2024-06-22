uniform float amplitude;

attribute float displacement;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vNormal = normal;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}