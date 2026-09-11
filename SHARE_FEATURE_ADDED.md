# SNS share integration

Added to the user's latest WEREWOLF TYPE project:
- 1080x1350 result-card image generation
- Web Share API image/text sharing on supported mobile browsers
- PNG result-card download
- X share intent
- 2:3 character display adjustment to reduce aggressive cropping

Validation:
- TypeScript project check (`tsc -b`) passed in the Linux workspace.
- Vite bundling could not be completed in this workspace because the uploaded `node_modules` contains Windows-native packages. Reinstalling dependencies on the target machine resolves the platform-specific bindings.
