function pauseButtonHandler() {
    if (paused) {
      pauseButton.html('Pause');
      paused = false;
    } else {
      pauseButton.html('Resume');
      paused = true;
    }
      
  }