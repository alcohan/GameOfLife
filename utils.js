function pauseButtonHandler() {
    if (paused) {
      pauseButton.html('Pause');
      paused = false;
    } else {
      pauseButton.html('Resume');
      paused = true;
    }
      
  }

class LabelSlider {
  constructor(label, parent, min, max, value, step) {
    this.container = createDiv()
      .parent(parent)
      .class("label-slider");
    
    this.labelSpan = createSpan(`${label}: ${value}`)
      .parent(this.container);

    this.slider = createSlider(min,max,value,step)
      .parent(this.container);

    this.slider.input( () => this.labelSpan.html(`${label}: ${this.slider.value()}`));
  }
  
  getSlider() {
    return this.slider;
  }
}