export const sketch = (p, settings) => {
  
  let rowLength = 25;
  let colLength = 25;
  let canvasPx = settings.canvasWidth;
  let backgroundLayer, drawingLayer;
  //tools
  let colorPicker;
  //default states
  let currentTool = "pen";
  let penSize = 1;
  let penTip = pen;
  let currentBackground = "background1";
  let currentColor = "#333333";

  p.setup = () => {
    p.createCanvas(canvasPx,canvasPx);
    p.pixelDensity(1);
    backgroundLayer = p.createGraphics(canvasPx, canvasPx);
    drawingLayer = p.createGraphics(canvasPx, canvasPx);
    
    populatePixel();
    showBackground(currentBackground);
  };

  p.draw = () => {
    p.image(backgroundLayer, 0, 0);
    p.image(drawingLayer, 0, 0);

    if (p.mouseIsPressed) {
      if(currentTool === "pen") {
        displayPixel(p.mouseX, p.mouseY, currentColor);
      } else if (currentTool === "eraser") {
        erasePixel(p.mouseX, p.mouseY);
      }
    }
  };

  const calculatePixelSize = () => {
    const maxRowsCols = Math.max(rowLength, colLength);
    const cellSize = Math.min(canvasPx / rowLength, canvasPx / colLength);
  
    // Ensure that the cell size is an even division of the canvas dimensions
    if (canvasPx % cellSize !== 0 || canvasPx / cellSize !== maxRowsCols) {
      return Math.floor(Math.min(canvasPx / rowLength, canvasPx / colLength));
    }
  
    return cellSize;
  };

  const populatePixel = () => {
    let pixelSize = calculatePixelSize();
    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        let x = col * pixelSize;
        let y = row * pixelSize;
        drawingLayer.noFill();
        drawingLayer.noStroke();
        drawingLayer.rect(x, y, pixelSize, pixelSize);
      }
    }
  };

  const displayPixel = (x, y, pixelColor) => {
    let pixelSize = calculatePixelSize();
    pixelSize *= penSize;
    let col = Math.floor(x / pixelSize);
    let row = Math.floor(y / pixelSize);

    if (col >= colLength || row >= rowLength) return;
    
    // Adjusted calculation for top left corner
    var pixelX = col * pixelSize;
    var pixelY = row * pixelSize;

    drawingLayer.noStroke();
    drawingLayer.fill(pixelColor);
    drawingLayer.noErase();

    if (currentTool === "pen") {
        if (penTip === "circle") {
            let centerX = pixelX + pixelSize / 2;
            let centerY = pixelY + pixelSize / 2;
            drawingLayer.ellipse(centerX, centerY, pixelSize, pixelSize);
        } else if (penTip === "hamzaS") {
            drawHamza(pixelX, pixelY, pixelSize, "S");
        } else if (penTip === "hamzaE") {
            drawHamza(pixelX, pixelY, pixelSize, "E");
        } else if (penTip === "hamzaN") {
            drawHamza(pixelX, pixelY, pixelSize, "N");
        } else if (penTip === "hamzaW") {
            drawHamza(pixelX, pixelY, pixelSize, "W");
        } else {
            // Rectangle is the default pen tip
            drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
        }
    }
  };

  
  const erasePixel = (x, y) => {
    let pixelSize = calculatePixelSize();
    pixelSize *= penSize;
    let col = Math.floor(x / pixelSize);
    let row = Math.floor(y / pixelSize);
    let pixelX = col * pixelSize;
    let pixelY = row * pixelSize;
  
    drawingLayer.noStroke();
    drawingLayer.erase();
    drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
  }

  const drawHamza = (x, y, pixelSize, direction) => {
    drawingLayer.beginShape();
    if (direction === "S") {
      drawingLayer.vertex(x, y);
      drawingLayer.vertex(x + pixelSize, y);
      drawingLayer.vertex(x + pixelSize, y + pixelSize);
      drawingLayer.vertex(x , y + pixelSize);
      drawingLayer.vertex(x , y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize / 3);
      drawingLayer.vertex(x, y + pixelSize / 3);
    } else if (direction === "E") {
      drawingLayer.vertex(x, y);
      drawingLayer.vertex(x + pixelSize, y);
      drawingLayer.vertex(x + pixelSize, y + pixelSize);
      drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize);
      drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize / 3);
      drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
      drawingLayer.vertex(x + pixelSize / 3, y + pixelSize);
      drawingLayer.vertex(x, y + pixelSize);
    } else if (direction === "N") {
      drawingLayer.vertex(x, y);
      drawingLayer.vertex(x + pixelSize, y);
      drawingLayer.vertex(x + pixelSize, y + pixelSize / 3);
      drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
      drawingLayer.vertex(x + pixelSize / 3, y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize, y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize, y + pixelSize);
      drawingLayer.vertex(x, y + pixelSize);
    } else if (direction === "W") {
      drawingLayer.vertex(x, y);
      drawingLayer.vertex(x + pixelSize, y);
      drawingLayer.vertex(x + pixelSize / 3, y);
      drawingLayer.vertex(x + pixelSize / 3, y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize * 2 / 3 , y + pixelSize * 2 / 3);
      drawingLayer.vertex(x + pixelSize * 2 / 3 , y );
      drawingLayer.vertex(x + pixelSize, y );
      drawingLayer.vertex(x + pixelSize, y + pixelSize );
      drawingLayer.vertex(x, y + pixelSize);
    }


    drawingLayer.endShape(p.CLOSE);
  }

  const showBackground = (selectedBg) => {
    let pixelSize = calculatePixelSize();
    const layer = backgroundLayer;
    layer.noStroke();

    if (selectedBg === "background1") {
      layer.clear();
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          if ((i / pixelSize + j / pixelSize) % 2 === 0) {
            layer.fill(200);
          } else {
            layer.fill(255);
          }
          layer.square(i, j, pixelSize);
        }
      }
    } else if (selectedBg === "background2") {
      layer.clear();
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          const colIndex = Math.floor(i / pixelSize);
          const rowIndex = Math.floor(j / pixelSize);
          const color = p.color(200);
      
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
      
          layer.rect(i, j, pixelSize, pixelSize);
        }
      }
    } else if (selectedBg === "background3") {
        layer.clear();
        const grayColor = layer.color(200);
        const whiteColor = layer.color(255);

        for (let i = 0; i < layer.width; i += pixelSize) {
          for (let j = 0; j < layer.height; j += pixelSize) {
            const colIndex = Math.floor(i / pixelSize);
            const rowIndex = Math.floor(j / pixelSize);

            if ((colIndex % 3 === 0 || colIndex % 3 === 1) && (rowIndex % 3 === 0 || rowIndex % 3 === 1)) {
              layer.fill(grayColor);
            } else if (colIndex % 3 === 2 && rowIndex % 3 === 2) {
              layer.fill(whiteColor);
            } else {
              layer.fill(whiteColor);
            }

            layer.square(i, j, pixelSize);
          }
        }
    } else if (selectedBg === "grid") {
      layer.clear();
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          layer.strokeWeight(1);
          layer.stroke(0);
          layer.fill(255);
          layer.square(i, j, pixelSize);
        }
      }
    } else if (selectedBg === "dot") {
      layer.clear();
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          layer.fill(255); // Set the fill color to white
          layer.square(i, j, pixelSize); // Draw a white square to represent the pixel
    
          layer.fill(200); // Set the fill color to light gray
          let centerX = i + pixelSize / 2;
          let centerY = j + pixelSize / 2;
          let circleSize = pixelSize / 4;
          layer.ellipse(centerX, centerY, circleSize, circleSize);
        }
      }
    }
    
  }

  const clearDrawing = () => {
    drawingLayer.clear();
    p.clear();
    showBackground(currentBackground);
  };

  const downloadImg = () => {
    backgroundLayer.clear();
    p.clear();
    p.image(drawingLayer, 0, 0);
    const downloading = setTimeout(
      p.saveCanvas("kufix", "png"),500
    )
    showBackground(currentBackground);
  }

  const setTool = (tool) => {
    currentTool = tool;
    if (currentTool === "pen") {
      p.cursor(p.CROSS);
    } else if (currentTool === "eraser") {
      p.cursor(p.HAND);
    } else {
      p.cursor(p.ARROW);
    }
  }

  const setPentip = (pentip) => {
    penTip = pentip;
  }

  const setBackground = (bg) => {
    currentBackground = bg;
    showBackground(currentBackground);
  }

  const setPensize = (pensize) => {
    penSize = pensize;
  }

  const setColor = (color) => {
    currentColor = color;
  }

  p.setTool = setTool;
  p.clearDrawing = clearDrawing;
  p.setPentip = setPentip;
  p.setBackground = setBackground;
  p.downloadImage = downloadImg;
  p.setPensize = setPensize;
  p.setColor = setColor;
};
