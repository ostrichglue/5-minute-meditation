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
  _mainSectionButtons = $(".mainSectionButton");
  _inProgressmainSectionButtons = $(".inProgressmainSectionButton");
  _endReloadButton = $("#endReloadButton");
  _buttons = $(".button");
  _breathRate = 3500;

  _optionsButton = $("#optionsButton");
  _optionsSection = $("#optionsSection");
  _optionsReturnButton = $("#optionsReturnButton");
  _switchThemeButton = $("#switchThemeButton");

  _fullscreenText = $("#fullscreenOnOffText");
  _aboutSection = $("#aboutSection");
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
    displayaboutSection();
  });

  //Options functionality
  _optionsButton.click(function () {
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
    _mainSectionButtons.fadeOut(300);
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

    createInProgressmainSectionButtons();
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
    _aboutSection.fadeOut(400);

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

  //  _musicmainSectionButton.click(function () {
  //    _musicmainSectionButton.toggleClass("active");
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
  _helpText.fadeIn(1500);
  _startButton.delay(900).fadeIn(900);
  _mainSectionButtons.delay(1000).fadeIn(900);
}

function fadeOutMainElements() {
  _helpText.fadeOut(400);
  _buttons.fadeOut(400);
}

function displayaboutSection() {
  fadeOutMainElements();

  _aboutReturnButton.delay(500).fadeIn(300);
  _aboutSection.delay(500).fadeIn(400);
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
    _inProgressmainSectionButtons.delay(1000).fadeOut(400);
    _endReloadButton.addClass('hoverActive');
  }
}

function createInProgressmainSectionButtons() {
  _inProgressmainSectionButtons.show(700);
  _inProgressmainSectionButtons.addClass("hoverActive");
}

//Text for the meditation
function createTextArray() {

  _textArray = [
        " ", " ", " ", " ", " ", //Out 5
        " ", " ", " ", " ", " ", //In 10
        " ", " ", " ", " ", " ", //Out 15
        " ", " ", " ", " ", " ", //In 20
        " ", " ", " ", " ", " ", //Out 25
        " ", " ", " ", " ", " ", //In 30
        " ", " ", " ", " ", " ", //Out 35
        " ", " ", " ", " ", " ", //In 40
        " ", " ", " ", " ", " ", //Out 45
        " ", " ", " ", " ", " ", //In 50
        " ", " ", " ", " ", " ", //Out 55
        " ", " ", " ", " ", " ", //In 60
        " ", " ", " ", " ", " ", //Out 65
        " ", " ", " ", " ", " ", //In 70
        " ", " ", " ", " ", " ", //Out 75
        " ", " ", " ", " ", " ", //In 80
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
