var grid = 32;
var show = false;

function setup() {
  createCanvas(512, 512);
  background(240);

  colorPickerButton();
  showGridButton();
  saveButton();
  clearButton();
  bigGridButton();
}

function draw() {
  if (mouseIsPressed) {
    var x = snap(mouseX);
    var y = snap(mouseY);
    if (show == false) {
      noStroke();
    } else {
      stroke(150);
    }
    fill(colorPicker.color());
    square(x, y, grid);
  }
}

function createGrid() {
  var l = 0;
  strokeWeight(1);
  stroke(150);
  while (l < width || l < height) {
    line(0, l, width, l);
    line(l, 0, l, height);
    l += grid;
  }
}

function removeGrid() {
  var l = 0;
  strokeWeight(1);
  stroke(150, 0);
  erase();
  while (l < width || l < height) {
    line(0, l, width, l);
    line(l, 0, l, height);
    l += grid;
  }
  noErase();
}

function colorPickerButton() {
  colorPicker = createColorPicker("#49DFFD");
  colorPicker.position(0);
  colorPicker.size(colorPicker.width, 28);
}

function saveButton() {
  saveButton = createButton("DOWNLOAD PNG");
  saveButton.position(width - 150);
  saveButton.size(150, 32);
  saveButton.mousePressed(download);
}

function clearButton() {
  clearButton = createButton("CLEAR");
  clearButton.position(button.x + button.width + 8);
  clearButton.size(clearButton.width, 32);
  clearButton.mousePressed(clean);
}

function showGridButton() {
  button = createButton("SHOW GRID");
  button.position(colorPicker.width + 8);
  button.size(116, 32);
  button.mousePressed(turnOnGrid);
}

function eraseGridButton() {
  button = createButton("ERASE GRID");
  button.position(colorPicker.width + 8);
  button.size(116, 32);
  button.mousePressed(turnOnGrid);
}

function gridControl() {
  gridSizeButton.remove();
  if (grid == 64) {
    if (show == true) {
      removeGrid();
      button.remove();
      showGridButton();
      show = false;
    }
    grid = 32;
    bigGridButton();
  } else {
    if (show == true) {
      removeGrid();
      button.remove();
      showGridButton();
      show = false;
    }
    grid = 64;
    smallGridButton();
  }
}

function bigGridButton() {
  gridSizeButton = createButton("8X8");
  gridSizeButton.position(clearButton.x + clearButton.width + 8);
  gridSizeButton.size(72, 32);
  gridSizeButton.mousePressed(gridControl);
}

function smallGridButton() {
  gridSizeButton = createButton("16X16");
  gridSizeButton.position(clearButton.x + clearButton.width + 8, height + 10);
  gridSizeButton.size(72, 32);
  gridSizeButton.mousePressed(gridControl);
}

function turnOnGrid() {
  if (show == false) {
    createGrid();
    button.remove();
    eraseGridButton();
    show = true;
  } else {
    removeGrid();
    button.remove();
    showGridButton();
    show = false;
  }
}

function snap(p) {
  // subtract offset (to center lines)
  // divide by grid to get row/column
  // round to snap to the closest one
  var cell = Math.round((p - grid / 2) / grid);
  // multiply back to grid scale
  // add offset to center
  return cell * grid;
}

function clean() {
  clear();
  background(240);
  show = false;
  showGridButton();
}

function download() {
  saveCanvas("myPixelArt", "png");
}