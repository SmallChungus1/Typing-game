

const playBtn = document.getElementById("start-button");
const welcomeAudio = new Audio('/pianoChime.mp3');

playBtn.addEventListener("click", ()=>{
    welcomeAudio.play().then(() =>{
        welcomeAudio.addEventListener('ended',()=>{
            document.getElementById("manPageRedirectForm").submit();

        })
      
    }).catch((error)=>{
        console.error("Error playing welcome audio: ", error);
    });
   
})