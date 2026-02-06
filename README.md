# 360° Developer Room

A smooth, immersive 360° developer room built with Three.js. Drag to look around, hover the monitor for developer details, and click the screen to gently zoom in.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Customization

- **Swap room assets:** Replace the placeholder geometries in `src/main.js` with real models or textured meshes.
- **Update monitor content:** Edit the HTML string assigned to `screenContent` in `src/main.js`.
- **Lighting:** Adjust ambient/directional light values or hook the toggle to your own theme system.

## Notes

- The scene uses OrbitControls with damping for smooth navigation.
- The monitor content is rendered via `CSS2DRenderer`, keeping the overlay synced to the 3D scene.
