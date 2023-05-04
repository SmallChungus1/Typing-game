const quoteUrl = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
let correct = true

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

    if (correct) generateNewQuote()

})

function getQuote(){
    return fetch(quoteUrl)
        .then(response => response.json())
        .then(data => data.content)

}

async function generateNewQuote() {
    const quote = await getQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
       
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(()=>{
        timer.innerText = getTimerTime()
    }, 1000)

}

function getTimerTime(){ 
    return Math.floor((new Date() - startTime) / 1000)
}

generateNewQuote()