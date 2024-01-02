const quoteUrl = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const pauseElement = document.getElementById('pauseBtn')
const wpm = document.getElementById('wpm-info')

let correct = true
let pause = false
let sessionTime = 0
let countingInterval
let elapsedtime = 0
let wordCount = 0
let currAudioID


quoteInputElement.addEventListener('input', ()=> {
    const arrayChar = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayChar.forEach((characterSpan, index)=>{
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = true
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }

    })

    if (correct) {
        clearInterval(countingInterval)
        generateNewQuote()
    }

})

function getQuote(){
    return fetch(quoteUrl)
        .then(response => response.json())
        .then(data => data.content)

}

async function generateNewQuote() {
    elapsedtime = 0
    wordCount = 0
    const quote = await getQuote()
    wordCount = wordsSplit(quote)
    
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
       
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    sessionTimeCurr = startTimer()
    wpmCount(wordCount, sessionTimeCurr)
}


function startTimer(){
    elapsedtime = 0

    timerElement.innerText = elapsedtime

    let startTime = new Date()
    let endTime = new Date()
    let currTime = new Date()
    
   countingInterval = setInterval(()=>{

           if (pause){
            timer.innerText = Math.floor(elapsedtime/10)
           // timer.innerText = elapsedtime
           }else{
            elapsedtime++
            timer.innerText = Math.floor(elapsedtime/10)
            //timer.innerText = elapsedtime
           }
            sessionTime = elapsedtime
    }, 100)


   return sessionTime

}

function getTimerTime(startTime, currTime){ 
    return Math.floor((currTime - startTime) / 1000)
}


generateNewQuote()

function pauseGame(){
    if(pause == false){
     pause = true
     pauseElement.innerHTML = 'Resume'
     quoteInputElement.disabled = true
 
    }else{
    pause = false;
     pauseElement.innerHTML = 'Pause'
     quoteInputElement.disabled = false
    }
     
 
 }

 function wordsSplit(word){
    return word.split(' ').filter(function(num) {
        return num != ''
       }).length
 }


 function wpmCount(wordCount, sessionTime){
    if (sessionTime != 0){
        wpmCalc = Math.round(wordCount/(sessionTime)*600)
        wpm.innerText = `${wpmCalc}, Words: ${wordCount}, time: ${sessionTime}`
    }else{
        wpm.innerText = 0
    }


 }


 //main page audio section

 function playSound(audioID){
    if(currAudioID){
        pauseSound(currAudioID)
    }else{

    }
    currAudioID = audioID
    bkgdAudio = document.getElementById(audioID)
    bkgdAudio.play()
    
 }

 function pauseSound(audioID){
    bkgdAudio = document.getElementById(audioID)
    bkgdAudio.pause()
 }

 
const allAudioBtns = document.getElementsByName("audioPlayBtn")
let audioID
for (const aBtn of allAudioBtns){
    aBtn.addEventListener("click",()=>{
        audioID = aBtn.value
        if(audioID === 'pauseAudio'){
            pauseSound(currAudioID)
        }else{
            playSound(audioID)
        }
        
    })
}

    



