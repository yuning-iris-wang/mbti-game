const character = document.querySelector("#character");
const container = document.querySelector(".container");
const prompt = document.querySelector(".prompt");
const dialogue = document.querySelector("#dialogue");
const dialogueBox = document.querySelector(".dialogue-box");
const carrotShow = document.querySelector(".carrot-choices");
const carrot1 = document.querySelector("#carrot1");
const carrot2 = document.querySelector("#carrot2");
const carrot3 = document.querySelector("#carrot3");
const carrot4 = document.querySelector("#carrot4");
const catShow = document.querySelector(".cat-choices");
const cat1 = document.querySelector("#cat1");
const cat2 = document.querySelector("#cat2");
const cat3 = document.querySelector("#cat3");
const cat4 = document.querySelector("#cat4");
const doorShow = document.querySelector(".door-choices");
const door1 = document.querySelector("#door1");
const door2 = document.querySelector("#door2");
const loadingScreen = document.querySelector("#loading");

let sPoint = 0;
let nPoint = 0;

let catChecked = false;
let carrotChecked = false;
let doorChecked = false;

let carrotChoiceMade = false;
let catChoiceMade = false;

let canMove = true;

const catArea = {
  xMin: 30,
  xMax: 40,
  yMin: 20,
  yMax: 35
}

const carrotArea = { 
  xMin: 0,
  xMax: 30,
  yMin: 70,
  yMax: 100
}

const doorArea = {
  xMin: 80,
  xMax: 90,
  yMin: 10,
  yMax: 70
}

let position = {
  x: 50,
  y: 45
}
character.style.left = position.x + "%";
character.style.top = position.y + "%";

let characterArea={};

const step = 1;

let faceRight = false;

//functions

function updateDirection(){
  if (faceRight){
    character.style.transform = "scaleX(-1)";
  } else {
    character.style.transform = "scaleX(1)";
  }
}

function updateCharacterArea(){
  const characterWidth = character.offsetWidth / container.offsetWidth * 100;
  const characterHeight = character.offsetHeight / container.offsetHeight * 100;
  characterArea = {
    xMin: position.x,
    xMax: position.x + characterWidth,
    yMin: position.y,
    yMax: position.y + characterHeight
  }
}

function checkCatCollision (){
  return !(
    characterArea.xMax < catArea.xMin ||
    characterArea.xMin > catArea.xMax ||
    characterArea.yMax < catArea.yMin ||
    characterArea.yMin > catArea.yMax
  )
}

function checkCarrotCollision (){
  return !(
    characterArea.xMax < carrotArea.xMin ||
    characterArea.xMin > carrotArea.xMax ||
    characterArea.yMax < carrotArea.yMin ||
    characterArea.yMin > carrotArea.yMax
  )
}

function checkDoorCollision (){
  return !(
    characterArea.xMax < doorArea.xMin ||
    characterArea.xMin > doorArea.xMax ||
    characterArea.yMax < doorArea.yMin ||
    characterArea.yMin > doorArea.yMax
  )
}

function closeCarrotChoices(){
  carrotShow.style.display = "none";
  canMove = true;
  carrotChoiceMade = true;
}

function closeCatChoices(){
  catShow.style.display = "none";
  canMove = true;
  catChoiceMade = true;
}

function closeDoorChoices(){
  doorShow.style.display = "none";
  canMove = true;
}

function carrotHandleClick() {
  carrotShow.style.display = "flex";
  canMove = false;
  document.removeEventListener("click",carrotHandleClick)
}

function catHandleClick() {
  catShow.style.display = "flex";
  canMove = false;
  document.removeEventListener("click",catHandleClick)
}

function doorHandleClick() {
  doorShow.style.display = "flex";
  canMove = false;
  document.removeEventListener("click",doorHandleClick)
}

function removeAllClickHandlers(){
  document.removeEventListener("click", catHandleClick);
  document.removeEventListener("click", carrotHandleClick);
  document.removeEventListener("click", doorHandleClick);
}

//events

document.addEventListener("keydown",(e) => {
  if (canMove){
    if (e.key.toLowerCase() == "w"){
    position.y = Math.max(0 , position.y-step);
  } else if (e.key.toLowerCase() == "s"){
    position.y = Math.min(container.offsetHeight-character.offsetHeight,position.y+step);
  } else if (e.key.toLowerCase() == "a"){
    position.x = Math.max (0, position.x-step);
    faceRight = false;
    updateDirection()
  } else if (e.key.toLowerCase() == "d"){
    position.x = Math.min(container.offsetWidth-character.offsetWidth,position.x+step);
    faceRight = true;
    updateDirection()
  }
  character.style.left = position.x + "%";
  character.style.top = position.y + "%";

  updateCharacterArea()

  if (checkCatCollision()){
    dialogue.innerHTML = "There seems to be a cat here. Is the cat the owner of the cabin? Or perhaps a pet raised by the owner? <br/>Click the screen to start a conversation with the cat.";
    catChecked = true;
    sPoint +=1 ;
  } else if (checkCarrotCollision()){
    dialogue.innerHTML = "Here lies a carrot field, filled with big, round carrots.<br/> Click the screen to explore your thoughts. ";
    carrotChecked = true;
    sPoint +=1 ;
  } else if (checkDoorCollision()){
    dialogue.innerHTML = "There's a door here... It doesn't seem to be locked! Do you want to enter the mysterious cabin, or stay outside a little longer? <br/> Click the choice you want to make.";
    doorChecked = true;
  } else {
    dialogue.textContent = "Look Around the Cabin";
  }

  if(carrotChecked && !carrotChoiceMade){
    removeAllClickHandlers()
    document.addEventListener("click",carrotHandleClick);
  }

  if(catChecked && !catChoiceMade){
    removeAllClickHandlers()
    document.addEventListener("click",catHandleClick);
  }

  if(doorChecked){
    removeAllClickHandlers()
    document.addEventListener("click",doorHandleClick);
  }
  }
})

carrot1.addEventListener("click",() => {
  sPoint += 1;
  closeCarrotChoices();
})
carrot2.addEventListener("click",() => {
  sPoint += 1;
  closeCarrotChoices();
})
carrot3.addEventListener("click",() => {
  nPoint += 1;
  closeCarrotChoices();
})
carrot4.addEventListener("click",() => {
  nPoint += 1;
  closeCarrotChoices();
})

cat1.addEventListener("click",() => {
  nPoint += 1;
  closeCatChoices();
})

cat2.addEventListener("click",() => {
  sPoint += 1;
  closeCatChoices();
})

cat3.addEventListener("click",() => {
  sPoint += 1;
  closeCatChoices();
})

cat4.addEventListener("click",() => {
  nPoint += 1;
  closeCatChoices();
})

door1.addEventListener("click",() => {
  closeDoorChoices();
  loadingScreen.style.display = "flex";
  setTimeout(() => {
    window.location.href = "cabin2.html";
  },3000)
})

door2.addEventListener("click",() => {
  closeDoorChoices();
  doorChecked = false;
})
