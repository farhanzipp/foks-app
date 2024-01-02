export const canvas = (p) => {
  const rowLength = 30;
  const colLength = 30;
  const canvasPx = 512;
  let backgroundLayer, drawingLayer;
  let div;
  let colorPicker;
  let currentTool = "Pen";

  p.setup = () => {
    p.createCanvas(canvasPx, canvasPx);
    div = p.createDiv(`<div id="btn-container"></div>`);
    
    backgroundLayer = p.createGraphics(canvasPx, canvasPx);
    drawingLayer = p.createGraphics(canvasPx, canvasPx);

    displayBackground(backgroundLayer);
    displayGrid(drawingLayer);

    createTextBox(currentTool);
    createButtonWithAction("Clear", clearDrawing);
    createButtonWithAction("Pen", () => setTool("Pen"));
    createButtonWithAction("Eraser", () => setTool("Eraser"));
    createColorPickers();
  };

  p.draw = () => {
    p.image(backgroundLayer, 0, 0);
    p.image(drawingLayer, 0, 0);

    if (p.mouseIsPressed) {
      let color = currentTool === "Pen" ? colorPicker.color().toString() : "transparent";
      displayPixel(p.mouseX, p.mouseY, color);
    }
    
  };

  const calculatePixelSize = () => {
    let maxRowsCols = Math.max(rowLength, colLength);
    return Math.floor(canvasPx / maxRowsCols);
  };

  const displayGrid = (layer) => {
    let pixelSize = calculatePixelSize();

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

  const displayPixel = (x, y, color) => {
    let pixelSize = calculatePixelSize();

    let col = Math.floor(x / pixelSize);
    let row = Math.floor(y / pixelSize);
    if (col >= colLength || row >= rowLength) return;

    // Determine the cell's left upper-corner x and y coordinates
    var pixelX = col * pixelSize;
    var pixelY = row * pixelSize;

    drawingLayer.noStroke();

    if (color === "transparent") {
      drawingLayer.image(backgroundLayer, pixelX, pixelY, pixelSize, pixelSize, pixelX, pixelY, pixelSize, pixelSize);
    } else {
        drawingLayer.fill(color);
        drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
    }
  };

  const displayBackground = (layer) => {
    let pixelSize = calculatePixelSize();
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

  const createButtonWithAction = (title, buttonPressedAction) => {
      let button = p.createButton(title);
      button.parent('btn-container');
      button.id(title);
      button.mousePressed(buttonPressedAction);
  };

  const clearDrawing = () => {
      drawingLayer.clear();
      displayGrid(drawingLayer);
  };

  const setTool = (label) => {
    currentTool=label;
  }

  const createColorPickers = () => {
    colorPicker = p.createColorPicker('#000000');
    colorPicker.parent('btn-container');
  }

  const createTextBox = (title) => {
    let button = p.createButton(title);
    button.parent('btn-container');
  }
  

};
