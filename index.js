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
}
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
        console.log();
        if (event.target.parentNode.parentNode.parentNode.querySelector('h4').id === 'arenaName') {
            event.target.parentNode.parentNode.parentNode.querySelector('h4').textContent = returnArenaName(event.target.parentNode.id);
            event.target.parentNode.parentNode.parentNode.querySelector('h4').style.color = 'rgb(183, 230, 223)';
        } else {
            event.target.parentNode.parentNode.parentNode.querySelector('h4').textContent = returntWarriorName(event.target.parentNode.id);
            event.target.parentNode.parentNode.parentNode.querySelector('h4').style.color = 'rgb(183, 230, 223)';
        }
    }
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
        }
    }
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