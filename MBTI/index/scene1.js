const character = document.querySelector('#character');
const showLeft = document.querySelector('.showLeft');
const showRight = document.querySelector('.showRight');
const forestButton = document.querySelector('#forest-button');
const villageButton = document.querySelector('#village-button');
const backLeftButton = document.querySelector("#back-left");
const backRightButton = document.querySelector("#back-right");
const container = document.querySelector(".container");
const dialogueBox = document.querySelector(".dialogue-box");
const prompt = document.querySelector(".prompt");
const showFox = document.querySelector(".showFox");
const foxAns1 = document.querySelector("#ans1");
const foxAns2 = document.querySelector("#ans2");
const foxAns3 = document.querySelector("#ans3");
const foxAns4 = document.querySelector("#ans4");
const showLake = document.querySelector(".showLake");
const foxAns5 = document.querySelector("#ans5");
const foxAns6 = document.querySelector("#ans6");
const foxAns7 = document.querySelector("#ans7");
const foxAns8 = document.querySelector("#ans8");
const loadingScreen = document.querySelector("#loading");


const characterWidth = character.offsetWidth / window.innerWidth * 100;

const step = 1;

let position = {
    x: 40,
    y: 40
}

character.style.left = position.x + "%";
character.style.top = position.y + "%";

let ifInOne = true;

let iPoint = 0;
let ePoint = 0;

//functions

function checkLeft(){
    if(position.x == 0 && ifInOne){
        showLeftBox();
    }
}

function checkRight(){
    if (position.x == 100-characterWidth && ifInOne){
        showRightBox();
    } 
}

function showRightBox(){
    showRight.style.display = "flex";
}

function showLeftBox(){
    showLeft.style.display = "flex";
}

function goVillage(){
    container.style.backgroundImage = "url('images/village.png')";
    showRight.style.display = "none";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent = "The sound of laughter and music grows louder as you approach the village. Under the warm glow of the moon, a group of playful foxes gathers around a crackling bonfire. Their russet fur glimmers in the firelight as they dance, sing, and feast in joyous celebration. The air is filled with the aroma of roasted treats and the melody of nature's orchestra, creating a sense of lively camaraderie that welcomes you with open arms.";
    prompt.textContent = "walk up to the fox mother and talk to her"
    setTimeout(() => {
        showFoxBox();
    },3000);
}

function goForest(){
    container.style.backgroundImage = "url('images/lake.png')";
    showLeft.style.display = "none";
    dialogueBox.textContent = "As you step closer to the lake, the world grows quieter, as if the very air holds its breath. The water is a mirror of the sky, reflecting a thousand stars that shimmer like scattered diamonds. A faint mist dances above the surface, and the gentle ripples carry an air of mystery. The tranquil beauty feels almost otherworldly, inviting you to linger and lose yourself in its serene embrace.";
    prompt.textContent = "walk to the riverside and enjoy the beautiful view"
    setTimeout(() => {
        showLakeBox();
    },3000);
}

function showFoxBox(){
    showFox.style.display = "flex";
}

function showLakeBox(){
    showLake.style.display = "flex";
}

function goResultPage1(){
    container.style.backgroundImage = "none";
    container.style.backgroundColor = "black";
    prompt.style.display = "none";
    character.style.display = "none";
    dialogueBox.textContent ="After having fun with the foxes, you decide to go somewhere else and explore the forest."
    setTimeout(()=>{
        loadingScreen.style.display = "flex";
    },3000);
    setTimeout(()=>{
        window.location.href = "cabin1.html";
    },6000);
}

function goResultPage2(){
    container.style.backgroundImage = "none";
    container.style.backgroundColor = "black";
    prompt.style.display = "none";
    character.style.display = "none";
    dialogueBox.textContent ="After enjoying the beautiful scenary, you decide to go somewhere else and explore the forest."
    setTimeout(()=>{
        loadingScreen.style.display = "flex";
    },3000);
    setTimeout(()=>{
        window.location.href = "cabin1.html";
    },6000);
}

//events

document.addEventListener("keydown",function(e){
    if (e.key.toLowerCase() == "a"){
        position.x = Math.max (0, position.x-step);
        checkLeft()
    } else if (e.key.toLowerCase() == "d"){
        position.x = Math.min (100-characterWidth, position.x+step);
        checkRight()
    }
    character.style.left = position.x + "%";
    character.style.top = position.y + "%";
})

villageButton.addEventListener("click",()=>{
    goVillage();
    ifInOne = false;
});

forestButton.addEventListener("click",()=>{
    goForest();
    ifInOne = false;
});

backRightButton.addEventListener("click",()=>{
    showRight.style.display = "none";
})

backLeftButton.addEventListener("click",()=>{
    showLeft.style.display = "none";
})

foxAns1.addEventListener("click",()=>{
    ePoint += 2;
    showFox.style.display = "none";
    goResultPage1();
})

foxAns2.addEventListener("click",()=>{
    ePoint += 1;
    showFox.style.display = "none";
    goResultPage1();
})

foxAns3.addEventListener("click",()=>{
    iPoint += 1;
    showFox.style.display = "none";
    goResultPage1();
})

foxAns4.addEventListener("click",()=>{
    iPoint += 2;
    showFox.style.display = "none";
    goForest();
})

foxAns5.addEventListener("click",()=>{
    iPoint += 2;
    showLake.style.display = "none";
    goResultPage2();
})

foxAns6.addEventListener("click",()=>{
    iPoint += 1;
    showLake.style.display = "none";
    goResultPage2();
})

foxAns7.addEventListener("click",()=>{
    ePoint += 1;
    showLake.style.display = "none";
    goResultPage2();
})

foxAns8.addEventListener("click",()=>{
    ePoint += 2;
    showLake.style.display = "none";
    goVillage();
})
