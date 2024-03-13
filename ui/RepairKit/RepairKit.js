var timerInterval = null;
var eKeyPressed = false;
var slotPosition = 0;
var currPosition = 1;
var wincount = 3;
var totalSeconds = 50;
function startGame() {
    var movingSquare = document.querySelector('.moving-square');
    var buttonPress = document.querySelector('.button-press');
    var squareSlot = document.querySelector('.square-slot');
    movingSquare.style.background = "radial-gradient(circle, rgb(0, 255, 200), rgb(0, 174, 130))";
    movingSquare.style.boxShadow = "0 0 5px 0px rgb(16, 239, 191)";
    movingSquare.style.marginLeft = "1%";
    buttonPress.style.background = 'radial-gradient(circle, rgb(0, 183, 140), rgb(0, 81, 61))';
    squareSlot.style.setProperty('--background-gradient', 'radial-gradient(circle, rgb(0, 255, 200), rgb(0, 174, 130))');
    eKeyPressed = false;
    currPosition = 0;
    randomizeSquareSlot();
    tick();
}
function checkWin() {
    var movingSquare = document.querySelector('.moving-square');
    var squareSlot = document.querySelector('.square-slot');
    var buttonPress = document.querySelector('.button-press');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    if (slotPosition - 2 <= currPosition && currPosition <= slotPosition + 2) {
        movingSquare.style.scale = '1.2';
        setTimeout(function () {
            movingSquare.style.scale = '1';
        }, 300);
        if (wincount > 1) {
            wincount -= 1;
            setTimeout(function () {
                startGame();
            }, 1000);
        } else if (wincount === 1) {
            movingSquare.style.background = "radial-gradient(circle, rgb(173, 212, 19), rgba(32, 132, 32, 0.894))";
            movingSquare.style.boxShadow = "0 0 5px 0px rgb(0, 255, 0)";
            buttonPress.style.background = "radial-gradient(circle, rgb(173, 212, 19), rgba(32, 132, 32, 0.894))";
            squareSlot.style.setProperty('--background-gradient', 'radial-gradient(circle, rgb(173, 212, 19), rgba(32, 132, 32, 0.894))');
            setTimeout(function () {
                window.location.href = "../index.html";
                fetch('https://TN-minigame/repairresult', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(true),
                });
            }, 3000);
        }
        return true;
    }
    movingSquare.style.background = "radial-gradient(circle, rgb(255, 85, 76), rgba(132, 32, 32, 0.894))";
    movingSquare.style.boxShadow = "0 0 5px 0px rgb(255, 0, 0)";
    buttonPress.style.background = "radial-gradient(circle, rgb(255, 85, 76), rgba(132, 32, 32, 0.894))";
    squareSlot.style.setProperty('--background-gradient', 'radial-gradient(circle, rgb(255, 85, 76), rgba(132, 32, 32, 0.894))');
    setTimeout(function () {
        window.location.href = "../index.html";
        fetch('https://TN-minigame/repairresult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(false),
        });
    }, 3000);
    return false;
}
function tick() {
    var movingSquare = document.querySelector('.moving-square');
    timerInterval = setInterval(function () {
        movingSquare.style.marginLeft = "".concat(currPosition, "%");
        currPosition += 1;
        if (currPosition > Math.min(slotPosition + 7, 94)) {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            handleKeyPress(new KeyboardEvent('keydown', { key: 'E' }));
        }
    }, totalSeconds);
}
function handleKeyPress(event) {
    if (!eKeyPressed && (event.key === 'e' || event.key === "E")) {
        eKeyPressed = true;
        checkWin();
    }
}
function randomizeSquareSlot() {
    var squareSlot = document.querySelector('.square-slot');
    slotPosition = Math.floor(Math.random() * (90 - 15) + 15);
    squareSlot.style.marginLeft = "".concat(slotPosition, "%");
    squareSlot.style.display = "flex";
}
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('DOMContentLoaded', function (event) {
    var urlParams = new URLSearchParams(window.location.search);
    var count = urlParams.get('count');
    var time = urlParams.get('time');
    wincount = parseInt(count);
    totalSeconds = parseInt(time);
    startGame();
});
