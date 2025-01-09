const button = document.querySelector('button');
const loadingScreen = document.querySelector("#loading");

button.addEventListener("click",function(){
    loadingScreen.style.display = "flex";
    setTimeout(() => {
        window.location.href = "scene1.html";
  },3000)
})