varying vec3 vNormal;
varying vec3 vUv;

uniform float uTime;
uniform vec3 color;
uniform sampler2D colorTexture;

void main() {
  vec3 light= vec3(0.5, 0.2, 1.0);
  light = normalize(light);

  float dProd = dot(vNormal, light) * 0.5 + 0.5;

  gl_FragColor = vec4(sin(uTime * 0.001),1.0,0.3,1.0);
}