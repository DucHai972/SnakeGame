const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector("#score");
const res = document.querySelector("#res");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xV = unitSize;
let yV = 0;
let foodX;
let foodY;
let Currentscore = 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0},
];

window.addEventListener("keydown", changeDirection);
res.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    score.textContent = Currentscore;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running)  {
        setTimeout(() =>  {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }  else  {
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max)  {
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xV,
                  y: snake[0].y + yV};
    snake.unshift(head);
    
    //food eaten
    if(snake[0].x == foodX && snake[0].y == foodY)  {
        Currentscore += 1;
        score.textContent = Currentscore;
        createFood();
    }  else  {
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart) =>  {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    console.log(keyPressed);
    const goingUP = (yV == -unitSize);
    const goingDOWN = (yV == unitSize);
    const goingRIGHT = (xV == unitSize);
    const goingLEFT = (xV == -unitSize);

    switch(true)  {
        case(keyPressed == LEFT && !goingRIGHT):
            xV = -unitSize;
            yV = 0;
            break;
        case(keyPressed == UP && !goingDOWN):
            xV = 0;
            yV = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xV = unitSize;
            yV = 0;
            break;
        case(keyPressed == DOWN && !goingUP):
            xV = 0;
            yV = unitSize;
            break;
    }

};
function checkGameOver(){
    for(let i = 1; i < snake.length; i++)  {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false;
    }

    snake.forEach((snakePart) =>  {
        if(snakePart.x < 0)
            snakePart.x = gameWidth;
        if(snakePart.x > gameWidth)
            snakePart.x = 0;
        if(snakePart.y < 0)
            snakePart.y = gameHeight;
        if(snakePart.y > gameHeight)
            snakePart.y = 0;
    })
    
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
    running = false;
};
function resetGame(){
    Currentscore = 0;
    xV = unitSize;
    yV = 0;
    snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
    ];
    gameStart();
};