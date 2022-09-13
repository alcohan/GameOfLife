// import LabelSlider from "./label-slider.js";

//configuration

let cellSize = 10;
let fr = 2;
let paused = false;
let defaultDensity = 0.5;

function setup() {
  //layout setup
  header = createDiv()
    .class("header-container");
  options = createDiv()
    .class("options-container");
  buttons = createDiv()
    .class("buttons-container")
    .parent(options);
  sliders = createDiv()
    .class("sliders-container")
    .parent(options);
  display = createDiv()
    .class("display-container");

  canvas = createCanvas(1200, 500)
    .parent(display);

  background(0);
  frameRate(fr);

  cols = width / cellSize;
  rows = height / cellSize;

  game = new GameOfLife(cols, rows);

  // Buttons
  pauseButton = createButton("Pause")
    .mousePressed(pauseButtonHandler)
    .parent(buttons);

  randomizeButton = createButton("Randomize")
    .mousePressed(() => game.randomize(densitySlider.value()))
    .parent(buttons);

  clearButton = createButton("Clear")
    .mousePressed(() => game.clear())
    .parent(buttons);

  // Sliders
  densitySlider = new LabelSlider("Density", sliders, 0.1, 0.9, defaultDensity, 0.1).getSlider();
  frSlider = new LabelSlider("Speed",sliders, 1, 20, fr, 1).getSlider();
}

function draw() {
  frameRate(frSlider.value());
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
