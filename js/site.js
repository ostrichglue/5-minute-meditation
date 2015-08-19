$(function() {
    var _startButton, _pulsingRing, _helpText, _textArray, 
        _guidingText, _musicOptionButton,
        _fullscreenButton= null;

    initialize();
    createTextArray();
});

function initialize(){
    _startButton        = $("#startButton");
    _musicOptionButton  = $("#musicOptionButton");
    _fullscreenButton   = $("#fullscreenButton");
    _helpText           = $("#helpText");
    _optionButtons      = $(".optionButton");

    _helpText.fadeIn(2000);
    _startButton.delay(1500).fadeIn(1200);
    _musicOptionButton.delay(1700).fadeIn(1200);
    _fullscreenButton.delay(1700).fadeIn(1200);


    _startButton.click(function(){
        $("div").removeClass("hoverActive");
        _helpText.fadeOut(500);

        $(".bubbleText").fadeOut(300);
        
        _startButton.animate({
            width: "60px",
            height: "60px",
        }, 1500, "easeOutBounce", function(){
           beginMeditation().delay(800);
        });

        _optionButtons.animate({
            width: "45px",
            height: "45px",
            left: "50%"

        }, 700, "easeOutCubic", function(){});


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
            pulsingRingAnimation();
        });
    });
}

function beginGuidingText() {
    _guidingText = $("#guidingText");

    changeText(_textArray, 0);
}

function changeText(array, counter) {
    //Continue until all text has been used
    if(counter <= array.length) {
        _guidingText.delay(800).fadeIn(1000, function() {
           _guidingText.delay(2000).fadeOut(1000, function() {
                _guidingText.text(array[counter]);
               counter++;
               changeText(array, counter);
           });
        });
    }
    else {
        endMeditation();   
    }
}

function createTextArray() {
    _textArray = [
        "Relax", "Take the next few minutes for yourself", "Focus on the dot", "Let your breathing follow it", "Breathing in as it expands",
        "And breathing out as it contracts", "And as you breathe in and out", "Allow every muscle in your body", "To relax"
    ];
}

function endMeditation() {

}