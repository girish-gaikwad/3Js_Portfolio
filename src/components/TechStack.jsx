import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TagCloud = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency

    const resizeRenderer = () => {
      const parentElement = mountRef.current;
      const width = parentElement.clientWidth;
      const height = parentElement.clientHeight;

      renderer.setSize(width, height); // Set size to match parent div
      camera.aspect = width / height;  // Update camera aspect ratio
      camera.updateProjectionMatrix();
    };

    // Set the clear color to transparent
    renderer.setClearColor(0x000000, 0); // 0 is for full transparency

    // Initialize renderer size to parent div size
    resizeRenderer();

    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const icons = [
      { name: 'React', src: '/assets/react.png' },
      { name: 'next', src: '/assets/next.png' },
      { name: 'tailwindcss', src: '/assets/tailwind.png' },
      { name: 'mongodb', src: '/assets/mongodb.png' },
      { name: 'nodejs', src: '/assets/nodejs.png' },
      { name: 'mysql', src: '/assets/mysql.png' },
      { name: 'threejs', src: '/assets/threejs.png' },
      { name: 'github', src: '/assets/github.png' },
      { name: 'docker', src: '/assets/docker.png' },
      { name: 'git', src: '/assets/git.png' },
      { name: 'figma', src: '/assets/figma.png' },
      { name: 'vscode', src: '/assets/vscode.png' },
      { name: 'blender', src: '/assets/blender.png' },

      { name: 'firebase', src: '/assets/firebase.png' },
      { name: 'redux', src: '/assets/redux.png' },
      { name: 'flutter', src: '/assets/flutter.png' },
      { name: 'zustand', src: '/assets/zustand.png' },
      { name: 'prisma', src: '/assets/prisma.png' },
      { name: 'graphql', src: '/assets/graphql.png' },

      { name: 'vite', src: '/assets/vite.png' },
      { name: 'vercel', src: '/assets/vercel.png' },
      { name: 'netlify', src: '/assets/netlify.png' },
      { name: 'npm', src: '/assets/npm.png' },
      
    ];


    const radius = 3;
    const iconMeshes = [];

    icons.forEach((icon, index) => {
      const phi = Math.acos(-1 + (2 * index) / icons.length);
      const theta = Math.sqrt(icons.length * Math.PI) * phi;

      textureLoader.load(icon.src, (texture) => {
        const iconMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        const iconGeometry = new THREE.PlaneGeometry(0.6, 0.6);
        const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);

        iconMesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
        iconMesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
        iconMesh.position.z = radius * Math.cos(phi);

        scene.add(iconMesh);
        iconMeshes.push(iconMesh);
      });
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.005;

      iconMeshes.forEach(iconMesh => {
        iconMesh.lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Ensure renderer resizes when the window is resized
    window.addEventListener('resize', resizeRenderer);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', resizeRenderer);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default TagCloud;
