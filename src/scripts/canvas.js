export const canvas = (p) => {
  const rowLength = 20;
  const colLength = 20;
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

    displayBackground3(backgroundLayer);
    displayGrid(drawingLayer);

    createButtonWithAction("Clear", clearDrawing);
    createButtonWithAction("Pen", () => setTool("Pen"));
    createButtonWithAction("Eraser", () => setTool("Eraser"));
    createColorPickers();
    createSelectBg();
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
  let pixelSize = calculatePixelSize();
  layer.background(255);
  layer.strokeWeight(0);

  for (let i = 0; i < layer.width; i += pixelSize) {
    for (let j = 0; j < layer.height; j += pixelSize) {
      const colIndex = Math.floor(i / pixelSize);
      const rowIndex = Math.floor(j / pixelSize);
      const color = p.color(156, 156, 156);

      if (colIndex % 2 === 1 || rowIndex % 2 === 1) {
        // Darken the color for intersecting lines
        if (colIndex % 2 === 1 && rowIndex % 2 === 1) {
          layer.fill(color.levels[0] - 50, color.levels[1] - 50, color.levels[2] - 50, 128);
        } else {
          layer.fill(color.levels[0], color.levels[0], color.levels[0], 128); // Gray
        }
      } else {
        layer.fill(255);
      }

      layer.square(i, j, pixelSize);
    }
  }
};

const displayBackground3 = (layer) => {
  let pixelSize = calculatePixelSize();
  layer.background(255);
  layer.strokeWeight(1);

  const grayColor = layer.color(156, 156, 156);
  const whiteColor = layer.color(255);

  for (let i = 0; i < layer.width; i += pixelSize) {
    for (let j = 0; j < layer.height; j += pixelSize) {
      const colIndex = Math.floor(i / pixelSize);
      const rowIndex = Math.floor(j / pixelSize);

      if ((colIndex % 3 === 0 || colIndex % 3 === 1) && (rowIndex % 3 === 0 || rowIndex % 3 === 1)) {
        // 2 blocks gray
        layer.fill(grayColor);
      } else if (colIndex % 3 === 2 && rowIndex % 3 === 2) {
        // Intersection block white
        layer.fill(whiteColor);
      } else {
        // 1 block white
        layer.fill(whiteColor);
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

  const createSelectBg = () => {
    let selectBg = p.createSelect();
    selectBg.parent('btn-container');

    selectBg.option('select bg');
    selectBg.option('basic');
    selectBg.option('plus-minus');
    selectBg.option('grid');

    selectBg.selected('select bg');
  }

  const clearDrawing = () => {
      drawingLayer.clear();
      displayGrid(drawingLayer);
  };

  const setTool = (label) => {
    currentTool = label;
    updateCursor();
  }

  const updateCursor = () => {
    if (currentTool === "Pen") {
      p.cursor(p.CROSS);
    } else if (currentTool === "Eraser") {
      p.cursor(p.HAND);
    } else {
      // Default cursor for other tools
      p.cursor(p.ARROW);
    }
  }

  const createColorPickers = () => {
    colorPicker = p.createColorPicker('#000000');
    colorPicker.parent('btn-container');
  }

};
