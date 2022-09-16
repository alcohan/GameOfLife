// import LabelSlider from "./label-slider.js";

//configuration

let cellSize = 10;
let fr = 2;
let paused = false;
let defaultDensity = 0.5;

let w = visualViewport.width;
let h = visualViewport.height;

function setup() {
  //layout setup
  main = document.getElementById("main");
  uiContainer = createDiv()
    .class('ui-container')
    .parent(main);

  panel = createDiv()
    .parent(main)
    .class("sidebar");

  header = createDiv()
    .class("header-container hidden")
    .parent(uiContainer)
    .html(headerHTML);
  options = createDiv()
    .parent(uiContainer)
    .class("options-container hidden");
    buttons = createDiv()
      .class("buttons-container")
      .parent(options);
    sliders = createDiv()
      .class("sliders-container")
      .parent(options);

  function openNav() {
    panel.toggleClass('sidebar-open');
    // uiContainer.toggleClass('');
    menuButton.toggleClass('hidden');
  }
  function closeNav() {
    panel.toggleClass('sidebar-open');
    // uiContainer.toggleClass('');
    menuButton.toggleClass('hidden');
  }

  header.html(headerHTML);

  canvas = createCanvas(w, h)
  .parent(main)
  .position(0,0);
  
  // console.log(windowWidth, windowHeight,window.innerWidth,window.innerHeight);
  background(0);
  frameRate(fr);

  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  game = new GameOfLife(cols, rows);

  // Buttons

  menuButton = createSpan("☰")
    .parent(main)
    .class('openbtn')
    .mousePressed(openNav);

  closeButton = createSpan("╳")
    .class('closebtn')
    .parent(panel)
    .mousePressed(closeNav);

  infoButton = createImg('assets/info.svg',"Info")
    .class('ui-button')
    .parent(createDiv().parent(panel))
    .mousePressed(() => header.toggleClass('hidden'));

  controlButton = createImg('assets/controls.svg',"Controls")
    .class('ui-button')
    .parent(createDiv().parent(panel))
    .mousePressed(() => options.toggleClass('hidden'));

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
