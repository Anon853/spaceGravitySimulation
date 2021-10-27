'use strict';

function setup (){
    createCanvas (1000, 600);
    textSize(20);
    let xPos = 0;
    let yPos = 505;
    //generates ball and planet data, fills arrays
    for (let i = 0; i < ballVelocity.length; i++) {
      xPos += 75;
      ballArray[i] = new Ball(xPos, ballVelocity[i]);  
      planetArray[i] = new Planet(xPos, yPos, planetImageArray[i]);
    }
    //sets timers from functions.js
    setInterval(() => { 
      setIntervalFunc0();
      setIntervalFunc1();
      setIntervalFunc2();
      setIntervalFunc3();
      setIntervalFunc4();
      setIntervalFunc5();
      setIntervalFunc6();
      setIntervalFunc7();
      setIntervalFunc8();
      setIntervalFunc9();
      setIntervalFunc10();
    }, 10);  

    setInterval(() => { 
      displayTimeHolder++;
      if (displayTimeHolder > 5350) {
        return;
      } else {
        time();
      }
    }, 10);
    
    function time(){
      let time = millis();
      timeDisplay = time / 1000;
    }
     time();
}

  function draw(){ 
    background(0, 0, 0);
    stroke(100);
    line(0, 500, 850, 500);
    line(0, 100, 850, 100);
    text("1 km", 900, 100);
    text("0 km", 900, 500);
    text("Gravity Fall Simulation", width/2 -100, 10);
    text("t = " + timeDisplay, 0, 80);
    text("velocity = " , 0, 50);
    fill(255, 255, 255);

    //draws falling balls and planets
    ballArray.forEach(ballArray => {
      ballArray.move();
      ballArray.display();
      
    if (ballArray.y > 490) {
      ballArray.ballVelocity = 0;   
    }
  });

    planetArray.forEach(planetArray => {
    planetArray.display();
  });

  //returns data of falling ball graphic
  //[t] input parameter based on timer to re-calculate ballVelocity each millisecond of free fall 
  const calc = (g, t) => {
    //let d = 0;
    let v = 0;
    v = g * t;
    //d = v * t / 3600;
    t = Math.sqrt(2 * 1000 / g);
    const returnArray = [v, t];
    return returnArray;
  }
  
  //calls calc(), displays return values of calc(), increments xTextPos pixel position for each planet
  const calcInputAndDisplay = () => {
    let xTextPos = 0;
    let results = [];
  for (let i = 0; i < calcGravityDataArray.length; i++) {
    results = calc(calcGravityDataArray[i], timeCalc[i]);
    xTextPos += 75;

    textSize(13);
    noStroke();
    fill(255, 255, 255);

    //velocity display
    text(Math.floor(results[0]) + "km/h", xTextPos, 50);
  
    //falltime display
    if(timeDisplay >= results[1]) {

        fill(0, 255, 0);
        text(results[1].toFixed(3) + " s", xTextPos, 80);   
        ballArray[i].ballVelocity = 0; 
      }else{
        fill(255, 0, 0);
        text(timeDisplay + " s", xTextPos, 80);
      }
    fill(255, 255, 255);
    text("Gravity \n" + calcGravityDataArray[i] + " m/s²", xTextPos -22, 580);
  }
}
calcInputAndDisplay();
}

