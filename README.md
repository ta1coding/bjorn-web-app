
For the person who is now writting on my project

Currently the site is being shifted from supporting images on a basic image carousel to supporting 3d models. The carousel is just a 2d circular carousel and while trying to modify for 3d model support i've run into lots of issues with rendering the models. I think the issue is with the FBXLoader possibly using an older version that no longer works or atleast thats what Ian said was the problem with his model rendering which is also FBX. Once the site is deployed with the images on the carousel they do not appear on the public site but they do when locally hosted. That is the current state of my project.

In terms of running and viewing the site I use the Live Server extension to locally host the site. I had trouble doing it the normal way but it may work on your computer. If not just download live server. It runs the site on your chosen default browser.

I currently only have the 4 code files "404.html" "index.html" "scripts.js" and "styles.css". Having the same file strucure and file names for all images, code, and models is necessary for the code to work.

# Dynamic 3D Clothes Shopping Carousel

This project aims to create a fully interactive, 3D clothes shopping experience inspired by laundromat clothing carousels. Users will navigate a rotating 3D carousel showcasing clothing models, select items for a closer view, and interact with these models seamlessly.

---

## Project Overview

The current state of the project includes:

- A basic 3D carousel implemented with **Swiper.js** and **Three.js**.
- Support for FBX 3D models, which are dynamically loaded into the carousel and emerging preview area.
- A responsive and immersive interface using CSS animations and transitions.

---

## Current Issues

1. **Model Rendering Issue**: Models do not render on deployment (but work locally). Suspected cause: an outdated FBXLoader or misconfigured paths.
2. **Hosting Challenges**: Deployment via static file servers causes assets (like models and textures) to fail to load. Locally, the project works using the Live Server extension in Visual Studio Code.

---

## Setup and Running the Project

### Prerequisites

1. **Browser Compatibility**: Ensure the browser supports WebGL.
2. **Tools Needed**:

   - [Visual Studio Code](https://code.visualstudio.com/) (or equivalent editor).
   - [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

3. **Dependencies**:
   - **Swiper.js**: Used for carousel animations.
   - **Three.js**: Core library for rendering 3D models.
   - **FBXLoader.js**: Loader for FBX models.
   - **TextureLoader**: For applying textures to models.

### File Structure

Maintain the following structure for proper functionality:

WebApp/
├── 3d Clothing/ # Folder containing all 3D models and textures
│ ├── BJORN_Vibrance_Collec_1121162927_fbx/
│ │ ├── model.mtl # Material Library file
│ │ ├── BJORN_Vibrance_Collec_1121162927.fbx # Model file
│ │ ├── BJORN_Vibrance_Collec_1121162927.png # Texture file
│ ├── Bjorn_T_Shirt_Design_1121162324_fbx/
│ │ ├── model.mtl # Material Library file
│ │ ├── Bjorn_T_Shirt_Design_1121162324.fbx # Model file
│ │ ├── Bjorn_T_Shirt_Design_1121162324.png # Texture file
├── Clothing Items/
│ ├── e82c61b5-964b-43fd-8627-7c728f296889.webp # Image file
│ ├── e2dd8f49-5992-481e-840d-88043d98ca26.webp # Image file
│ ├── cda4d3c2-1076-4f5e-b139-5e2e4c1e01ae.webp # Image file
│ ├── c071203a-d829-49ec-a07a-44cf2bfff025.webp # Image file
│ ├── 1007dc4f-8954-4fc4-b9a5-0fdcd189b5a7.webp # Image file
│ ├── 680a6310-d63f-4334-8cab-f23505b6b97c.webp # Image file
│ ├── 04abc257-6b92-4ad4-8bed-9c62674ce9c3.webp # Image file
│ ├── 2c184f94-90db-40ae-8d90-d88b024d5b3e.webp # Image file
├── public/
│ ├── index.html
│ ├── 404.html
│ ├── styles.css
│ ├── scripts.js
├── design.txt
├── ReadMe.md
└── firebase.json

### Running Locally

1. Open the project folder in Visual Studio Code.
2. Right-click on `index.html` and select **Open with Live Server**.

---

## Current Key Features

### 1. 3D Carousel

- Built with Swiper.js.
- Each slide previews a 3D clothing model in real time.

### 2. Emerging Model Display

- The central model updates dynamically as the carousel rotates.

### 3. Animation and Interaction

- Smooth transitions for immersive navigation.
- Mousewheel scrolling integrated with carousel movement.

---

## Development Notes

### Code Files Overview

1. **`index.html`**:

   - Structure of the carousel and model containers.
   - Links to external libraries and styles.

2. **`scripts.js`**:

   - Initializes the carousel and loads 3D models dynamically.
   - Functions:
     - `initModelPreviews()`: Sets up previews for each slide.
     - `loadModelPreview()`: Handles the rendering of individual model previews.
     - `updateEmergingModel()`: Updates the main display for the emerging model.

3. **`styles.css`**:

   - Adds responsive design, perspective, and 3D effects.
   - Controls the spotlight effect and transitions.

4. **`404.html`**:
   - Custom error page for missing resources.

### Troubleshooting

#### Common Errors

1. **Models Not Loading**:

   - Ensure the `FBXLoader.js` is compatible with the current Three.js version.
   - Verify the file paths to models and textures in `scripts.js`.
   - Check the browser console for errors during model loading.

2. **Hosting Issues**:
   - Static hosting services may block assets due to CORS. Use services like Firebase Hosting with proper configurations.

---

## Future Improvements

1. **3d Support**:
   --Add support for 3d models

2. **UI Enhancements**:

   - Add hover/click effects for better interactivity.
   - Include metadata (e.g., clothing name, price) alongside models.

3. **E-Commerce Features**:

   - Add functionality to "Add to Cart" or "Buy Now."
   - Integrate user accounts for saved preferences.

4. **Performance Optimizations**:
   - Use compressed textures to reduce model loading times.
   - Preload assets for smoother transitions.

---

## Contributing

To continue development:

1. Fork the repository and create feature branches.
2. Document changes clearly in the commit messages.
3. Test changes thoroughly on both local and deployed environments.

---

https://www.figma.com/board/NwENN1ZDX5iO4JxkhEAH8Q/Untitled?node-id=0-1&t=XSitXl0VVhahA9oD-1


