const character = document.querySelector("#character");
const container = document.querySelector(".container");
const prompt = document.querySelector(".prompt");
const dialogueBox = document.querySelector(".dialogue-box");
const loadingScreen = document.querySelector("#loading");
const treeDialogue = document.querySelector(".tree-dialogue");
const showTree = document.querySelector(".showTree");
const ans1 = document.querySelector("#ans1");
const ans2 = document.querySelector("#ans2");


const characterWidth = character.offsetWidth / window.innerWidth * 100;

const step = 1;

let position = {
    x: 70,
    y: 40
}

character.style.left = position.x + "%";
character.style.top = position.y + "%";

let jPoint = 0;
let pPoint = 0;

//functions

function checkTreeCollision(){
    if (position.x == 40){
        changeBg();
    }
}

function changeBg(){
    container.style.backgroundImage = "url('images/heart.png')";
    prompt.textContent = "click the screen to make your choice";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent = "The ancient tree speaks slowly, its voice deep and resonant, like the whisper of wind through old branches";
    treeDialogue.style.display="flex";
    character.style.display="none";
    document.addEventListener("click",showTreeChoices);
}

function showTreeChoices(){
    treeDialogue.style.display="none";
    showTree.style.display="flex";
}

function goNextPage(){
    showTree.style.display="none";
    showTree.style.visibility = "hidden";
    container.style.backgroundImage = "none";
    container.style.backgroundColor = "black";
    prompt.textContent = "";
    character.style.display = "none";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent ="dreams come true..."
    setTimeout(()=>{
        loadingScreen.style.display = "flex";
    },4000);
    setTimeout(()=>{
        window.location.href = "result.html";
    },6000);
}


//events

document.addEventListener("keydown",function(e){
    if (e.key.toLowerCase() == "a"){
        position.x = Math.max (0, position.x-step);
    } else if (e.key.toLowerCase() == "d"){
        position.x = Math.min (100-characterWidth, position.x+step);
    }
    character.style.left = position.x + "%";
    character.style.top = position.y + "%";
    checkTreeCollision()
})

ans1.addEventListener("click",()=>{
    jPoint+=1;
    goNextPage();
})

ans2.addEventListener("click",()=>{
    pPoint+=1;
    goNextPage();
})