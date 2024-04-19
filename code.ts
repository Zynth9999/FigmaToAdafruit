figma.showUI(__html__);
figma.ui.resize(400,500);
const defaultRed = 0;
const defaultGreen = 0;
const defaultBlue = 0;

// Reload
figma.ui.onmessage = msg => {
  if (msg.type === 'getProperties') {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      const selectedObject = selection[0];

      // Get color properties
      const selectionColors = figma.getSelectionColors();
      let r = defaultRed;
      let g = defaultGreen;
      let b = defaultBlue;
      if (selectionColors !== null) {
        const paints = selectionColors.paints;
        // Iterate over each paint in the selection
        paints.forEach(paint => {
          // Check if the paint is of type "SOLID" (which contains RGB values)
          if (paint.type === 'SOLID') {
            // Extract RGB values
            r = paint.color.r * 255; // Multiply by 255 to get value in [0, 255] range
            g = paint.color.g * 255;
            b = paint.color.b * 255;
          }
        });
      }

      // Get position and size properties
      const x = selectedObject.x;
      const y = selectedObject.y;
      const width = selectedObject.width;
      const height = selectedObject.height;

      figma.ui.postMessage({ type: 'properties', x, y, width, height, r, g, b, red: defaultRed });
    } else {
      figma.ui.postMessage({ type: 'error', message: 'You need to select an object!' });
    }
  }
};
