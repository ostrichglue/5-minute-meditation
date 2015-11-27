$(function() {
    var _startButton, _pulsingRing, _helpText, _textArray, 
        _guidingText, _musicOptionButton,
        _fullscreenButton, _fullscreenText, _pauseButton = null;
    initialize();
});

function initialize(){
    _startButton        = $("#startButton");
    _musicOptionButton  = $("#musicOptionButton");
    _fullscreenButton   = $("#fullscreenButton");
    _helpText           = $("#helpText");
    _optionButtons      = $(".optionButton");
    _fullscreenText     = $("#fullscreenOnOffText");
    _pauseButton        = $("#pauseButton");
    _counter            = 0;
    _paused             = false;

    _helpText.fadeIn(2000);
    _startButton.delay(1500).fadeIn(1200);
    _musicOptionButton.delay(1700).fadeIn(1200);
    _fullscreenButton.delay(1700).fadeIn(1200);
    createTextArray();
  
    //Fullscreen functionality
    _fullscreenButton.click(function(){
//      if(_fullscreenText.hasClass("fullscreenOff")){
//        _fullscreenText.text("Fullscreen: On");
//        _fullscreenText.removeClass("fullscreenOff");
//      }
//      else{
//        _fullscreenText.text("Fullscreen: Off");
//        _fullscreenText.addClass("fullscreenOff");
//      }
//      
      toggleFullScreen();
    });
  
    _startButton.click(function(){
        $("div").removeClass("hoverActive");
        _helpText.fadeOut(500);

        $(".bubbleText").fadeOut(300);
        
        _startButton.animate({
            width: "60px",
            height: "60px",
        }, 1500, "easeOutBounce", function(){
           beginMeditation();
        });

        _optionButtons.animate({
            width: "45px",
            height: "45px",
            left: "50%"

        }, 700, "easeOutCubic");

        createPauseButton();
    });
}

function beginMeditation() {
    _pulsingRing = $("#pulsingRing");

    _pulsingRing.show();

    pulsingRingAnimation();
    beginGuidingText();
}

function pulsingRingAnimation() {
    _pulsingRing.delay(600).animate({
        width: "150px",
        height: "150px"
    }, 3000, "easeInSine", function(){
        _pulsingRing.delay(600).animate({
            width: "60px",
            height: "60px"
        }, 3000, "easeInSine", function(){
            if(!_paused){
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
    if(_counter <= array.length) {
        _guidingText.delay(800).fadeIn(1000, function() {
           _guidingText.delay(2000).fadeOut(1000, function() {
               _guidingText.text(array[_counter]);
               _counter++;
               //Don't call again if it has been paused
               if(!_paused){
                  changeText(array, _counter);
               }
          });
        });
    }
}

//Text for the meditation
function createTextArray() {
    _textArray = [
        "Relax", "Take the next few minutes for yourself", "Focus on the circle", "Let your breathing follow it", "Breathing in as it expands",
        "And breathing out as it contracts", "And as you breathe in and out", "Allow every muscle in your body", "To relax", "And let every bit of stress",
        "Start to fade away", "With every breath out", "Exhale any worries", "Any tension", "Any stress of the day", "Allow yourself this time",
        "To relax", " ", "And as you breathe", "Imagine that there is a warm, relaxing wave", "Starting to form at your toes", "And with each deep breath", 
        "This wave moves upwards slightly"
    ];
}

function createPauseButton() {
    _pauseButton.show(700);
    _pauseButton.addClass("hoverActive");
  
    _pauseButton.click(function(){
      if(!_paused){
        _paused = true;
        _pauseButton.text("Play")
      }
      else{
        _paused = false;
        _pauseButton.text("Pause");
        changeText(_textArray, _counter);
        pulsingRingAnimation();
      }
  });
}

//Code from https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
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