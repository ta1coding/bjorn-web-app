# Simplified Technical Specification

**Overview**

This technical specification focuses on creating an immersive and interactive online clothing browsing experience. The goal is to prioritize essential visual components while removing all purchasing and inventory management functionalities. The system will allow users to explore clothing items in a creative way without handling any transactional processes.

---
## P0
## 1. SiteManager

Manages the overall state of the website, scene transitions, and user interactions.

- **Variables**
  - `currentScene: String` - Indicates the current scene (`"Storefront"`, `"StoreInterior"`, `"ChangingRoom"`).
  - `clothingItems: Array<ClothingItem>` - List of all available clothing items.
  - `categories: Array<String>` - Available clothing categories for filtering.

- **Methods**
  - `initializeSite()`
    - **Behavior**: Loads initial assets, sets `currentScene` to `"Storefront"`, and initializes the ambient sound manager.
  - `navigateToScene(sceneName: String)`
    - **Behavior**: Handles transitions between scenes with appropriate animations and ensures all necessary assets for the target scene are loaded.
  - `handleUserInput(input: UserInput)`
    - **Behavior**: Processes user inputs (clicks, scrolls) and triggers corresponding actions based on the current scene.
  - `loadClothingItems()`
    - **Behavior**: Fetches clothing items from a data source and populates `clothingItems`.
  - `filterClothingItems(category: String)`
    - **Behavior**: Filters and displays clothing items based on the selected category.

---
## P2
## 2. Storefront

Represents the initial scene with the gloomy storefront, including visual effects and user interactions.

- **Variables**
  - `background: SceneObject` - Visual representation of the storefront.
  - `door: InteractiveObject` - Clickable door to enter the store.


- **Methods**
  - `render()`
    - **Behavior**: Renders the storefront scene with all visual elements and effects.
  - `handleClick(position: Point)`
    - **Behavior**: Detects if the door is clicked and triggers the entrance animation by invoking `SiteManager.navigateToScene("StoreInterior")`.
  - `update(timeDelta: Number)`
    - **Behavior**: Updates animations and pedestrian movements based on the elapsed time.
  - `displayLabels()`
    - **Behavior**: Shows guidance labels like "Click to Enter the Store" to inform the user of interactive elements.

---
## P3
## 3. CameraController

Manages camera movements and transitions between scenes to create an immersive experience.

- **Variables**
  - `currentPosition: Point3D` - Camera's current position in 3D space.
  - `targetPosition: Point3D` - Destination position for camera movements.
  - `movementDuration: Number` - Duration of the camera movement animation.
  - `isMoving: Boolean` - Indicates if the camera is currently moving.
  - `effects: CameraEffects` - Special effects like shake or wobble to simulate walking.

- **Methods**
  - `moveTo(position: Point3D, options: MoveOptions)`
    - **Behavior**: Initiates camera movement towards a target position with optional effects (e.g., shake, ease-in-out).
  - `update(timeDelta: Number)`
    - **Behavior**: Smoothly updates camera position and applies movement effects during transitions.
  - `applyEffect(effect: String)`
    - **Behavior**: Applies specified camera effects during movement, such as simulating walking motion.
  - `resetPosition()`
    - **Behavior**: Resets the camera to its default position and clears any applied effects.


---
## P0
## 5. StoreInterior

Represents the interior scene of the store with the clothing carousel and interactive elements.

- **Variables**
## P1
  - `carousel: ClothingCarousel` - Manages the rotating display of clothing items.
  ## P3
  - `ambientAnimations: Array<Animation>` - Interior effects like dynamic lighting.
  - `instructionsLabel: Label` - Guidance text for user interactions.

- **Methods**
 - switchClothes(input userInput)
  ** Behavio**: switches clothes to view them. For the start, just use left and right keys.
  - `render()`
    - **Behavior**: Renders the store interior and its elements, including the carousel and ambient animations.
## P1
  - `handleScroll(deltaY: Number)`
    - **Behavior**: Rotates the carousel based on user scroll input to simulate browsing items.
  - `handleClick(position: Point)`
    - **Behavior**: Checks if a clothing item is clicked and triggers the changing room scene via `SiteManager.navigateToScene("ChangingRoom")`.
  - `update(timeDelta: Number)`
    - **Behavior**: Updates animations and interactive elements within the store interior.
  - `displayInstructions()`
    - **Behavior**: Shows instructions like "Scroll to Browse Items" to assist the user.

---

## 6. ClothingCarousel

Manages the movement and display of clothing items on a conveyor-like carousel within the store interior.

- **Variables**
  - `items: Array<ClothingItem>` - Clothing items displayed on the carousel.
  - `currentAngle: Number` - The current rotation angle of the carousel.
  - `rotationSpeed: Number` - Speed at which the carousel rotates based on user input.
  - `carouselPath: Path3D` - The predefined path defining the carousel's movement.
  - `swingEffectEnabled: Boolean` - Enables swing animation for items during turns.

- **Methods**
  - `rotateCarousel(direction: String, amount: Number)`
    - **Behavior**: Rotates the carousel in the specified direction (left or right) by a certain amount.
  - `update(timeDelta: Number)`
    - **Behavior**: Updates the position of clothing items on the carousel and applies swing effects during rotation.
  - `applySwingEffect()`
    - **Behavior**: Animates items to swing outward on turns, enhancing the visual appeal.
  - `loadItems(items: Array<ClothingItem>)`
    - **Behavior**: Loads clothing items onto the carousel from the provided list.

---

## 7. ClothingItem

Represents an individual clothing item available for viewing.

- **Variables**
  - `id: String` - Unique identifier.
  - `name: String` - Item name.
  - `category: String` - Category classification.
  - `description: String` - Detailed description.
  - `model3D: 3d model of file` - 3D representation of the item.
  - `images: Array<Image>` - Alternative images for fallback or additional views.

- **Methods**
  - `displayDetails()`
    - **Behavior**: Shows item details such as name and description when the item is focused or selected.
  - `loadModel()`
    - **Behavior**: Loads the 3D model for viewing in the changing room.
  - `select()`
    - **Behavior**: Triggers actions when the item is clicked, such as transitioning to the changing room scene.

---

## 8. ChangingRoom

Simulates a changing room where users can view selected items on a 3D model or mannequin.

- **Variables**
  - `curtain: AnimatedObject` - Curtain animation covering the entrance during loading.
  - `modelViewer: ModelViewer` - Allows interaction with the 3D model wearing the selected item.
  - `selectedItem: ClothingItem` - The item being viewed.

- **Methods**
  - `enterChangingRoom(item: ClothingItem)`
    - **Behavior**: Prepares the scene with the selected clothing item and starts the loading process.
  - `startLoading()`
    - **Behavior**: Displays the loading indicator while the 3D model and assets are loading.
  - `revealModel()`
    - **Behavior**: Animates the curtain opening to display the 3D model once loading is complete.
  - `handleUserRotation(input: UserInput)`
    - **Behavior**: Enables the user to rotate the model view for a 360° inspection.
  - `toggleClothingOnlyView()`
    - **Behavior**: Allows users to switch between viewing the clothing on a mannequin or viewing the clothing item alone.

---

## 9. ModelViewer

Allows users to view and interact with 3D models of clothing on a mannequin or as standalone items.

- **Variables**
  - `model: 3d model of a mannequin` - The mannequin or stand with the clothing item.
  - `rotationAngle: float` - Current rotation around the model.
  - `controlsEnabled: Boolean` - Toggles user interaction capability.

- **Methods**
  - `rotateModel(direction: String, amount: Number)`
    - **Behavior**: Rotates the model based on user input (e.g., mouse drag or touch gesture).
  - `resetView()`
    - **Behavior**: Resets rotation and zoom to default settings for consistent user experience.
  - `toggleControls(state: Boolean)`
    - **Behavior**: Enables or disables user controls, useful during animations or transitions.

---


---

**Class Dependencies and Prioritization**

To ensure a clear programming roadmap and efficient development, the classes are prioritized based on their dependencies:

1. **SiteManager**
   - **Dependencies**: None initially but interacts with all other classes.
   - **Priority**: High. Acts as the central controller for the application flow and must be developed first.

2. **UserInterface**
   - **Dependencies**: None directly but used across all scenes.
   - **Priority**: High. Essential for user guidance and interactions.

3. **ClothingItem**
   - **Dependencies**: Data source for clothing items.
   - **Priority**: High. Fundamental data model used by multiple classes.

4. **Storefront**
   - **Dependencies**: CameraController, CharacterController, AmbientSoundManager.
   - **Priority**: High. The first user-facing scene that sets the tone for the experience.

5. **CameraController**
   - **Dependencies**: Used by Storefront and other scenes.
   - **Priority**: High. Essential for scene transitions and movement effects.

6. **CharacterController**
   - **Dependencies**: Storefront.
   - **Priority**: Medium. Adds dynamic elements to the storefront but not critical for initial functionality.

7. **AmbientSoundManager**
   - **Dependencies**: Used across all scenes.
   - **Priority**: Medium. Enhances user experience but core functionality can proceed without it.

8. **StoreInterior**
   - **Dependencies**: ClothingCarousel, CategoryManager, UserInterface.
   - **Priority**: High. The main browsing area for clothing items.

9. **ClothingCarousel**
   - **Dependencies**: ClothingItem.
   - **Priority**: High. Central to the interactive browsing experience within the store.

10. **CategoryManager**
    - **Dependencies**: StoreInterior, ClothingCarousel.
    - **Priority**: Medium. Adds filtering functionality but not essential for initial browsing capability.

11. **ChangingRoom**
    - **Dependencies**: ModelViewer, ClothingItem, UserInterface.
    - **Priority**: Medium. Allows detailed viewing but browsing can function without it initially.

12. **ModelViewer**
    - **Dependencies**: ChangingRoom.
    - **Priority**: Medium. Provides interactivity within the changing room.

13. **LoadingManager**
    - **Dependencies**: Used during asset loading across scenes.
    - **Priority**: Medium. Improves user experience during loading times.

---

**Implementation Notes**

- **Phase 1**: Develop `SiteManager`, `UserInterface`, `ClothingItem`, and `Storefront` along with the `CameraController` to establish the basic application structure and initial scene.
- **Phase 2**: Implement `StoreInterior` and `ClothingCarousel` to enable the core browsing functionality.
- **Phase 3**: Add the `ChangingRoom` and `ModelViewer` for enhanced item inspection.
- **Phase 4**: Integrate `AmbientSoundManager`, `CharacterController`, `CategoryManager`, and `LoadingManager` to enrich the user experience.
- **Testing**: After each phase, thoroughly test the interactions and transitions to ensure smooth functionality.

By focusing on these essential classes and methods, we prioritize critical visual and interactive functionalities. Dependencies are clearly outlined, allowing for a structured and efficient programming sequence. This approach ensures that the most vital components are developed first, providing a solid foundation for the overall user experience.

---

**Conclusion**

This simplified technical specification provides a clear roadmap for developing an immersive online clothing browsing experience focused on visual creativity. By eliminating purchasing and inventory management components, we streamline the development process to concentrate on the interactive and aesthetic aspects that will engage users effectively.
