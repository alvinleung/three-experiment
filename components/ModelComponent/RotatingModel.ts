import * as THREE from "three";
import EFFECT_FRAG from "./VisualEffect.frag";
import EFFECT_VERT from "./VisualEffect.vert";
import { Chris } from "./Chris";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class RotatingModel {
  clock: THREE.Clock;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  orbitControls: OrbitControls;

  chris: Chris;

  constructor(canvas: HTMLCanvasElement) {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;
    this.camera = camera;

    const scene = new THREE.Scene();
    this.scene = scene;

    const light = new THREE.AmbientLight(0xffaaff);
    light.position.set(10, 10, 10);
    scene.add(light);

    this.chris = new Chris(this.scene);

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 1 },
        uResolution: { value: new THREE.Vector2() },
      },
      vertexShader: EFFECT_VERT,
      fragmentShader: EFFECT_FRAG,
    });

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.y = -1;
    this.mesh = mesh;
    scene.add(mesh);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.update.bind(this));

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.clock = new THREE.Clock();
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update(time: number) {
    const delta = this.clock.getDelta();

    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;

    this.orbitControls.update();
    this.chris.update(time);

    this.material.uniforms.uTime.value = time;
    // update code here
    this.renderer.render(this.scene, this.camera);
  }

  cleanup() {
    // TODO: implement cleanup function here
  }
}
