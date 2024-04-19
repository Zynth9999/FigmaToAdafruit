figma.showUI(__html__);
figma.ui.resize(400, 385);
const defaultRed = 0;
const defaultGreen = 0;
const defaultBlue = 0;
// MADE BY ZYNTH WITH <3
// Reload
let cornerRadius;
figma.on("selectionchange", () => { 
  const selection = figma.currentPage.selection;
  const selectedNode = selection[0];
  const node = selectedNode.type;
    
  figma.ui.postMessage({ type: 'selectionchange',node });
});
figma.ui.onmessage = msg => {
  if (msg.type === 'getProperties') {
    const selection = figma.currentPage.selection;
    const selectedNode = selection[0];
    if (selection.length > 0) {
      if (selectedNode.type === 'RECTANGLE') {
        const selectionColors = figma.getSelectionColors();
        let r = defaultRed;
        let g = defaultGreen;
        let b = defaultBlue;

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

        cornerRadius = selectedNode.cornerRadius;

        const x = selectedNode.x;
        const y = selectedNode.y;
        const width = selectedNode.width;
        const height = selectedNode.height;

        figma.ui.postMessage({ type: 'properties', x, y, width, height, r, g, b, cornerRadius, objtype: 'RECTANGLE' });
      } else if (selectedNode.type === 'TEXT') {
        const selectionColors = figma.getSelectionColors();
        let r = defaultRed;
        let g = defaultGreen;
        let b = defaultBlue;

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

        const fontSize = Math.round(Number(selectedNode.fontSize) / 7); // Explicitly cast to number and round
        const text = selectedNode.characters;
        const x = selectedNode.x;
        const y = selectedNode.y;

        figma.ui.postMessage({ type: 'textProperties', x, y, fontSize, r, g, b, text, objtype: 'TEXT' });
      } else {
        figma.ui.postMessage({ type: 'error', message: 'Selected object type not supported!' });
      }
    } else {
      figma.ui.postMessage({ type: 'error', message: 'You need to select an object!' });
    }
  }
};
