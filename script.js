// inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37']

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
    let resultParser = document.getElementById('resultParser')
    laTitle.className = 'block font-medium text-lg'
    parserTitle.className = 'hidden'
    resultLa.innerText = ''
    resultParser.innerText = ''

    let inputString = sentence.toLowerCase() + '#'
    let idxChar = 0
    let state = 'q0'
    let currentToken = ''
    let currentChar = ''
    while (state != 'ACCEPT') {
        currentChar = inputString[idxChar]

        // Error handling
        if (currentChar != ' ' && currentChar != '#' && !alphabetList.includes(currentChar)) {
            console.log('error');
            resultLa.innerText += 'ERROR'
            resultLa.style.color = 'red'
            break
        }

        currentToken += currentChar
        state = transitionTable[[state, currentChar]]
        if (state == 'q6') {
            resultLa.innerText = resultLa.innerText + 'Current Token : ' + currentToken + ', valid'
            resultLa.innerText += '\n'
            currentToken = ''
        }
        if (state == 'ERROR') {
            resultLa.innerText += 'ERROR'
            resultLa.style.color = 'red'
            break
        }
        idxChar++
    }

    if (state == 'ACCEPT') {
        resultLa.innerText += 'Semua token pada input : ' + sentence + ', valid'
        resultLa.style.color = 'green'

        // Parser
        parserTitle.className = 'block font-medium text-lg'
        sentence = sentence.replace(/\s+/g, ' ').trim()
        let tokens = sentence.toLowerCase().split(" ")
        tokens.push('EOS')

        // Symbol definition
        let nonTerminals = ['S', 'NN', 'VB']
        let terminals = ['pakdhe', 'simbok', 'peken', 'jaran', 'gethuk', 'gedhang', 'pit', 'mangan', 'tindak', 'numpak']

        // Parse Table
        let parseTable = {}

        //  kolom S
        parseTable[['S', 'pakdhe']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'simbok']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'peken']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'jaran']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'gethuk']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'gedhang']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'pit']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'mangan']] = ['error']
        parseTable[['S', 'tindak']] = ['error']
        parseTable[['S', 'numpak']] = ['error']
        parseTable[['S', 'EOS']] = ['error']

        // kolom NN
        parseTable[['NN', 'pakdhe']] = ['pakdhe']
        parseTable[['NN', 'simbok']] = ['simbok']
        parseTable[['NN', 'peken']] = ['peken']
        parseTable[['NN', 'jaran']] = ['jaran']
        parseTable[['NN', 'gethuk']] = ['gethuk']
        parseTable[['NN', 'gedhang']] = ['gedhang']
        parseTable[['NN', 'pit']] = ['pit']
        parseTable[['NN', 'mangan']] = ['error']
        parseTable[['NN', 'tindak']] = ['error']
        parseTable[['NN', 'numpak']] = ['error']
        parseTable[['NN', 'EOS']] = ['error']

        // kolom VB
        parseTable[['VB', 'mangan']] = ['mangan']
        parseTable[['VB', 'tindak']] = ['tindak']
        parseTable[['VB', 'numpak']] = ['numpak']
        parseTable[['VB', 'pakdhe']] = ['error']
        parseTable[['VB', 'simbok']] = ['error']
        parseTable[['VB', 'peken']] = ['error']
        parseTable[['VB', 'jaran']] = ['error']
        parseTable[['VB', 'gethuk']] = ['error']
        parseTable[['VB', 'gedhang']] = ['error']
        parseTable[['VB', 'pit']] = ['error']
        parseTable[['VB', 'EOS']] = ['error']

        // Inisialisasi stack
        let stack = []
        stack.push('#')
        stack.push('S')

        // Input reading initialization
        let idxToken = 0
        let symbol = tokens[idxToken]

        // parsing proses
        while (stack.length > 0) {
            let top = stack[stack.length - 1]
            resultParser.innerText = resultParser.innerText + 'Top = ' + top + '\n'
            resultParser.innerText = resultParser.innerText + 'Symbol = ' + symbol + '\n'
            if (terminals.includes(top)) {
                resultParser.innerText = resultParser.innerText + top + ' adalah simbol terminal \n'
                if (top == symbol) {
                    stack.pop()
                    idxToken++
                    symbol = tokens[idxToken]
                    if (symbol == 'EOS') {
                        resultParser.innerText = resultParser.innerText + 'Isi stack = ' + '[' + stack + ']' + '\n \n'
                        stack.pop()
                    }
                } else {
                    resultParser.innerText = resultParser.innerText + 'error \n \n'
                    break
                }
            } else if (nonTerminals.includes(top)) {
                resultParser.innerText = resultParser.innerText + top + ' adalah simbol non-terminal \n'
                if (parseTable[[top, symbol]][0] != 'error') {
                    stack.pop()
                    let symbolToBePushed = parseTable[[top, symbol]]
                    for (let i = symbolToBePushed.length - 1; i > -1; i--) {
                        stack.push(symbolToBePushed[i])
                    }
                } else {
                    resultParser.innerText = resultParser.innerText + 'error \n \n'
                    break
                }
            } else {
                resultParser.innerText = resultParser.innerText + 'error \n \n'
                break
            }
            resultParser.innerText = resultParser.innerText + 'Isi stack = ' + '[' + stack + ']' + '\n \n'
        }

        // Conclusion
        if (symbol == 'EOS' && stack.length == 0) {
            resultParser.innerText = resultParser.innerText + 'Input string "' + sentence + '" diterima, sesuai Grammar \n'
            resultParser.style.color = 'green'
        } else {
            resultParser.innerText = resultParser.innerText + 'Error, input string "' + sentence + '" tidak diterima, tidak sesuai Grammar \n'
            resultParser.style.color = 'red'
        }
    }
}

let form = document.getElementById('form')
let button = document.getElementById('checkButton')

const handleSubmit = (e) => {
    let sentence = document.getElementById('sentence').value
    checkSentence(sentence)
    e.preventDefault()
}

form.addEventListener('submit', (e) => handleSubmit(e))

