const canvas = document.querySelector('canvas'); //pobieranie obiektu-korzystanie
const ctx = canvas.getContext('2d'); //pobierz 2d aby korzystac z metod
canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20; //wielkosc pilki

let ballX = cw/2-ballSize/2; //490 - 510 pikseli  - odleglosc pilki(lewy corner) od 0
let ballY = ch/2-ballSize/2;

const paddelHeight = 100; //rakietka wymiary
const paddelWidth = 20;

const playerX = 70; //pozycja playera w osi X
const aiX = 910;

let playerY = 200; //pozycja playera w osi Y
let aiY = 200;

const lineWidth = 6;  //linia srodkowa
const lineHeight = 16;

let ballSpeedX = 4;  //predkosc pilki w osi X
let ballSpeedY = 4;  //predkosc pilki w osi Y

let playerScore = 0;
let aiScore = 0;

function ai(){ //przeciwnik
    ctx.fillStyle = "yellow";
    ctx.fillRect(aiX,aiY,paddelWidth,paddelHeight);
}
function player(){
    ctx.fillStyle = "#7FFF00";
    ctx.fillRect(playerX,playerY,paddelWidth,paddelHeight);
}
function table(){  
    ctx.fillStyle = "black"; //rysuj na dany kolor(domyslnie czarny)
    ctx.fillRect(0,0,cw,ch); //od kiedy do kiedy
    for(let linePosition = 20;linePosition < ch; linePosition += 30){ //licznik,do kidy,dopoki nie przekroczy 500px
        ctx.fillStyle = "gray";
        ctx.fillRect(cw/2 - lineWidth/2,linePosition,lineWidth,lineHeight)
    }
}
function ball(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(ballX,ballY,ballSize,ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    else if (ballX <=0 || ballX + ballSize >=cw){
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    else if (ballX < playerX + ballSize/2 && ballY >= playerY && ballY <= playerY + paddelHeight){  //playerY (lewy gorny rog rakiety) ballY (lewy gorny rog pilki)
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    else if (ballX > aiX - ballSize/2 && ballY >= aiY && ballY <= aiY + paddelHeight){
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    else if (ballX < playerX){
        console.log("lewa sciana")
        aiScore++;
        console.log(aiScore)
        return ballX = cw/2-ballSize/2, ballY = ch/2-ballSize/2, ballSpeedX = 3, ballSpeedY = 3;
    }
    else if (ballX > aiX){
        console.log("prawa sciana")
        playerScore++;
        return ballX = cw/2-ballSize/2, ballY = ch/2-ballSize/2, ballSpeedX = 3, ballSpeedY = 3;
    }
    if(aiScore == 5 || playerScore == 5){
        aiScore = 0;
        playerScore = 0;
    }
}

topCanvas = canvas.offsetTop;

function playerPosition(e){ //event
    // console.log ("pozycja myszy to " + (e.clientY - topCanvas))  //clientY-pozycja myszki
    playerY = e.clientY - topCanvas - paddelHeight/2;
    if (playerY >= ch - paddelHeight){ //rakietka na dole poza canvas
        playerY = ch - paddelHeight
    }
    if (playerY <= 0 ){  //rakietka na gorze poza canvas
        playerY = 0;
    }
}

function speedUp(){
    if(ballSpeedX > 0){
        ballSpeedX += 0.3;
    }
    else if(ballSpeedX < 0){
        ballSpeedX -= 0.3;
    }
    else if (ballSpeedY > 0){
        ballSpeedY += 0.3;
    }
    else if (ballSpeedY < 0){
        ballSpeedY -= 0.3;
    }
}


function aiPosition(){
    var middlePaddel = aiY + paddelHeight/2;
    var middleBall = ballY + ballSize/2;

    if(ballX > 500){
        if(middlePaddel - middleBall > 550){
            aiY -=80;
        }
        else if(middlePaddel - middleBall > 300){
            aiY -=30;
        }
        else if(middlePaddel - middleBall > 250){
            aiY -=25;
        }
        else if(middlePaddel - middleBall > 200){
            aiY -=20;
        }
        else if(middlePaddel - middleBall > 150){
            aiY -=45;
        }
        else if(middlePaddel - middleBall > 100){
            aiY -=40;
        }
        else if(middlePaddel - middleBall > 50){
            aiY -= 20;
        }
        else if(middlePaddel - middleBall < -550){
            aiY += 80;
        }
        else if(middlePaddel - middleBall < -300){
            aiY += 30;
        }
        else if(middlePaddel - middleBall < -250){
            aiY += 25;
        }
        else if(middlePaddel - middleBall < -200){
            aiY +=30;
        }
        else if(middlePaddel - middleBall < -150){
            aiY +=30;
        }
        else if(middlePaddel - middleBall < -100){
            aiY +=25;
        }
        else if(middlePaddel - middleBall < -50){
            aiY += 20;
        }
    }
    else if (ballX <= 500 && ballX > 150){
        if(middlePaddel - middleBall > 200){
            aiY -= 20;
        }
        if(middlePaddel - middleBall > 150){
            aiY -= 30;
        }
        else if(middlePaddel - middleBall > 100){
            aiY -= 40;
        }
        else if(middlePaddel - middleBall < -200){
            aiY += 20;
        }
        else if(middlePaddel - middleBall < -200){
            aiY += 30;
        }
        else if(middlePaddel - middleBall < -100){
            aiY += 40;
        }
    }
}
function score(){
    var text = document.getElementById("score").innerHTML = playerScore + ":" + aiScore;
}
canvas.addEventListener("mousemove",playerPosition)
function game(){
    score()
    table()
    ball()
    player()
    ai()
    aiPosition()
}
setInterval(game,1000/60) //funkcja wywolujaca funkcje w metodzie co x sekund
