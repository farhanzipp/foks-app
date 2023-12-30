export const canvas = (p) => {
  const pixelSize = 16;
  const rowLength = 30;
  const colLength = 30;
  const canvasPx = 512;
  let backgroundLayer, drawingLayer;

  p.setup = () => {
    p.createCanvas(canvasPx, canvasPx);
    backgroundLayer = p.createGraphics(canvasPx, canvasPx);
    drawingLayer = p.createGraphics(canvasPx, canvasPx);
    displayBackground(backgroundLayer);
    displayGrid(drawingLayer);
  };

  p.draw = () => {
    p.image(backgroundLayer, 0, 0); // Draw backgroundLayer
    p.image(drawingLayer, 0, 0); // Draw drawingLayer

    if (p.mouseIsPressed) {
      var color = p.mouseButton === p.LEFT ? "black": "transparent";
      displayPixel(p.mouseX, p.mouseY, color);
    }
  };

  const displayGrid = (layer) => {
    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        let x = col * pixelSize;
        let y = row * pixelSize;
        layer.fill(255, 0);
        layer.noStroke();
        layer.rect(x, y, pixelSize, pixelSize);
      }
    }
  };

  const displayBackground = (layer) => {
    layer.background(255);
    layer.strokeWeight(0);

    for (let i = 0; i < layer.width; i += pixelSize) {
      for (let j = 0; j < layer.height; j += pixelSize) {
        if ((i / pixelSize + j / pixelSize) % 2 === 0) {
          layer.fill(200); // Gray
        } else {
          layer.fill(255); // White
        }
        layer.square(i, j, pixelSize);
      }
    }
  };

  const displayBackground2 = (layer) => {
    layer.background(255);
    layer.strokeWeight(0);
  
    for (let i = 0; i < layer.width; i += pixelSize) {
      for (let j = 0; j < layer.height; j += pixelSize) {
        const colIndex = Math.floor(i / pixelSize);
        const rowIndex = Math.floor(j / pixelSize);
        const transparentPink = p.color(255, 192, 203);
        
        if (colIndex % 2 === 0 || rowIndex % 2 === 0) {
          layer.fill(transparentPink.levels[0], transparentPink.levels[1], transparentPink.levels[2], 128); // Gray
        } else {
          layer.fill(255); // White
        }
  
        layer.square(i, j, pixelSize);
      }
    }
  };
  
  
  

  const displayPixel = (x, y, color) => {
    let col = Math.floor(x / pixelSize);
    let row = Math.floor(y / pixelSize);
    if (col >= colLength || row >= rowLength) return;

    // Determine the cell's left upper-corner x and y coordinates
    var pixelX = col * pixelSize;
    var pixelY = row * pixelSize;

    drawingLayer.noStroke();
    // Check if the color is 'transparent'
    if (color !== 'transparent') {
      drawingLayer.fill(color);
      drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
    } else {
      drawingLayer.clear(pixelX, pixelY, pixelSize, pixelSize);
    }
  };
};
