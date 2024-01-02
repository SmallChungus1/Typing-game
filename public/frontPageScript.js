

const playBtn = document.getElementById("start-button");
const welcomeAudio = new Audio('/pianoChime.mp3');

playBtn.addEventListener("click", ()=>{
    playBtn.classList.add("start-button-pushed")
    welcomeAudio.play().then(() =>{
        welcomeAudio.addEventListener('ended',()=>{
            document.getElementById("manPageRedirectForm").submit();
            playBtn.classList.remove("start-button-pushed")
        })
      
    }).catch((error)=>{
        console.error("Error playing welcome audio: ", error);
    });
   
})