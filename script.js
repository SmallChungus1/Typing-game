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
    const quote = await getQuote()
    wordCount = wordsSplit(quote)
    wpmCount(wordCount, sessionTime)
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
       
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}


function startTimer(){
    elapsedtime = 0
    timerElement.innerText = elapsedtime

    let startTime = new Date()
    let endTime = new Date()
    let currTime = new Date()
    let countingTime = 0
    
   countingInterval = setInterval(()=>{
       
           if (pause == true){

            timer.innerText = countingTime
           }else{
            countingTime = countingTime + 1
            timer.innerText = countingTime
           }
            
        
            sessionTime = timer.innerText
        
    }, 1000)


   return sessionTime

}

function getTimerTime(startTime, currTime){ 
    return Math.floor((currTime - startTime) / 1000)
}


generateNewQuote()

function pauseGame(){
    if(pause == false){
     pause = true;
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
        wpm.innerText = Math.round(wordCount/(sessionTime)*60)
    }else{
        wpm.innerText = 0
    }

    
 }