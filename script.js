// Input example
// let sentence = 'adik kakak    adik'
//let inputString = sentence.toLowerCase() + '#'

// inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q7']

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

// Finish State
transitionTable[['q6', ' ']] = 'q7'
transitionTable[['q6', '#']] = 'ACCEPT'
transitionTable[['q7', ' ']] = 'q7'
transitionTable[['q7', '#']] = 'ACCEPT'

// pakdhe
transitionTable[['q0', 'p']] = 'q1'
transitionTable[['q1', 'a']] = 'q2'
transitionTable[['q2', 'k']] = 'q3'
transitionTable[['q3', 'd']] = 'q4'
transitionTable[['q4', 'h']] = 'q5'
transitionTable[['q5', 'e']] = 'q6'
transitionTable[['q7', 'p']] = 'q1'

// pit
transitionTable[['q1', 'i']] = 'q8'
transitionTable[['q8', 't']] = 'q6'

// peken
transitionTable[['q1', 'e']] = 'q9'
transitionTable[['q9', 'k']] = 'q10'
transitionTable[['q10', 'e']] = 'q11'
transitionTable[['q11', 'n']] = 'q6'

// jaran
transitionTable[['q0', 'j']] = 'q12'
transitionTable[['q12', 'a']] = 'q13'
transitionTable[['q13', 'r']] = 'q14'
transitionTable[['q14', 'a']] = 'q11'
transitionTable[['q7', 'j']] = 'q12'

// mangan
transitionTable[['q0', 'm']] = 'q15'
transitionTable[['q15', 'a']] = 'q16'
transitionTable[['q16', 'n']] = 'q17'
transitionTable[['q17', 'g']] = 'q14'
transitionTable[['q7', 'm']] = 'q15'

// gedhang
transitionTable[['q0', 'g']] = 'q18'
transitionTable[['q18', 'e']] = 'q19'
transitionTable[['q19', 'd']] = 'q20'
transitionTable[['q20', 'h']] = 'q21'
transitionTable[['q21', 'a']] = 'q22'
transitionTable[['q22', 'n']] = 'q23'
transitionTable[['q23', 'g']] = 'q6'
transitionTable[['q7', 'g']] = 'q18'

// gethuk
transitionTable[['q19', 't']] = 'q24'
transitionTable[['q24', 'h']] = 'q25'
transitionTable[['q25', 'u']] = 'q26'
transitionTable[['q26', 'k']] = 'q6'

// simbok
transitionTable[['q0', 's']] = 'q27'
transitionTable[['q27', 'i']] = 'q28'
transitionTable[['q28', 'm']] = 'q29'
transitionTable[['q29', 'b']] = 'q30'
transitionTable[['q30', 'o']] = 'q26'
transitionTable[['q7', 's']] = 'q27'

// numpak
transitionTable[['q0', 'n']] = 'q31'
transitionTable[['q31', 'u']] = 'q32'
transitionTable[['q32', 'm']] = 'q33'
transitionTable[['q33', 'p']] = 'q34'
transitionTable[['q34', 'a']] = 'q26'
transitionTable[['q7', 'n']] = 'q31'

// tindak
transitionTable[['q0', 't']] = 'q35'
transitionTable[['q35', 'i']] = 'q36'
transitionTable[['q36', 'n']] = 'q37'
transitionTable[['q37', 'd']] = 'q34'
transitionTable[['q7', 't']] = 'q35'


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

