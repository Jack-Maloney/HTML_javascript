//collection of arrays
/*
var cars = ['Tesla','Civic','Mater','Mack']
var planes = [];


//example of for loop

console.log(cars.length);
for(var i = 0; i < cars.length; i++){
console.log(cars[i]);
}

for(var i = 0; i<100; i++){
    planes[i] = 'Plane'  + (i + 1).toString();
    console.log(planes[i]);
}*/


//starts game code
var c = document.querySelector('canvas');
var ctx = c.getContext('2d');


//timer goes here
var timer = requestAnimationFrame(main);

//number of cars
var numCars = 3;
//array of cars
var car = [];

var winner;

var gameStates = [];

var currentState = 0;
var choice = 1;

function GameObject(){
    this.x = 50;
    this.y = 50;
    this.w = 50;
    this.h = 50;
    this.color = 'red';
    this.speed = 1;
    this.fuel = 100;

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.move = function(){
        this.x += this.speed;
    }
}

//creates instance of startline
var startline = new GameObject();
startline.x = 100;
startline.y = 100;
startline.w = 10;
startline.h = 400;
startline.color = 'green';

//creates instance of finishline
var finishline = new GameObject();
finishline.x = 700;
finishline.y = 100;
finishline.w = 10;
finishline.h = 400;
finishline.color = 'red';

for (var i = 0; i < numCars; i++){
    car[i] = new GameObject();
    car[i].speed = randomRange(5,2);
    car[i].w = 75;
    car[i].x = 20;
}
//changes y position
car[0].y = 150;
car[1].y = 250;
car[2].y = 350;

//change the color
car[0].color = 'orange'
car[1].color = 'blue'
car[2].color = 'pink'

gameStates[0] = function(){
    //player pick winner
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Choose the winner', c.width/2, c.height/2-100)
    ctx.fillText('Pick 1, 2, or 3 key', c.width/2, c.height/2+100)
}

gameStates[1] = function(){
    //race happens
    for(var i = 0; i < car.length; i++){
        car[i].move();
        if(car[i].x > finishline.x){
            console.log(car[i].color + ' is the winner');
            winner = car.indexOf(car[i]);
            currentState = 2;
        }
    }
}

gameStates[2] = function(){
    //winner is declared
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';

    if(winner === choice){
        ctx.fillText('Winner is: Car: ' + (winner + 1).toString(), c.width/2, c.height/2-100)
        ctx.fillText('You picked the winner', c.width/2, c.height/2+100);
    }
    else{
        ctx.fillText('Winner is: Car: ' + (winner + 1).toString(), c.width/2, c.height/2-100)
        ctx.fillText('You did not pick the winner', c.width/2, c.height/2+100)

    }
}


document.addEventListener('keydown', chooseWinner)

function chooseWinner(e){
    if(currentState == 0){
        if(e.keyCode === 49){
            choice = 0;
            currentState = 1;
        }

        if(e.keyCode === 50){
            choice = 1;
            currentState = 1;
        }

        if(e.keyCode === 51){
            choice = 2;
            currentState = 1;
        }
    }

}



function main(){
    ctx.clearRect(0, 0, c.width, c.height);
    startline.draw();
    finishline.draw();
    for(var i = 0; i < numCars; i++){
        car[i].draw();
    }

    gameStates[currentState]();
    timer = requestAnimationFrame(main);
}

