import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PointLight, PlaneGeometry, MeshStandardMaterial, TextureLoader } from 'three';
import * as THREE from "three"
export function Vortex() {
  const mesh = useRef();
  const { scene, camera, gl: renderer } = useThree();

  let portalGeo, portalMaterial, smokeGeo, smokeMaterial, clock;
  let portalParticles = [];
  let smokeParticles = [];

  const portalLight = new PointLight(0x062d89, 30, 600, 1.7);
  scene.add(portalLight);

  useEffect(() => {
    let loader = new TextureLoader();

    loader.load("/component/3D-models/smoke.JPG", function (texture){
      portalGeo = new PlaneGeometry(350,350);
      portalMaterial = new MeshStandardMaterial({
        map:texture,
        transparent: true
      });
      smokeGeo = new PlaneGeometry(1000,1000);
      smokeMaterial = new MeshStandardMaterial({
        map:texture,
        transparent: true
      });

      for(let p=880;p>250;p--) {
        let particle = new THREE.Mesh(portalGeo,portalMaterial);
        particle.position.set(
          0.5 * p * Math.cos((4 * p * Math.PI) / 180),
          0.5 * p * Math.sin((4 * p * Math.PI) / 180),
          0.1 * p
        );
        particle.rotation.z = Math.random() *360;
        portalParticles.push(particle);
        scene.add(particle);
      }

      for(let p=0;p<40;p++) {
        let particle = new THREE.Mesh(smokeGeo,smokeMaterial);
        particle.position.set(
          Math.random() * 1000-500,
          Math.random() * 400-200,
          25
        );
        particle.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI); // Randomize x, y and z rotation
        particle.material.opacity = 0.6;
        smokeParticles.push(particle);
        scene.add(particle);
    }
    
    
      clock = new THREE.Clock();
      animate();
    });

    const animate = () => {
      let delta = clock.getDelta();
      portalParticles.forEach(p => {
        p.rotation.z -= delta *1.5;
      });
      smokeParticles.forEach(p => {
        p.rotation.z -= delta *0.2;
      });
      if(Math.random() > 0.9) {
        portalLight.power =350 + Math.random()*500;
      }
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
  }, [scene, camera, renderer]);

  return (
    <mesh ref={mesh}>
    </mesh>
  );
}
