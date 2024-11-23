document.addEventListener('DOMContentLoaded', function() {
  let isAnimating = false;
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
      thresholdDelta: 50
    },
    on: {
      init: function() {
        initModelPreviews(this);
        updateEmergingModel(this, true);
      },
      slideChange: function () {
        updateEmergingModel(this, false);
      }
    }
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

    // Create Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Load FBX model
    const loader = new THREE.FBXLoader();
    const modelPath = `../3d Clothing/${modelName}_fbx/${modelName}.fbx`;
    const texturePath = `../3d Clothing/${modelName}_fbx/${modelName}.png`;

    loader.load(modelPath, (object) => {
      // Load texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(texturePath);

      object.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });

      // Scale and position the model
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim; // Adjust scale as needed
      object.scale.set(scale, scale, scale);
      object.position.y = -1; // Adjust position if needed

      scene.add(object);

      // Rotate model for preview
      function animate() {
        requestAnimationFrame(animate);
        object.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  // Update the emerging model in the center
  function updateEmergingModel(swiper, isInitial) {
    if (isAnimating && !isInitial) return;
    isAnimating = true;

    const activeSlide = swiper.slides[swiper.activeIndex];
    const modelName = activeSlide.querySelector('.model-preview').getAttribute('data-model');

    const emergingModelContainer = document.querySelector('.emerging-model');
    const emergingModelInner = emergingModelContainer.querySelector('.emerging-model-inner');
    const existingScene = emergingModelInner.querySelector('canvas');

    if (existingScene) {
      // Remove existing canvas
      emergingModelInner.removeChild(existingScene);
    }

    // Load new model into emerging model container
    loadEmergingModel(modelName);

    if (!isInitial && emergingModelContainer.classList.contains('active')) {
      // Recede current model
      emergingModelContainer.classList.add('receding');
      emergingModelContainer.classList.remove('active');

      setTimeout(() => {
        // Force a reflow
        emergingModelContainer.offsetHeight;

        // Emerge new model
        emergingModelContainer.classList.remove('receding');
        emergingModelContainer.classList.add('active');

        setTimeout(() => {
          isAnimating = false;
        }, 800);
      }, 400);
    } else {
      // Initial load or no current model
      emergingModelContainer.classList.add('active');

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }
  }

  // Load the emerging model
  function loadEmergingModel(modelName) {
    const container = document.getElementById('emerging-model-scene');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Load FBX model
    const loader = new THREE.FBXLoader();
    const modelPath = `../3d Clothing/${modelName}_fbx/${modelName}.fbx`;
    const texturePath = `../3d Clothing/${modelName}_fbx/${modelName}.png`;

    loader.load(modelPath, (object) => {
      // Load texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(texturePath);

      object.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });

      // Scale and position the model
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3.5 / maxDim; // Adjust scale as needed
      object.scale.set(scale, scale, scale);
      object.position.y = -1; // Adjust position if needed

      scene.add(object);

      // Animate the scene
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  // Custom scroll handling
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;
    lastScrollTime = now;

    if (!isAnimating) {
      if (e.deltaY > 0) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
    }
  }, { passive: false });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      swiper.update();
    }, 250);
  });
});
