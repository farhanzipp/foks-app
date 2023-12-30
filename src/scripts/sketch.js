// p5-sketch.js
export const sketch = (p) => {
  let backgroundLayer, drawingLayer;
  const cellSize = 20;

  let isMousePressed = false;

  let clearButton, eraserButton;

  p.setup = () => {
    p.createCanvas(400, 400);
    backgroundLayer = p.createGraphics(400, 400);
    drawingLayer = p.createGraphics(400, 400);

    drawBackground(backgroundLayer);

    // Create buttons
    clearButton = createButton('Clear Drawing', 10, p.height + 100);
    eraserButton = createButton('Eraser', 120, p.height + 100);
  };

  p.draw = () => {
    p.background(255);

    p.image(backgroundLayer, 0, 0);
    p.image(drawingLayer, 0, 0);
    drawCells(drawingLayer);
    showCanvasBorder();
  };

  p.mousePressed = () => {
    isMousePressed = true;
    drawOnDrag();
  };

  p.mouseReleased = () => {
    isMousePressed = false;
  };

  p.mouseDragged = () => {
    if (isMousePressed) {
      drawOnDrag();
    }
  };

  const showCanvasBorder = () => {
    p.stroke(0);
    p.strokeWeight(5);
    p.noFill();
    p.rect(0, 0, p.width, p.height);
  };

  const drawBackground = (layer) => {
    layer.background(255);
    layer.strokeWeight(0);

    for (let i = 0; i < layer.width; i += cellSize) {
      for (let j = 0; j < layer.height; j += cellSize) {
        if ((i / cellSize + j / cellSize) % 2 === 0) {
          layer.fill(200); // Gray
        } else {
          layer.fill(255); // White
        }
        layer.square(i, j, cellSize);
      }
    }
  };

  const drawCells = (layer) => {
    layer.noStroke();

    for (let i = 0; i < layer.width; i += cellSize) {
      for (let j = 0; j < layer.height; j += cellSize) {
        layer.fill(255, 0);
        layer.square(i, j, cellSize);
      }
    }
  };

  const fillCell = (layer, x, y, fillColor) => {
    const snappedX = snap(x);
    const snappedY = snap(y);
    layer.fill(fillColor);
    layer.square(snappedX, snappedY, cellSize);
  };

  const drawOnDrag = () => {
    const fillColor = (p.mouseButton === p.RIGHT) ? p.color(255, 0) : p.color(0);
    fillCell(drawingLayer, p.mouseX, p.mouseY, fillColor);
  };

  const snap = (coord) => {
    return Math.floor(coord / cellSize) * cellSize;
  };

  const createButton = (label, x, y) => {
    const button = p.createButton(label);
    button.position(x, y);
    button.size(100, 40);
    button.mousePressed(() => handleButtonClick(label));
    return button;
  };

  const handleButtonClick = (buttonLabel) => {
    switch (buttonLabel) {
      case 'Clear Drawing':
        clearDrawing();
        break;
      case 'Eraser':
        // Use transparent color for eraser
        drawOnDrag(); // Simulate erasing the entire canvas
        break;
      // Add more cases for additional buttons if needed
    }
  };

  const clearDrawing = () => {
    drawingLayer.clear();
  };
};
