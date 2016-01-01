$(function () {
  _startButton = $("#startButton");
  _fullscreenButton = $(".fullscreenToggler");
  _aboutButton = $("#aboutButton");
  _aboutReturnButton = $("#aboutReturnButton");
  _helpText = $("#helpText");

  _rainyMoodButton = $("#rainyMoodButton");
  _rainAudio = $("#backgroundRain");
  _playing = false;

  _meditationSection = $("#meditationSection");
  _optionButtons = $(".optionButton");
  _inProgressOptionButtons = $(".inProgressOptionButton");
  _endReloadButton = $("#endReloadButton");
  _buttons = $(".button");
  _breathRate = 3500;

  _optionSelectButton = $("#optionSelectButton");
  _optionsSection = $("#optionsSection");
  _optionsReturnButton = $("#optionsReturnButton");
  _switchThemeButton = $("#switchThemeButton");

  _fullscreenText = $("#fullscreenOnOffText");
  _aboutInfo = $("#aboutInfo");
  _thankYouMessage = $("#thankYouMessage");

  _pauseButton = $("#pauseButton");
  _exitButton = $("#exitButton");

  _counter = 0;
  _paused = false;

  //Cookies
  if (Cookies.get('theme') === 'dark') {
    _switchThemeButton.addClass('darkThemeOn');
    $('link[href="css/lightTheme.css"]').attr('href', 'css/darkTheme.css');
  }
  if (Cookies.get('breathRate')) {
    _breathRate = parseInt(Cookies.get('breathRate'));
  } else {
    setCookie('breathRate', _breathRate, 365);
  }

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
  });

  //Options functionality
  _optionSelectButton.click(function () {
    fadeOutMainElements();

    _optionsSection.delay(600).fadeIn(500);
    _optionsSection.find("div").fadeIn(600);
    $("#breathRateInfo").text(_breathRate / 1000 + "s");
  });

  $("#increaseBreathRateButton").click(function () {
    if (_breathRate < 6000) {
      _breathRate += 100;
      setCookie('breathRate', _breathRate, 365);
    }
    $("#breathRateInfo").text(_breathRate / 1000 + "s");
  });

  $("#decreaseBreathRateButton").click(function () {
    if (_breathRate > 3000) {
      _breathRate -= 100;
      setCookie('breathRate', _breathRate, 365);
    }
    $("#breathRateInfo").text(_breathRate / 1000 + "s");
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
      $("#centerCircle").show();
      _startButton.hide();
      beginMeditation();
    });

    createInProgressOptionButtons();
  });

  //Switch between dark and light theme
  _switchThemeButton.click(function () {
    switchTheme();
  });

  _optionsReturnButton.click(function () {
    _optionsReturnButton.fadeOut(400);
    _optionsSection.fadeOut(400);

    fadeInMainElements(500);
  });

  _aboutReturnButton.click(function () {
    _aboutReturnButton.fadeOut(400);
    _aboutInfo.fadeOut(400);

    fadeInMainElements(500);
  });

  _endReloadButton.click(function () {
    document.location.reload();
  })

  //End meditation
  _exitButton.click(function () {
    _counter = _textArray.length;
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
  _aboutInfo.delay(500).fadeIn(400);
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
    }, _breathRate, "easeInSine", function () {
      //Check again to see if paused or ended
      if (_counter < _textArray.length - 1) {
        _pulsingRing.delay(600).animate({
            width: "60px",
            height: "60px"

          }, _breathRate, "easeInSine",
          function () {
            if (!_paused) {
              pulsingRingAnimation();
            }
          });
      }
    });
  }
}

function changeText(array) {
  //Continue until all text has been used
  if (_counter <= array.length) {
    _guidingText.delay(500).fadeIn(500, function () {
      _guidingText.delay(_breathRate - 900).fadeOut(500, function () {
        _guidingText.text(array[_counter]);
        _counter++;
        //Don't call again if it has been paused
        if (!_paused || _counter <= array.length) {
          changeText(array, _counter);
        }
      });
    });
  } else {
    _pulsingRing.fadeOut(400);
    _startButton.fadeOut(400);
    $("#centerCircle").fadeOut();

    _thankYouMessage.delay(800).fadeIn(400);
    _endReloadButton.delay(800).fadeIn(400);
    _inProgressOptionButtons.delay(1000).fadeOut(400);
    _endReloadButton.addClass('hoverActive');
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

function switchTheme() {
  _switchThemeButton.toggleClass("darkThemeOn");

  //Dark Theme
  if (_switchThemeButton.hasClass("darkThemeOn")) {
    $('link[href="css/lightTheme.css"]').attr('href', 'css/darkTheme.css');

    setCookie('theme', 'dark', 365);
  }
  //Light Theme
  else {
    $('link[href="css/darkTheme.css"]').attr('href', 'css/lightTheme.css');

    setCookie('theme', 'light', 365);
  }
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

function setCookie(name, value, expires) {
  Cookies.set(name, value, {
    expires: expires,
    path: '/'
  });
}
