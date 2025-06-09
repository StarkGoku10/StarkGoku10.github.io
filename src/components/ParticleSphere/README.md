# ParticleSphere Component

This component renders a 3D particle sphere animation.

## Overview

The animation is self-contained and implemented using the HTML5 Canvas API within a React functional component. It simulates particles being emitted from a central point, forming a spherical cloud, and then fading out over time.

## Measured Parameters

The following parameters were measured from the source GIF and implemented in the component. They can be found and tuned at the top of the `ParticleSphere.tsx` file.

-   `PARTICLE_COUNT`: Total number of particles in the simulation.
    -   **Value:** `1500`
-   `PARTICLE_LIFESPAN`: The base lifetime of a particle in frames (at 60fps).
    -   **Value:** `120`
-   `EMISSION_RATE`: Number of new particles to emit per frame until the `PARTICLE_COUNT` is reached.
    -   **Value:** `10`
-   `VELOCITY_FACTOR`: A multiplier for the initial random velocity of particles.
    -   **Value:** `0.5`
-   `MIN_RADIUS` / `MAX_RADIUS`: The minimum and maximum size of the particles.
    -   **Value:** `0.5` / `1.5`
-   `SPHERE_RADIUS`: The radius of the sphere from which particles are emitted.
    -   **Value:** `250`
-   `DRAG_FORCE`: The easing factor applied to particle velocity each frame, simulating friction. A value closer to 1 means less friction.
    -   **Value:** `0.98`
-   `PARTICLE_COLOR`: The color of the particles in hex format.
    -   **Value:** `'#21dfE6'`

## Usage

Import the component and include it in your JSX. It will automatically fill its parent container.

```jsx
import ParticleSphere from './components/ParticleSphere/ParticleSphere';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ParticleSphere />
    </div>
  );
} 