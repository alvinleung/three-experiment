import * as THREE from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

import VERT_SHADER from "./ChrisEffect.vert";
import FRAG_SHADER from "./ChrisEffect.frag";

export class Chris {
  scene: THREE.Scene;
  mesh: THREE.Mesh | undefined;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const loader = new GLTFLoader();
    loader.load(
      "/assets/poly.glb",
      this.onLoad.bind(this),
      this.onProgress.bind(this),
      this.onError.bind(this)
    );
  }

  update(time: number) {
    if (!this.mesh) return;
    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.time.value = time;
  }

  private onProgress(e: ProgressEvent<EventTarget>) {
    console.log((e.loaded / e.total) * 100 + "% loaded");
  }

  private onLoad(gltf: GLTF) {
    this.mesh = this.getSceneMesh(gltf.scene);
    this.mesh.material = this.getCustomMaterial(this.mesh);
    this.scene.add(this.mesh);
  }

  private getSceneMesh(model: THREE.Object3D) {
    let mesh: THREE.Mesh | undefined;
    model.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        mesh = node as THREE.Mesh;
      }
    });
    if (!mesh) throw "Could not find mesh in scene";
    return mesh;
  }

  private getCustomMaterial(mesh: THREE.Mesh) {
    // THREE js require you to add all the light uniform back into the
    // https://github.com/mrdoob/three.js/issues/16656

    var uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["lights"],
      {
        baseTexture: {
          value: (mesh.material as THREE.MeshStandardMaterial).map,
        },
        time: {
          value: 0,
        },
      },
    ]);

    const customMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      lights: true,
      vertexShader: VERT_SHADER,
      fragmentShader: FRAG_SHADER,
    });
    return customMaterial;
  }

  private onError(error: any) {
    console.log(error);
  }
}
