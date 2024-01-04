export const canvas = (p) => {
  let rowLength = 20;
  let colLength = 20;
  const canvasPx = 500;
  let backgroundLayer, drawingLayer;
  let div;

  let colorPicker;
  let selectBg;
  let sliderPenSize;

  let inputPixelLength = 30;
  let currentTool = "pen";
  let currentBackground = "background1";
  let penSize = 1;
  

  p.setup = () => {
    p.createCanvas(canvasPx, canvasPx);
    div = p.createDiv(`<div id="btn-container"></div>`);
    
    backgroundLayer = p.createGraphics(canvasPx, canvasPx);
    drawingLayer = p.createGraphics(canvasPx, canvasPx);
    
    populatePixel(drawingLayer);
    showBackground(currentBackground);

    createButtonWithAction("Clear", clearDrawing);
    createButtonWithAction("Pen", () => setTool("pen"));
    createButtonWithAction("Eraser", () => setTool("eraser"));
    createColorPickers();
    createSelectBg();
    createSliderPenSize();
    createButtonWithAction("Download", downloadImg);
    createButtonWithAction("bg clear", toggleBackground);
    // createInputPixelLength();
  };

  p.draw = () => {
    p.image(backgroundLayer, 0, 0);
    p.image(drawingLayer, 0, 0);

    if (p.mouseIsPressed) {
      let pixelColor;
      if(currentTool === "pen") {
        pixelColor = colorPicker.color();
      } else if (currentTool === "eraser") {
        pixelColor = p.color(255, 255, 255);
      }
      displayPixel(p.mouseX, p.mouseY, pixelColor);
    }

  };

  const calculatePixelSize = () => {
    let maxRowsCols = Math.max(rowLength, colLength);
    return Math.floor(canvasPx / maxRowsCols);
  };

  const populatePixel = (layer) => {
    let pixelSize = calculatePixelSize();
    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        let x = col * pixelSize;
        let y = row * pixelSize;
        layer.noFill();
        layer.noStroke();
        layer.rect(x, y, pixelSize, pixelSize);
      }
    }
  };

  const displayPixel = (x, y, pixelColor) => {
    let pixelSize = calculatePixelSize();
    pixelSize *= penSize;

    let col = Math.floor(x / pixelSize);
    let row = Math.floor(y / pixelSize);
    // if (col >= colLength || row >= rowLength) return;
  
    // Determine the cell's left upper-corner x and y coordinates
    var pixelX = col * pixelSize;
    var pixelY = row * pixelSize;
  
    drawingLayer.noStroke();

    if (currentTool === "eraser") {
      drawingLayer.erase();
    }
  
    drawingLayer.fill(pixelColor);
    drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
  
    // Disable eraser effect
    drawingLayer.noErase();
  };
  
  const showBackground = (selectedBg) => {
    let pixelSize = calculatePixelSize();
    const layer = backgroundLayer;
    layer.noStroke();

    if (selectedBg === "background1") {
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          if ((i / pixelSize + j / pixelSize) % 2 === 0) {
            layer.fill(200);
          } else {
            layer.fill(255);
            // layer.noFill();
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
        const grayColor = layer.color(200);
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
    } else if (selectedBg === "grid") {
      for (let i = 0; i < layer.width; i += pixelSize) {
        for (let j = 0; j < layer.height; j += pixelSize) {
          layer.strokeWeight(1);
          layer.stroke(0);
          layer.fill(255);
          layer.square(i, j, pixelSize);
        }
      }

    }

  }

  const createButtonWithAction = (title, buttonPressedAction) => {
      let button = p.createButton(title);
      button.parent('btn-container');
      button.id(title);
      button.mousePressed(buttonPressedAction);
  };

  const createSelectBg = () => {
    selectBg = p.createSelect();
    selectBg.parent('btn-container');

    selectBg.option('bg');
    selectBg.option('basic', 'background1');
    selectBg.option('+ -', 'background2');
    selectBg.option('2:1','background3');
    selectBg.option('grid','grid');

    selectBg.selected('select bg');
    selectBg.changed(() => {
      currentBackground = selectBg.value();
      if (currentBackground !== 'select bg') {
        showBackground(currentBackground);
      }
    });
  }

  const clearDrawing = () => {
      drawingLayer.clear();
      p.clear();
      displayGrid(drawingLayer);
  };

  const downloadImg = () => {
    p.saveCanvas("kufix", "png");
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

  const createColorPickers = () => {
    colorPicker = p.createColorPicker('#000000');
    colorPicker.parent('btn-container');
  }

  const createSliderPenSize = () => {
    sliderPenSize = p.createSlider(1,5,1);
    sliderPenSize.parent('btn-container');
    sliderPenSize.size(60);
    sliderPenSize.changed(() => {
      penSize = sliderPenSize.value();
    });
  }

  const toggleBackground = () => {
    drawBackground = !drawBackground;
  };

  const createInputPixelLength = () => {
    inputPixelLength = p.createInput(20, "number");
    inputPixelLength.parent('btn-container');
    inputPixelLength.changed(() => {
      rowLength = inputPixelLength.value();
      colLength = inputPixelLength.value();
    })
  }

};
