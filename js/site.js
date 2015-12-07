$(function () {
  _startButton = $("#startButton");
  _fullscreenButton = $("#fullscreenButton");
  _aboutButton = $("#aboutButton");
  _aboutReturnButton = $("#aboutReturnButton");
  _helpText = $("#helpText");

  _rainyMoodButton = $("#rainyMoodButton");
  _rainAudio = $("#backgroundRain");
  _playing = false;

  _meditationSection = $("#meditationSection");
  _optionButtons = $(".optionButton");
  _inProgressOptionButtons = $(".inProgressOptionButton");
  _buttons = $(".button");
  _breathSpeed = 3000;

  _optionSelectButton = $("#optionSelectButton");
  _optionsSection = $("#optionsSection");
  _optionsReturnButton = $("#optionsReturnButton");
  _switchThemeButton = $("#switchThemeButton");

  _fullscreenText = $("#fullscreenOnOffText");
  _aboutText = $("#aboutInfo");
  _thankYouMessage = $("#thankYouMessage");

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

  //Options functionality
  _optionSelectButton.click(function () {
    fadeOutMainElements();

    _optionsSection.delay(600).fadeIn(500);
    _optionsSection.find("div").fadeIn(600);
    $("#breathRateInfo").text(_breathSpeed / 1000 + "s");
  });

  $("#increaseBreathRateButton").click(function () {
    if (_breathSpeed < 5000) {
      _breathSpeed += 100;
    }
    $("#breathRateInfo").text(_breathSpeed / 1000 + "s");
  });

  $("#decreaseBreathRateButton").click(function () {
    if (_breathSpeed > 3000) {
      _breathSpeed -= 100;
    }
    $("#breathRateInfo").text(_breathSpeed / 1000 + "s");
  });

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

<<<<<<< HEAD
=======
  //Switch between dark and light theme
  _switchThemeButton.click(function () {
    _switchThemeButton.toggleClass("darkThemeOn");
    $(".hoverActive").toggleClass("darkTheme");
    //Dark Theme
    if (_switchThemeButton.hasClass("darkThemeOn")) {
      $("html").css({
        "backgroundColor": "#888888"
      });
      $(".button, #aboutReturnButton, #optionsReturnButton").css({
        "backgroundColor": "#FFF8D3"
      });
      $(".inProgressOptionButton").css({
        "backgroundColor": "#999999"
      });
      $("#pulsingRing").css({
        "backgroundColor": "#C5C7B6"
      });
    }
    //Light Theme
    else {
      $("html").css({
        "backgroundColor": "#E5FFFF"
      });
      $(".button, #aboutReturnButton, #optionsReturnButton").css({
        "backgroundColor": "#40FFF6"
      });
      $(".inProgressOptionButton").css({
        "backgroundColor": "#C0FFFF"
      });
      $("#pulsingRing").css({
        "backgroundColor": "#8DFFFF"
      });
    }

  });

  _optionsReturnButton.click(function () {
    _optionsReturnButton.fadeOut(400);
    _optionsSection.fadeOut(400);

    fadeInMainElements(500);
  });

  _aboutReturnButton.click(function () {
    _aboutReturnButton.fadeOut(400);
    _aboutText.fadeOut(400);

    fadeInMainElements(500);
  });

  //Reload page if meditation is quit
  _exitButton.click(function () {
    location.reload();
  });

  //Pause on the next cycle after pausing, toggle text
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

>>>>>>> testing
  //  _musicOptionButton.click(function () {
  //    _musicOptionButton.toggleClass("active");
  //
  //    console.log("clicked");
  //    if (_playing == false) {
  //      $('#backgroundRain')[0].play();
  //      _playing = true;
  //    } else {
  //      $('#backgroundRain')[0].pause();
  //      _playing = false;
  //    }
  //  });

  fadeInMainElements();
}

function fadeInMainElements() {
  _helpText.fadeIn(1700);
  _startButton.delay(1000).fadeIn(1000);
  _optionButtons.delay(1200).fadeIn(1000);
}

function fadeOutMainElements() {
  _helpText.fadeOut(400);
  _buttons.fadeOut(400);
}

function displayAboutInfo() {
  fadeOutMainElements();

  _aboutReturnButton.delay(500).fadeIn(300);

  _aboutText.delay(500).fadeIn(400);
}

function beginMeditation() {
  _pulsingRing = $("#pulsingRing");
  _guidingText = $("#guidingText");

  _pulsingRing.show();

  pulsingRingAnimation();
  changeText(_textArray);
}

//Repeating function to create a pulsing ring
//The user uses this ring to match breathing
//3.6 seconds total
function pulsingRingAnimation() {
  if (_counter < _textArray.length - 1) {
    _pulsingRing.delay(600).animate({
      width: "150px",
      height: "150px"
    }, _breathSpeed, "easeInSine", function () {
      _pulsingRing.delay(600).animate({
        width: "60px",
        height: "60px"
      }, _breathSpeed, "easeInSine", function () {
        if (!_paused) {
          pulsingRingAnimation();
        }
      });
    });
  }
}

function changeText(array) {
  //Continue until all text has been used
  if (_counter <= array.length) {
    _guidingText.delay(500).fadeIn(500, function () {
      _guidingText.delay(_breathSpeed - 900).fadeOut(500, function () {
        _guidingText.text(array[_counter]);
        _counter++;
        //Don't call again if it has been paused
        if (!_paused) {
          changeText(array, _counter);
        }
      });
    });
  } else {
    _pulsingRing.fadeOut(400);
    _startButton.fadeOut(400);

    _thankYouMessage.delay(800).fadeIn(400);
  }
}


function createInProgressOptionButtons() {
  _inProgressOptionButtons.show(700);
  _inProgressOptionButtons.addClass("hoverActive");
}


//Text for the meditation
function createTextArray() {

  _textArray = [
        " ", "Relax.", "Take the next few minutes for yourself.", "Focus on the circle.", "Let your breathing follow it.", //Out 5
        "Breathing in as it expands", "and breathing out as it contracts.", "As you breathe in and out", "allow every muscle in your body", "to relax.", //In 10
        "Let every bit of stress", "start to fade away.", "With every breath out", "exhale any worries,", "any tension,", //Out 15
        "and any stress of the day.", "Allow yourself this time", "to relax.", "And as you breathe", "imagine that there is a warm, relaxing wave", //In 20
        "starting to form at your toes.", "With each deep breath", "this wave moves upwards slightly.", "Relaxing your feet first", "then your legs,", //Out 25
        "your stomach and chest,", "moving into your arms", "and finally over your head.", "Making your entire body", "relaxed and calm.", //In 30
        "As you continue to breathe deeply", "we will count down 5 breaths.", "When we reach 1", "any remaining tension and stress", "will be gone.", //Out 35
        "5", " ", "4", " ", "3", //In 40
        " ", "2", " ", "1", " ", //Out 45
        " ", " ", "Now that you are fully relaxed", "take a few deep breaths", "to enjoy this time to yourself.", //In 50
        " ", " ", " ", " ", " ", //Out 55
        " ", "In a few moments", "we will count back up to 5.", "With each number", "you will become more alert.", //In 60
        "Until we reach 5", "when you will be fully alert.", "Still relaxed", "but ready to return to your day.", " ", //Out 65
        "1", " ", "2", " ", "3", //In 70
        " ", "4", " ", "5", " ", //Out 75
        "Now you should be fully alert", "feeling calmer", "and more energized.", "Ready to resume your day.", " ", //In 80
        " " //Out 81
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
