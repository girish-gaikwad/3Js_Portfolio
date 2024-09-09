// Import necessary libraries
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Your tech stack icons


const TechMarquee = ({techStack} ) => {
  const mountRef = useRef(null);
  const icons = useRef([]); // Store the icon planes

  useEffect(() => {
    let scene, camera, renderer;

    // Initialize Scene
    scene = new THREE.Scene();

    // Initialize Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Initialize Renderer with transparency enabled
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha true for transparent background
    renderer.setClearColor(0x000000, 0); // Optional: Set clear color to transparent
    mountRef.current.appendChild(renderer.domElement);

    // Function to resize renderer to match parent div size
    const resizeRenderer = () => {
      const parentElement = mountRef.current;
      if (parentElement) {
        const width = parentElement.clientWidth;
        const height = parentElement.clientHeight;

        // Update renderer size and camera aspect ratio
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    // Load tech stack icons
    const loadIcons = () => {
      const loader = new THREE.TextureLoader();
      techStack.forEach((iconPath, index) => {
        loader.load(iconPath, (texture) => {
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
          
          // Increase size of each icon to 4x4
          const geometry = new THREE.PlaneGeometry(4, 4); // Adjust this for larger icons
          const iconMesh = new THREE.Mesh(geometry, material);

          // Increase spacing between icons (e.g., 6 units apart)
          iconMesh.position.set(index * 6, 0, 0); // Adjust this value for more space
          scene.add(iconMesh);
          icons.current.push(iconMesh); // Add icon to the array for interaction
        });
      });
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move icons to create marquee effect
      icons.current.forEach((icon, index) => {
        icon.position.x -= 0.05; // Adjust speed here

        // If icon goes off the left edge, reset to the rightmost position
        if (icon.position.x < -(techStack.length * 6) / 2) {
          icon.position.x = (techStack.length * 6) / 2; // Reset position when it goes off screen
        }
      });

      renderer.render(scene, camera);
    };

    // Handle window resize or parent element resize
    const onWindowResize = () => {
      resizeRenderer();
    };

    // Initialize the renderer size based on the parent div
    resizeRenderer();
    window.addEventListener('resize', onWindowResize);

    loadIcons();
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default TechMarquee;
