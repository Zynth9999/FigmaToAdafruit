figma.showUI(__html__);
figma.ui.resize(400, 385);
const defaultRed = 0;
const defaultGreen = 0;
const defaultBlue = 0;
// MADE BY ZYNTH WITH <3
// Reload
let cornerRadius;
figma.ui.onmessage = msg => {
  if (msg.type === 'getProperties') {
    const selection = figma.currentPage.selection;
    const selectedNode = selection[0];
    if (selection.length > 0) {
      const selectedObject = selection[0];

      if (selectedNode.type === 'RECTANGLE') {
        const selectionColors = figma.getSelectionColors();
        let r = defaultRed;
        let g = defaultGreen;
        let b = defaultBlue;
        
        cornerRadius = selectedNode.cornerRadius;

        if (selectionColors !== null) {
          const paints = selectionColors.paints;
          paints.forEach(paint => {
            if (paint.type === 'SOLID') {
              r = paint.color.r * 255;
              g = paint.color.g * 255;
              b = paint.color.b * 255;
            }
          });
        }

        const x = selectedObject.x;
        const y = selectedObject.y;
        const width = selectedObject.width;
        const height = selectedObject.height;

        figma.ui.postMessage({ type: 'properties', x, y, width, height, r, g, b, cornerRadius });
      } else if (selectedNode.type === 'TEXT') {
        const fontSize = selectedNode.fontSize / 7; // Divide by 7 and round
        const textColor = selectedNode.fills[0].color;
        const r = textColor.r * 255;
        const g = textColor.g * 255;
        const b = textColor.b * 255;
        const text = selectedNode.characters;
        const x = selectedObject.x;
        const y = selectedObject.y;

        figma.ui.postMessage({ type: 'textProperties', x, y, fontSize, r, g, b, text });
      } else {
        figma.ui.postMessage({ type: 'error', message: 'Selected object type not supported!' });
      }
    } else {
      figma.ui.postMessage({ type: 'error', message: 'You need to select an object!' });
    }
  }
};
