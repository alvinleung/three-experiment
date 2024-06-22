varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

uniform float time;
uniform vec3 color;
uniform sampler2D colorTexture;

uniform sampler2D baseTexture;

void main() {
  vec3 light= vec3(0.5, 0.2, 1.0);
  light = normalize(light);

  float dProd = dot(vNormal, light) * 0.5 + 0.5;

  vec4 texColor = texture2D(baseTexture, vUv);
  vec4 genColor = vec4(sin(vPosition.y * time * 0.001),1.0,0.3,1.0);
 
  vec4 combined = texColor * vec4(1.0,1.0,1.0,sin(vPosition.y * time * 0. 0)); 

  // gl_FragColor = combined;
  gl_FragColor = combined;
  // gl_FragColor = vec4(sin(uTime * 0.001),1.0,0.3,1.0);
}