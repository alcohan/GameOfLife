//configuration

let cellSize = 10;
let fr = 20;
let paused = false;
let defaultDensity = 0.5;

function setup() {
  canvas = createCanvas(1200, 500);
  canvas.position(0, 100);
  background(0);
  frameRate(fr);

  cols = width / cellSize;
  rows = height / cellSize;

  game = new GameOfLife(cols, rows);

  pauseButton = createButton("Pause");
  pauseButton.position(20, 10);
  pauseButton.mousePressed(pauseButtonHandler);

  randomizeButton = createButton("Randomize");
  randomizeButton.position(20, 36);
  randomizeButton.mousePressed(() => game.randomize(densitySlider.value()));

  clearButton = createButton("Clear");
  clearButton.position(20, 62);
  clearButton.mousePressed(() => game.clear());

  densitySlider = createSlider(0.1, 0.9, defaultDensity, 0.1);
  densitySlider.position(240, 36);
  densityLabel = createSpan(`Density: ${densitySlider.value()}`);
  densityLabel.position(156, 38);
  frSlider = createSlider(1, 20, 2, 1);
  frSlider.position(240, 10);
  frLabel = createSpan(`Speed: ${frSlider.value()}`);
  frLabel.position(170, 12);
}

function draw() {
  frameRate(frSlider.value());
  frLabel.html(`Speed: ${frSlider.value()}`);
  densityLabel.html(`Density: ${densitySlider.value()}`);
  if (!paused) game.step();
  game.draw(cellSize);
}

function mousePressed() {
  let gridX = floor(mouseX / cellSize);
  let gridY = floor(mouseY / cellSize);
  game.flipCell(gridX, gridY);
}
function mouseDragged() {
  let gridX = floor(mouseX / cellSize);
  let gridY = floor(mouseY / cellSize);
  game.setLivingCell(gridX, gridY);
}
