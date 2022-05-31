// Input example
// let sentence = 'adik kakak    adik'
//let inputString = sentence.toLowerCase() + '#'

// inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7']

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

// pakdhe
transitionTable[['q0', 'p']] = 'q1'
transitionTable[['q1', 'a']] = 'q2'
transitionTable[['q2', 'k']] = 'q3'
transitionTable[['q3', 'd']] = 'q4'
transitionTable[['q4', 'h']] = 'q5'
transitionTable[['q5', 'e']] = 'q6'
transitionTable[['q6', ' ']] = 'q7'
transitionTable[['q6', '#']] = 'ACCEPT'
transitionTable[['q7', ' ']] = 'q7'
transitionTable[['q7', '#']] = 'ACCEPT'
transitionTable[['q7', 'p']] = 'q1'

// // transition
// transitionTable[['q8', 'a']] = 'q5'

// // adik
// transitionTable[['q0', 'a']] = 'q5'
// transitionTable[['q5', 'd']] = 'q6'
// transitionTable[['q6', 'i']] = 'q4'
// transitionTable[['q4', 'k']] = 'q7'


const checkSentence = (sentence) => {
    // lexical analysis
    let resultLa = document.getElementById('resultLa')
    let laTitle = document.getElementById('laTitle')
    let parserTitle = document.getElementById('parserTitle')
    laTitle.className = 'block'
    parserTitle.className = 'hidden'
    resultLa.innerText = ''
    let inputString = sentence.toLowerCase() + '#'
    let idxChar = 0
    let state = 'q0'
    let currentToken = ''
    let currentChar = ''
    while (state != 'ACCEPT') {
        currentChar = inputString[idxChar]
        currentToken += currentChar
        state = transitionTable[[state, currentChar]]
        acceptStates = ['q6', 'q7']
        if (state == 'q6') {
            console.log('Current Token :', currentToken, ', valid');
            resultLa.innerText = resultLa.innerText + 'Current Token : ' + currentToken + ', valid'
            resultLa.innerText += '\n'
            currentToken = ''
        }
        if (state == 'ERROR') {
            console.log('ERROR');
            resultLa.innerText += 'ERROR'
            resultLa.style.color = 'red'
            break
        }
        idxChar++
    }

    if (state == 'ACCEPT') {
        console.log('semua token pada input : ', sentence, 'valid');
        resultLa.innerText += 'Semua token pada input : ' + sentence + ', valid'
        resultLa.style.color = 'green'

        /*
        // Parser
        parserTitle.className = 'block'
        let tokens = sentence.toLowerCase().split()
        tokens.append('EOS')

        // Symbol definition
        nonTerminals = ['S', 'NN', 'VB']
        terminals = ['adik', 'kakak', 'bakso', 'tahu', 'buku', 'sepatu', 'topi', 'membaca', 'makan', 'memakai']

        // Parse Table
        parseTable = {}
        */
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

