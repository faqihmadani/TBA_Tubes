// Input example
// let sentence = 'adik kakak    adik'
//let inputString = sentence.toLowerCase() + '#'

// inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8']

let transitionTable = {}

stateList.forEach(state => {
    alphabetList.forEach(alphabet => {
        transitionTable[[state, alphabet]] = 'ERROR'
    });
    transitionTable[[state, '#']] = 'ERROR'
    transitionTable[[state, ' ']] = 'ERROR'
});

// starting node space
transitionTable[['q0', ' ']] = 'q0'

// kakak
transitionTable[['q0', 'k']] = 'q1'
transitionTable[['q1', 'a']] = 'q2'
transitionTable[['q2', 'k']] = 'q3'
transitionTable[['q3', 'a']] = 'q4'
transitionTable[['q4', 'k']] = 'q7'
transitionTable[['q7', ' ']] = 'q8'
transitionTable[['q7', '#']] = 'ACCEPT'
transitionTable[['q8', ' ']] = 'q8'
transitionTable[['q8', '#']] = 'ACCEPT'

// transition
transitionTable[['q8', 'k']] = 'q1'
transitionTable[['q8', 'a']] = 'q5'

// adik
transitionTable[['q0', 'a']] = 'q5'
transitionTable[['q5', 'd']] = 'q6'
transitionTable[['q6', 'i']] = 'q4'
transitionTable[['q4', 'k']] = 'q7'

// lexical analysis
const checkSentence = (sentence) => {
    let result = document.getElementById('result')
    result.textContent = ''
    let inputString = sentence.toLowerCase() + '#'
    let idxChar = 0
    let state = 'q0'
    let currentToken = ''
    let currentChar = ''
    while (state != 'ACCEPT') {
        currentChar = inputString[idxChar]
        currentToken += currentChar
        state = transitionTable[[state, currentChar]]
        if (state == 'q7') {
            console.log('Current Token :', currentToken, ', valid');
            result.textContent = result.textContent + 'Current Token : ' + currentToken + ', valid'
            result.textContent += '\n'
        }
        if (state == 'ERROR') {
            console.log('ERROR');
            result.textContent += 'ERROR'
            result.style.color = 'red'
            break
        }
        idxChar++
    }

    if (state == 'ACCEPT') {
        console.log('semua token pada input : ', sentence, 'valid');
        result.textContent += 'Semua token pada input : ' + sentence + ', valid'
        result.style.color = 'green'
    }
}


let form = document.getElementById('form')
let button = document.getElementById('checkButton')

const handleSubmit = (e) => {
    let sentence = document.getElementById('sentence').value
    checkSentence(sentence)
    e.preventDefault()
}

//formSentence.addEventListener('submit', (e) => handleSubmit(e, sentence))
//button.addEventListener('click', (e) => handleSubmit(e))
form.addEventListener('submit', (e) => handleSubmit(e))

