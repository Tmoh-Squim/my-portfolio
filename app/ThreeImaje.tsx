"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeImage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

  useEffect(() => {
    if (!containerRef.current) return; // Ensure the container is not null

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(350, 350); // Match the image size
    containerRef.current.appendChild(renderer.domElement);

    // Create the plane geometry for the image
    const geometry = new THREE.PlaneGeometry(3, 3);
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load("/Profile1.png"); // Replace with your image path
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation loop
    const animate = () => {
      plane.rotation.y += 0.01; // Seamless rotation
      plane.rotation.x += 0.005; // Add a slight tilt for depth
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-[350px] h-[350px]"></div>;
};

export default ThreeImage;
