const character = document.querySelector("#character");
const container = document.querySelector(".container");
const dialogue = document.querySelector("#dialogue");
const dialogueBox = document.querySelector(".dialogue-box");
const answerBox = document.querySelector(".answerbox");
const answerInput = document.querySelector("#password-input");
const submitButton = document.querySelector("#submit-button");
const backButton = document.querySelector("#back-button");
const prompt = document.querySelector("#prompt");
const nextPage = document.querySelector(".nextpage");
const loadingScreen = document.querySelector("#loading");
const prompt2 = document.querySelector(".prompt2");

let sPoint = 0;
let nPoint = 0;

const potArea = {
    xMin: 0,
    xMax: 15,
    yMin: 0,
    yMax: 50
}
  
const mirrorArea = { 
    xMin: 80,
    xMax: 100,
    yMin: 80,
    yMax: 100
}
  
const doorArea = {
    xMin: 90,
    xMax: 100,
    yMin: 10,
    yMax: 30
}

const catArea = {
    xMin: 30,
    xMax: 40,
    yMin: 80,
    yMax: 100
}

const boxArea = {
    xMin: 40,
    xMax: 50,
    yMin: 40,
    yMax: 50
}

let position = {
    x: 10,
    y: 60
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
  
function checkPotCollision (){
    return !(
        characterArea.xMax < potArea.xMin ||
        characterArea.xMin > potArea.xMax ||
        characterArea.yMax < potArea.yMin ||
        characterArea.yMin > potArea.yMax
    )
  }
  
function checkMirrorCollision (){
    return !(
        characterArea.xMax < mirrorArea.xMin ||
        characterArea.xMin > mirrorArea.xMax ||
        characterArea.yMax < mirrorArea.yMin ||
        characterArea.yMin > mirrorArea.yMax
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

function checkBoxCollision (){
    return !(
        characterArea.xMax < boxArea.xMin ||
        characterArea.xMin > boxArea.xMax ||
        characterArea.yMax < boxArea.yMin ||
        characterArea.yMin > boxArea.yMax
    )
}

function showAnswerBox(){
    answerBox.style.display = "flex";
    answerInput.value = "";
    prompt.textContent = "the one-digit password is:";
    answerBox.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
}

function checkAnswer(){
    submitButton.addEventListener("click",function(){
        const userInput = answerInput.value.trim();
        if (userInput == "8"){
            goNextPage();
        } else {
            prompt.textContent = "No It's not the correct password";
            answerBox.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        }
    })

    backButton.addEventListener("click",function(){
        answerBox.style.display = "none";
    })
}

function goNextPage(){
    answerBox.style.display = "none";
    nextPage.style.display = "flex";
    document.addEventListener("keydown", (e)=>{
        if (e.code == "Space"){
            answerBox.style.display = "none";
            loadingScreen.style.display = "flex";
            setTimeout(() => {
                window.location.href = "scene3.html";
            },3000)
        }
    })
}

//

document.addEventListener("keydown",(e) => {
    if (e.key.toLowerCase() == "w"){
        position.y = Math.max(0 , position.y-step);
    } else if (e.key.toLowerCase() == "s"){
        position.y = Math.min(100, position.y+step);
    } else if (e.key.toLowerCase() == "a"){
        position.x = Math.max (0, position.x-step);
        faceRight = false;
        updateDirection()
    } else if (e.key.toLowerCase() == "d"){
        position.x = Math.min(100, position.x+step);
        faceRight = true;
        updateDirection()
    }

    character.style.left = position.x + "%";
    character.style.top = position.y + "%";
    updateCharacterArea()

    if(checkCatCollision()){
        dialogue.textContent = "The cat follows you through the door. Its eyes are fixed in the direction of the mirror. This is a cat that loves looking at itself in the mirror.";
        sPoint+=1;
    } else if (checkPotCollision()){
        dialogue.textContent = "Steam is rising from the pot, and something is cooking inside. Who could be cooking? The house is clearly empty.";
        sPoint+=1;
    } else if (checkDoorCollision()){
        dialogue.textContent = "This is an old, weathered door that seems to have been in use for many years. It exudes a unique scent, one that can only come from ancient trees.";
        sPoint+=1;
    } else if (checkMirrorCollision()){
        dialogue.textContent = "You discover a mirror, and on it is written a strange inscription: The mirror embodies the beauty of symmetry. The essence of symmetry lies in the fact that, no matter your perspective, it remains unchanged.";
        sPoint+=1;
    } else if (checkBoxCollision()){
        dialogue.textContent = "You discover a box that requires a password to open. Do you know the password?";
        showAnswerBox();
        checkAnswer();
    } else {
        dialogue.textContent = "walk around to find clues";
    }
})