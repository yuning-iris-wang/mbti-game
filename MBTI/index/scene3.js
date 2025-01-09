const character = document.querySelector("#character");
const container = document.querySelector(".container");
const catBox = document.querySelector(".showCat");
const prompt = document.querySelector(".prompt");
const ans1 = document.querySelector("#ans1");
const ans2 = document.querySelector("#ans2");
const dialogueBox = document.querySelector(".dialogue-box");
const loadingScreen = document.querySelector("#loading");
const promptPic = document.querySelector("#prompt-pic");
const cat = document.querySelector("#cat");

const characterWidth = character.offsetWidth / window.innerWidth * 100;

const step = 1;

let position = {
    x: 0,
    y: 40
}

character.style.left = position.x + "%";
character.style.top = position.y + "%";

let fPoint = 0;
let tPoint = 0;

const dialogues1 = [
    "Thank you for saving me. I must tell you the truth—I am no ordinary cat. I am a magical guardian of this land. The greatest secret of this village lies with an ancient tree, hidden deep within the forest.",
    "Thank you for saving me. I must tell you the truth—I am no ordinary cat. I am a magical guardian of this land. The greatest secret of this village lies with an ancient tree, hidden deep within the forest.",
    "This tree is not just any tree; it holds the essence of life and protects the balance of this realm.",
    "However, its magic is fading, just as mine was. If it withers, the village and all its inhabitants will fall into despair. You might be the only one who can save it...",
    "I'll use my magic to send you there..."
]

const dialogues2 = [
    "You decide not to help the stray cat, torn by the thought that the treasure chest might hold something of greater importance.",
    "You decide not to help the stray cat, torn by the thought that the treasure chest might hold something of greater importance.",
    "With a heavy heart, you open the chest. Inside, there is no gold, no jewels—just a worn, ancient map. The edges are frayed, and the ink has faded in places, but its allure is undeniable.",
    "Curious, you unfold the map and spread it out before you. The parchment reveals a detailed depiction of the forest you're in.",
    "Your eyes trace a path marked with strange symbols, leading to an illustration of a grand, mysterious tree, unlike any you've ever seen. The tree is labeled with an inscription: The Heart of the Forest.",
    "As you examine the map further, you notice that the tree's location isn't far from where you stand. A strange pull draws you in—a feeling that this tree holds the answers to questions you haven't even asked yet.",
    "Determined to uncover the truth, you fold the map and prepare yourself for the journey ahead."
]

// functions

function checkCatCollision(){
    if(position.x == 55){
        showCatBox();
    }
}

function showCatBox(){
    catBox.style.display = "flex";
}

function goCatPage(){
    catBox.style.display = "none";
    cat.style.display="none";
    container.style.backgroundImage = "url('images/catspeak-bg.png')";
    prompt.textContent="click to check next dialogue"
    character.style.display = "none";
    promptPic.style.display = "block";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent = dialogues1[0];
    let currentIndex = 0;
    document.addEventListener("click",function(){
        if (currentIndex <= 3){
            currentIndex += 1;
            dialogueBox.textContent = dialogues1[currentIndex];
        } else if (currentIndex == 4){
            goNextPage()
        }
    })
}

function goMapPage(){
    catBox.style.display = "none";
    cat.style.display="none";
    container.style.backgroundImage = "url('images/map.jpeg')";
    prompt.textContent="click to check next dialogue"
    character.style.display = "none";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent = dialogues2[0];
    let currentIndex = 0;
    document.addEventListener("click",function(){
        if (currentIndex <= 5){
            currentIndex += 1;
            dialogueBox.textContent = dialogues2[currentIndex];
        } else if (currentIndex == 6){
            goNextPage()
        }
    })
}

function goNextPage(){
    container.style.backgroundImage = "none";
    container.style.backgroundColor = "black";
    prompt.style.display = "none";
    promptPic.style.display = "none";
    character.style.display = "none";
    cat.style.display = "none";
    dialogueBox.style.color = "brown";
    dialogueBox.style.fontSize="20px";
    dialogueBox.style.fontFamily="Times New Roman, Times, serif";
    dialogueBox.textContent ="to the ancient tree..."
    setTimeout(()=>{
        loadingScreen.style.display = "flex";
    },3000);
    setTimeout(()=>{
        window.location.href = "scene4.html";
    },6000);
}

// events

document.addEventListener("keydown",function(e){
    if (e.key.toLowerCase() == "a"){
        position.x = Math.max (0, position.x-step);
    } else if (e.key.toLowerCase() == "d"){
        position.x = Math.min (100-characterWidth, position.x+step);
    }
    character.style.left = position.x + "%";
    character.style.top = position.y + "%";
    checkCatCollision()
})

ans1.addEventListener("click",function(){
    fPoint += 1;
    goCatPage();
})

ans2.addEventListener("click",function(){
    tPoint += 1;
    goMapPage();
})