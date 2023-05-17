function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
};
function determineWinner({ playerOne, playerTwo, timerId }) {
    clearTimeout(timerId);
    if (playerOne.health === playerTwo.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    } else if (player.health > playerTwo.health) {
        document.querySelector('#displayText').innerHTML = 'First Player Wins';
    } else {
        document.querySelector('#displayText').innerHTML = 'Second Player Wins';
    };
};
let timer = 30;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--
        document.querySelector('#timer').innerHTML = timer;
    }

    if (timer <= 10){
        document.querySelector('#timer').style.color = 'rgb(179, 43, 43)';
    }

    if (timer === 0) {
        determineWinner({ playerOne, playerTwo, timerId });
        isGameOver = true;
    }
}