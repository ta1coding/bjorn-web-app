// scripts.js
import * as THREE from 'https://unpkg.com/three@0.149.0/build/three.module.js';
import { FBXLoader } from 'https://unpkg.com/three@0.149.0/examples/jsm/loaders/FBXLoader.js';

document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTime = 0;
  const scrollCooldown = 1000; // 1 second cooldown between scroll actions

  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    initialSlide: 0,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    speed: 800,
    mousewheel: {
      enabled: true,
      sensitivity: 1,
      thresholdDelta: 50,
    },
    on: {
      init: function () {
        initModelPreviews(this);
      },
    },
  });

  // Initialize model previews in the carousel slides
  function initModelPreviews(swiper) {
    const slides = swiper.slides;
    slides.forEach((slide) => {
      const modelContainer = slide.querySelector('.model-preview');
      if (modelContainer) {
        const modelName = modelContainer.getAttribute('data-model');
        loadModelPreview(modelContainer, modelName);
      }
    });
  }

  // Load model preview for a slide
  function loadModelPreview(container, modelName) {
    const width = container.clientWidth;
    const height = container.clientHeight;
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;
  
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
  
    const loader = new FBXLoader();
    const modelPath = `3d Clothing/${modelName}_fbx/${modelName}.fbx`;
    const texturePath = `3d Clothing/${modelName}_fbx/${modelName}.png`;
  
    loader.load(
      modelPath,
      (object) => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
  
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });
  
        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        object.scale.set(scale, scale, scale);
        object.position.y = -1;
  
        scene.add(object);
  
        let isHovered = false;
  
        function animate() {
          if (!isHovered || isHovered) {
            object.rotation.y += 0.01; // Rotate only if not hovered
          }
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        animate();
  
        // Add hover event listeners
        container.addEventListener('mouseenter', () => {
          isHovered = true; // Pause rotation on hover
        });
  
        container.addEventListener('mouseleave', () => {
          isHovered = false; // Resume rotation when hover ends
        });
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );
  
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

  }
}
)
