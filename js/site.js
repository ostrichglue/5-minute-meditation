$(function () {
  _startButton = $("#startButton");
  _musicOptionButton = $("#musicOptionButton");
  _fullscreenButton = $("#fullscreenButton");
  _aboutButton = $("#aboutButton");
  _returnButton = $("#returnButton");
  _helpText = $("#helpText");

  _optionButtons = $(".optionButton");
  _inProgressOptionButtons = $(".inProgressOptionButton");
  _buttons = $(".button");

  _fullscreenText = $("#fullscreenOnOffText");
  _aboutText = $("#aboutInfo");

  _pauseButton = $("#pauseButton");
  _exitButton = $("#exitButton");

  _counter = 0;
  _paused = false;

  initialize();
});

function initialize() {
  createTextArray();

  //Fullscreen functionality
  _fullscreenButton.click(function () {
    toggleFullScreen();
  });

  //About functionality
  _aboutButton.click(function () {
    displayAboutInfo();
  })

  //Begin meditation
  _startButton.click(function () {
    $("div").removeClass("hoverActive");

    //Fade out misc elements
    _helpText.fadeOut(500);
    _optionButtons.fadeOut(300);
    $(".bubbleText").fadeOut(300);

    //Little bounce animation as the script begins
    _startButton.animate({
      width: "60px",
      height: "60px",
    }, 1500, "easeOutBounce", function () {
      beginMeditation();
    });

    createInProgressOptionButtons();
  });

  fadeInMainElements();
}

function fadeInMainElements() {
  _helpText.fadeIn(2000);
  _startButton.delay(1500).fadeIn(1200);
  _optionButtons.delay(1700).fadeIn(1200);
}

function displayAboutInfo() {
  _buttons.fadeOut(400);
  _helpText.fadeOut(400);

  _returnButton.delay(500).fadeIn(300);
  _aboutText.delay(500).fadeIn(400);

  _returnButton.click(function () {
    _returnButton.fadeOut(400);
    _aboutText.fadeOut(400);

    fadeInMainElements().delay(500);
  });
}

function beginMeditation() {
  _pulsingRing = $("#pulsingRing");

  _pulsingRing.show();

  pulsingRingAnimation();
  beginGuidingText();
}

//Repeating function to create a pulsing ring
//The user uses this ring to match breathing
function pulsingRingAnimation() {
  _pulsingRing.delay(600).animate({
    width: "150px",
    height: "150px"
  }, 3000, "easeInSine", function () {
    _pulsingRing.delay(600).animate({
      width: "60px",
      height: "60px"
    }, 3000, "easeInSine", function () {
      if (!_paused) {
        pulsingRingAnimation();
      }
    });
  });
}

function beginGuidingText() {
  _guidingText = $("#guidingText");

  changeText(_textArray, 0);
}

function changeText(array) {
  //Continue until all text has been used
  if (_counter <= array.length) {
    _guidingText.delay(800).fadeIn(1000, function () {
      _guidingText.delay(2000).fadeOut(1000, function () {
        _guidingText.text(array[_counter]);
        _counter++;
        //Don't call again if it has been paused
        if (!_paused) {
          changeText(array, _counter);
        }
      });
    });
  }
}


function createInProgressOptionButtons() {
  _inProgressOptionButtons.show(700);
  _inProgressOptionButtons.addClass("hoverActive");

  _pauseButton.click(function () {
    if (!_paused) {
      _paused = true;
      _pauseButton.text("Play")
    } else {
      _paused = false;
      _pauseButton.text("Pause");
      changeText(_textArray, _counter);
      pulsingRingAnimation();
    }
  });

  _exitButton.click(function () {
    location.reload();
  })
}


//Text for the meditation
function createTextArray() {
  _textArray = [
        "Relax", "Take the next few minutes for yourself", "Focus on the circle", "Let your breathing follow it", "Breathing in as it expands",
        "And breathing out as it contracts", "And as you breathe in and out", "Allow every muscle in your body", "To relax", "And let every bit of stress",
        "Start to fade away", "With every breath out", "Exhale any worries", "Any tension", "Any stress of the day", "Allow yourself this time",
        "To relax", " ", "And as you breathe", "Imagine that there is a warm, relaxing wave", "Starting to form at your toes", "And with each deep breath",
        "This wave moves upwards slightly", "Relaxing your feet", "Your legs", "Your stomach and chest", "Moving into your arms", "And finally over your head", "Until your entire body is completely relaxed", " ", "And as you continue to breathe deeply", "We will count down",
        "From ten", "To one", "And when we reach one", "You will be free of any tension or stress", "And completely relaxed"
    ];
}

//Code from https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function toggleFullScreen() {
  if (!document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
