$(function () {
  _startButton = $("#startButton");
  _fullscreenButton = $("#fullscreenButton");
  _aboutButton = $("#aboutButton");
  _returnButton = $("#returnButton");
  _helpText = $("#helpText");

  _musicOptionButton = $("#musicOptionButton");
  _rainAudio = $("#backgroundRain");
  _playing = false;

  _meditationSection = $("#meditationSection");
  _optionButtons = $(".optionButton");
  _inProgressOptionButtons = $(".inProgressOptionButton");
  _buttons = $(".button");

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

    fadeInMainElements(500);
  });
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
}

function changeText(array) {
  //Continue until all text has been used
  if (_counter <= array.length) {
    _guidingText.delay(600).fadeIn(600, function () {
      _guidingText.delay(1800).fadeOut(600, function () {
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

  //Reload page if meditation is quit
  _exitButton.click(function () {
    location.reload();
  })
}


//Text for the meditation
function createTextArray() {
  //  _textArray = [
  //        " ", "Relax", "Take the next few minutes for yourself", "Focus on the circle", "Let your breathing follow it", //Out 5
  //        "Breathing in as it expands", "And breathing out as it contracts", "And as you breathe in and out", "Allow every muscle in your body", "To relax", //In 10
  //        "Let every bit of stress", "Start to fade away", "With every breath out", "Exhale any worries", "And any tension", //Out 15
  //        "And any stress of the day", "Allow yourself this time", "To relax", "And as you breathe", "Imagine that there is a warm, relaxing wave", //In 20
  //        "Starting to form at your toes", "And with each deep breath", "This wave moves upwards slightly", "Relaxing your feet", "Your legs", //Out 25
  //        "Your stomach and chest", "Moving into your arms", "And finally over your head", "Making your entire body", "Relaxed and calm", //In 30
  //        "And as you continue to breathe deeply", "We will count down 5 breaths", "And when we reach 1", "Any remaining tension and stress", "Will be gone", //Out 35
  //        "5", " ", "4", " ", "3", //In 40
  //        " ", "2", " ", "1", " ", //Out 45
  //        " ", " ", "Now that you are fully relaxed", "Take a few deep breaths", "To enjoy this time to yourself", //In 50
  //        " ", " ", " ", " ", " ", //Out 55
  //        " ", "Now in a few moments", "We will count back up to 5", "And with each number", "You will become more alert", //In 60
  //        "Until we reach 5", "When you will be fully alert", "Still relaxed", "But ready to return to your day", " ", //Out 65
  //        "1", " ", "2", " ", "3", //In 70
  //        " ", "4", " ", "5", " ", //Out 75
  //        "And now you are fully alert", "Feeling calmer", "And more energized", "Ready to return to your day", " ", //In 80
  //        " " //Out 81
  //    ];

  _textArray = [
        " ", "Relax.", "Take the next few minutes for yourself.", "Focus on the circle.", "Let your breathing follow it.", //Out 5
        "Breathing in as it expands", "and breathing out as it contracts.", "As you breathe in and out", "allow every muscle in your body", "to relax.", //In 10
        "Let every bit of stress", "start to fade away.", "With every breath out", "exhale any worries,", "any tension,", //Out 15
        "and any stress of the day.", "Allow yourself this time", "to relax.", "And as you breathe", "imagine that there is a warm, relaxing wave", //In 20
        "starting to form at your toes.", "With each deep breath", "this wave moves upwards slightly.", "Relaxing your feet first", "then your legs,", //Out 25
        "your stomach and chest,", "moving into your arms", "and finally over your head.", "Making your entire body", "relaxed and calm.", //In 30
        "Now, as you continue to breathe deeply", "we will count down 5 breaths.", "When we reach 1", "any remaining tension and stress", "will be gone.", //Out 35
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
