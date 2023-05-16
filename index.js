const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const font = document.querySelector('h1');
const font2 = document.querySelector('h2')

const newGameBtn = document.querySelector('#newGame');
const creditsBtn = document.querySelector('#credits');

const newGameCreateCont = document.querySelector('#newGameCreator');
newGameCreateCont.style.visibility = 'hidden';
document.querySelector('#creditsArea').style.visibility = 'hidden';

const startGameBtn = document.querySelector('#startGame');
const backBtn = document.querySelector('#back');

const firstPlayerList = document.querySelector('#selectFirstPalyer');
const arenasList = document.querySelector('#selectArena');
const secondPlayerList = document.querySelector('#selectSecondPalyer');

const playerOneNameCont = document.querySelector('#playerOneName');
const playerTwoNameCont = document.querySelector('#playerTwoName');
const arenaNameCont = document.querySelector('#arenaName');

font.textContent = 'Castle Fights';
font2.textContent = 'Castle Fights';
newGameBtn.textContent = 'New Game';
creditsBtn.textContent = 'Credits';

newGameBtn.addEventListener('mouseover', hoverNewGameBtn);
newGameBtn.addEventListener('mouseout', hoverOut);
newGameBtn.addEventListener('click', newGameStarter);
creditsBtn.addEventListener('mouseover', hoverCreditsBtn);
creditsBtn.addEventListener('mouseout', hoverOut);
creditsBtn.addEventListener('click', showCreditsInfo)

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

let isGameOver = false;

var background = new Sprite(
    {
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './LevelsBackground/StartMenu.png',
    }
);
var torch = new Sprite(
    {
        position: {
            x: 425,
            y: 225
        },
        imageSrc: './LevelsBackground/BigTorch.png',
        framesMax: 6
    }
);
var torch2 = new Sprite(
    {
        position: {
            x: 641,
            y: 225
        },
        imageSrc: './LevelsBackground/BigTorch.png',
        framesMax: 6
    }
);
var playerOne = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    imageSrc: '',
    scale: 2.3,
    framesMax: 10,
    offset: {
        x: 50,
        y: 130
    },
    sprites: {
        idleLeft: {
            imageSrc: '',
            framesMax: 10
        },
        idleRight: {
            imageSrc: '',
            framesMax: 10
        },
        runLeft: {
            imageSrc: '',
            framesMax: 8
        },
        runRight: {
            imageSrc: '',
            framesMax: 8
        },
        jumpLeft: {
            imageSrc: '',
            framesMax: 3
        },
        jumpRight: {
            imageSrc: '',
            framesMax: 3
        },
        fallLeft: {
            imageSrc: '',
            framesMax: 2
        },
        fallRight: {
            imageSrc: '',
            framesMax: 2
        },
        attack1Left: {
            imageSrc: '',
            framesMax: 7
        },
        attack1Right: {
            imageSrc: '',
            framesMax: 7
        },
        attack2Left: {
            imageSrc: '',
            framesMax: 7
        },
        attack2Right: {
            imageSrc: '',
            framesMax: 7
        },
        takeHitLeft: {
            imageSrc: '',
            framesMax: 3
        },
        takeHitRight: {
            imageSrc: '',
            framesMax: 3
        },
        deathLeft: {
            imageSrc: '',
            framesMax: 7
        },
        deathRight: {
            imageSrc: '',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 140,
        height: 50
    }
});
//playerOne.style.visibility = 'hidden';

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
};


function showCreditsInfo() {
    document.querySelector('#fonts').style.visibility = 'hidden';
    document.querySelector('#buttons').style.visibility = 'hidden';
    document.querySelector('#creditsArea').style.visibility = 'visible';
    document.querySelector('#selectGameBtns').style.visibility = 'visible';
    document.querySelector('#startGame').style.visibility = 'hidden';

    backBtn.textContent = 'Back';
    backBtn.addEventListener('mouseover', hoverSmallBtn);
    backBtn.addEventListener('mouseout', hoverOutSmallBtn);
    backBtn.addEventListener('click', backToMain);
    backBtn.style.marginLeft = '500px';
}
function hoverNewGameBtn(event) {
    background.changeSprite(0, 0, './LevelsBackground/StartMenuLeftBlue.png', 1);
    torch.changeSprite(425, 225, './LevelsBackground/BigTorchBlue.png', 6, 0.32);

    event.srcElement.style.boxShadow = '-3px -3px 5px 5px rgba(48, 130, 224, 0.7), 3px 3px 5px 5px rgba(74, 48, 224, 0.7)';
    event.srcElement.style.backgroundImage = "url('./LevelsBackground/Button2.png')";
    event.srcElement.style.color = 'white';
}
function hoverCreditsBtn(event) {
    background = new Sprite(
        {
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './LevelsBackground/StartMenuRightBlue.png',
        }
    );
    torch2 = new Sprite(
        {
            position: {
                x: 641,
                y: 225
            },
            imageSrc: './LevelsBackground/BigTorchBlue.png',
            framesMax: 6,
            scale: 0.32
        }
    );
    event.srcElement.style.boxShadow = '-3px -3px 5px 5px rgba(48, 130, 224, 0.7), 3px 3px 5px 5px rgba(74, 48, 224, 0.7)';
    event.srcElement.style.backgroundImage = " url('./LevelsBackground/Button2.png')";
    event.srcElement.style.color = 'white';
}
function hoverOut(event) {
    background = new Sprite(
        {
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './LevelsBackground/StartMenu.png',
        }
    );
    torch = new Sprite(
        {
            position: {
                x: 425,
                y: 225
            },
            imageSrc: './LevelsBackground/BigTorch.png',
            framesMax: 6
        }
    );
    torch2 = new Sprite(
        {
            position: {
                x: 641,
                y: 225
            },
            imageSrc: './LevelsBackground/BigTorch.png',
            framesMax: 6
        }
    );

    event.srcElement.style.boxShadow = '-2px -2px 2px 4px rgba(0, 0, 0, 0.3), 2px 2px 2px 4px rgba(0, 0, 0, 0.3)'
    event.srcElement.style.backgroundImage = " url('./LevelsBackground/Button1.png')";
    event.srcElement.style.color = 'rgb(1, 26, 58)';
}
function newGameStarter(event) {
    document.getElementById('fonts').style.visibility = 'hidden';
    document.getElementById('buttons').style.visibility = 'hidden';
    newGameCreateCont.style.visibility = 'visible';
    startGameBtn.textContent = 'Start';
    startGameBtn.addEventListener('mouseover', hoverSmallBtn);
    startGameBtn.addEventListener('mouseout', hoverOutSmallBtn);
    startGameBtn.addEventListener('click', startGame);

    backBtn.textContent = 'Back';
    backBtn.addEventListener('mouseover', hoverSmallBtn);
    backBtn.addEventListener('mouseout', hoverOutSmallBtn);
    backBtn.addEventListener('click', backToMain);

    startGameBtn.addEventListener('mouseover', hoverSmallBtn);
    startGameBtn.addEventListener('mouseout', hoverOutSmallBtn);

    document.querySelector('#selectFirstPalyer').addEventListener('click', selectElementsForStart);
    document.querySelector('#selectSecondPalyer').addEventListener('click', selectElementsForStart);
    document.querySelector('#selectArena').addEventListener('click', selectElementsForStart);
}
function selectElementsForStart(event) {
    var ul = event.target.parentNode.parentNode;
    var selected;
    if (event.target.tagName === 'IMG') {
        selected = ul.querySelector('.selected');
        if (selected) {
            selected.className = ''
        };
        event.target.parentNode.className = 'selected';
        if (event.target.parentNode.parentNode.parentNode.querySelector('h4').id === 'arenaName') {
            event.target.parentNode.parentNode.parentNode.querySelector('h4').textContent = returnArenaName(event.target.parentNode.id);
            event.target.parentNode.parentNode.parentNode.querySelector('h4').style.color = 'rgb(183, 230, 223)';
        } else {
            event.target.parentNode.parentNode.parentNode.querySelector('h4').textContent = returntWarriorName(event.target.parentNode.id);
            event.target.parentNode.parentNode.parentNode.querySelector('h4').style.color = 'rgb(183, 230, 223)';
        }
    };
}
function startGame() {
    var firstHero = document.querySelector('#firstPlayerList li.selected');
    var secondHero = document.querySelector('#secondPlayerList li.selected');
    var arena = document.querySelector('#selectArena li.selected');

    if (firstHero !== null && secondHero !== null && arena !== null) {

        startGameBtn.style.visibility = 'hidden';
        backBtn.style.marginLeft = '482px';
        backBtn.style.marginTop = '58px';
        firstPlayerList.style.visibility = 'hidden';
        arenasList.style.visibility = 'hidden';
        secondPlayerList.style.visibility = 'hidden';

        background.changeSprite(0, 0, `./LevelsBackground/${arena.id}.png`, 1);

        switch (arena.id) {
            case "castleHall":
                torch.changeSprite(398, 329, './LevelsBackground/BigTorch.png', 6);
                torch2.changeSprite(604, 329, './LevelsBackground/BigTorch.png', 6);
                break;
            case "dungeon":
                torch.changeSprite(433, 245, './LevelsBackground/SmallTorch.png', 6);
                torch2.changeSprite(558, 245, './LevelsBackground/SmallTorch.png', 6);
                break;
            case "wreckedGate":
                torch.changeSprite(70, 183, './LevelsBackground/SmallTorchBlue.png', 6);
                torch2.changeSprite(467, 183, './LevelsBackground/SmallTorchBlue.png', 6);
                break;
        };

        switch (firstHero.id) {
            case 'fantasyWarrior':
                playerOne = new Fighter({
                    position: {
                        x: 0,
                        y: 0
                    },
                    velocity: {
                        x: 0,
                        y: 10
                    },
                    imageSrc: './fighters/Fantasy Warrior/Sprites/IdleRight.png',
                    framesMax: 10,
                    scale: 2.5,
                    offset: {
                        x: 100,
                        y: 90
                    },
                    sprites: {
                        idleLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/IdleLeft.png',
                            framesMax: 10
                        },
                        idleRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/IdleRight.png',
                            framesMax: 10
                        },
                        runLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/RunLeft.png',
                            framesMax: 8
                        },
                        runRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/RunRight.png',
                            framesMax: 8
                        },
                        jumpLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/JumpLeft.png',
                            framesMax: 3
                        },
                        jumpRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/JumpRight.png',
                            framesMax: 3
                        },
                        fallLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/FallLeft.png',
                            framesMax: 3
                        },
                        fallRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/FallRight.png',
                            framesMax: 3
                        },
                        attack1Left: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/Attack1Left.png',
                            framesMax: 7
                        },
                        attack1Right: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/Attack1Right.png',
                            framesMax: 7
                        },
                        attack2Left: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/Attack2Left.png',
                            framesMax: 7
                        },
                        attack2Right: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/Attack2Right.png',
                            framesMax: 7
                        },
                        takeHitLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/TakeHitLeft.png',
                            framesMax: 3
                        },
                        takeHitRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/TakeHitRight.png',
                            framesMax: 3
                        },
                        deathLeft: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/DeathLeft.png',
                            framesMax: 7
                        },
                        deathRight: {
                            imageSrc: './fighters/Fantasy Warrior/Sprites/DeathRight.png',
                            framesMax: 7
                        }
                    },
                    attackBox: {
                        offset: {
                            x: 100,
                            y: 50
                        },
                        width: 140,
                        height: 50
                    }
                });
                break;
            case 'redKnight':
                playerOne = new Fighter({
                    position: {
                        x: 0,
                        y: 0
                    },
                    velocity: {
                        x: 0,
                        y: 10
                    },
                    imageSrc: './fighters/Hero Knight 2/Sprites/IdleRight.png',
                    framesMax: 11,
                    scale: 2.5,
                    offset: {
                        x: 100,
                        y: 47
                    },
                    sprites: {
                        idleLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/IdleLeft.png',
                            framesMax: 11
                        },
                        idleRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/IdleRight.png',
                            framesMax: 11
                        },
                        runLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/RunLeft.png',
                            framesMax: 8
                        },
                        runRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/RunRight.png',
                            framesMax: 8
                        },
                        jumpLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/JumpLeft.png',
                            framesMax: 4
                        },
                        jumpRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/JumpRight.png',
                            framesMax: 4
                        },
                        fallLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/FallLeft.png',
                            framesMax: 4
                        },
                        fallRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/FallRight.png',
                            framesMax: 4
                        },
                        attack1Left: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/Attack1Left.png',
                            framesMax: 6
                        },
                        attack1Right: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/Attack1Right.png',
                            framesMax: 6
                        },
                        attack2Left: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/Attack1Left.png',
                            framesMax: 6
                        },
                        attack2Right: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/Attack1Right.png',
                            framesMax: 6
                        },
                        takeHitLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/TakeHitLeft.png',
                            framesMax: 4
                        },
                        takeHitRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/TakeHitRight.png',
                            framesMax: 4
                        },
                        deathLeft: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/DeathLeft.png',
                            framesMax: 9
                        },
                        deathRight: {
                            imageSrc: './fighters/Hero Knight 2/Sprites/DeathRight.png',
                            framesMax: 9
                        }
                    },
                    attackBox: {
                        offset: {
                            x: 100,
                            y: 50
                        },
                        width: 140,
                        height: 50
                    }
                });
                break;
            case 'igor':
                playerOne = new Fighter({
                    position: {
                        x: 0,
                        y: 0
                    },
                    velocity: {
                        x: 0,
                        y: 10
                    },
                    imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/IdleRight.png',
                    framesMax: 8,
                    scale: 2.5,
                    offset: {
                        x: 100,
                        y: 77
                    },
                    sprites: {
                        idleLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/IdleLeft.png',
                            framesMax: 8
                        },
                        idleRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/IdleRight.png',
                            framesMax: 8
                        },
                        runLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/RunLeft.png',
                            framesMax: 8
                        },
                        runRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/RunRight.png',
                            framesMax: 8
                        },
                        jumpLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/JumpLeft.png',
                            framesMax: 2
                        },
                        jumpRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/JumpRight.png',
                            framesMax: 2
                        },
                        fallLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/FallLeft.png',
                            framesMax: 2
                        },
                        fallRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/FallRight.png',
                            framesMax: 2
                        },
                        attack1Left: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/Attack1Left.png',
                            framesMax: 4
                        },
                        attack1Right: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/Attack1Right.png',
                            framesMax: 4
                        },
                        attack2Left: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/Attack1Left.png',
                            framesMax: 4
                        },
                        attack2Right: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/Attack1Right.png',
                            framesMax: 4
                        },
                        takeHitLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/TakeHitLeft.png',
                            framesMax: 4
                        },
                        takeHitRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/TakeHitRight.png',
                            framesMax: 4
                        },
                        deathLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/DeathLeft.png',
                            framesMax: 6
                        },
                        deathRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 2/Sprites/DeathRight.png',
                            framesMax: 6
                        }
                    },
                    attackBox: {
                        offset: {
                            x: 100,
                            y: 50
                        },
                        width: 140,
                        height: 50
                    }
                });
                break;
            case 'jack':
                playerOne = new Fighter({
                    position: {
                        x: 0,
                        y: 0
                    },
                    velocity: {
                        x: 0,
                        y: 10
                    },
                    imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/IdleRight.png',
                    framesMax: 10,
                    scale: 2.5,
                    offset: {
                        x: 100,
                        y: 57
                    },
                    sprites: {
                        idleLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/IdleLeft.png',
                            framesMax: 10
                        },
                        idleRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/IdleRight.png',
                            framesMax: 10
                        },
                        runLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/RunLeft.png',
                            framesMax: 6
                        },
                        runRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/RunRight.png',
                            framesMax: 6
                        },
                        jumpLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/JumpLeft.png',
                            framesMax: 2
                        },
                        jumpRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/JumpRight.png',
                            framesMax: 2
                        },
                        fallLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/FallLeft.png',
                            framesMax: 2
                        },
                        fallRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/FallRight.png',
                            framesMax: 2
                        },
                        attack1Left: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/Attack1Left.png',
                            framesMax: 4
                        },
                        attack1Right: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/Attack1Right.png',
                            framesMax: 4
                        },
                        attack2Left: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/Attack1Left.png',
                            framesMax: 5
                        },
                        attack2Right: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/Attack1Right.png',
                            framesMax: 5
                        },
                        takeHitLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/TakeHitLeft.png',
                            framesMax: 3
                        },
                        takeHitRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/TakeHitRight.png',
                            framesMax: 3
                        },
                        deathLeft: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/DeathLeft.png',
                            framesMax: 9
                        },
                        deathRight: {
                            imageSrc: './fighters/Medieval Warrior Pack 3/Sprites/DeathRight.png',
                            framesMax: 9
                        }
                    },
                    attackBox: {
                        offset: {
                            x: 100,
                            y: 50
                        },
                        width: 140,
                        height: 50
                    }
                });
                break;
        }

    } else {
        if (firstHero === null) {
            document.querySelector('#playerOneName').style.color = '#E00B0B';
        };
        if (arena === null) {
            document.querySelector('#arenaName').style.color = '#E00B0B';
        };
        if (secondHero === null) {
            document.querySelector('#playerTwoName').style.color = '#E00B0B';
        }
    }
}
function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    torch.update();
    torch2.update();
    //to make players pop-up
    context.fillStyle = 'rgba(255, 255, 255, 0.05)'
    context.fillRect(0, 0, canvas.width, canvas.height);
    playerOne.update();

    playerOne.velocity.x = 0;

    //player One Movement
    if (keys.a.pressed && playerOne.lastKey === 'a') {
        if (playerOne.position.x > -20) {
            playerOne.velocity.x = -5;
            playerOne.switchSprite('runLeft');
        }
    } else if (keys.d.pressed && playerOne.lastKey === 'd') {
        if (playerOne.position.x < 880) {
            playerOne.velocity.x = 5;
            playerOne.switchSprite('runRight');
        }
    } else {
        if(playerOne.lastKey === 'a'){
            playerOne.switchSprite('idleLeft');
        }else if(playerOne.lastKey === 'd'){
            playerOne.switchSprite('idleRight');
        }
    };
    // jumping
    if (playerOne.velocity.y < 0) {
        if(playerOne.lastKey === 'a'){
            playerOne.switchSprite('jumpLeft');
        }else if(playerOne.lastKey === 'd'){
            playerOne.switchSprite('jumpRight');
        }
    } else if (playerOne.velocity.y > 0) {
        if(playerOne.lastKey === 'a'){
            playerOne.switchSprite('fallLeft');
        }else if(playerOne.lastKey === 'd'){
            playerOne.switchSprite('fallRight');
        }
    };

}

function returntWarriorName(heroId) {
    var name = '';
    switch (heroId) {
        case "fantasyWarrior":
            name = 'Fantasy Warrior';
            break;
        case "redKnight":
            name = 'Red Knight';
            break;
        case "igor":
            name = 'Igor The Wrecker';
            break;
        case "jack":
            name = 'Jack The Silver Knight';
            break;
    }
    return name;
}
function returnArenaName(arenaId) {
    var name = '';
    switch (arenaId) {
        case "castleHall":
            name = 'South Hall';
            break;
        case "dungeon":
            name = 'Castle`s Dungeon';
            break;
        case "wreckedGate":
            name = 'The Wrecked Gate';
            break;
    };
    return name;
}
function hoverSmallBtn(event) {
    event.srcElement.style.color = 'white';
    event.srcElement.style.backgroundImage = "url('./LevelsBackground/Button2.png')";
}
function hoverOutSmallBtn(event) {
    event.srcElement.style.color = 'rgb(1, 26, 58)';
    event.srcElement.style.backgroundImage = "url('./LevelsBackground/Button1.png')";
}
function backToMain() {
    location.reload();
}
animate();
window.addEventListener('keydown', (event) => {
    if (!playerOne.dead && !isGameOver) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                playerOne.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                playerOne.lastKey = 'a';
                break;
            case 'w':
                if (playerOne.position.y === 330) {
                    playerOne.velocity.y = -20;
                }
                break;
            case 'r':
                playerOne.attack();
                break;
            case 't':
                playerOne.secondAttack();
                break;
        }
    }
    // enemyKeys
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        //enemyKeys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;

    }

})