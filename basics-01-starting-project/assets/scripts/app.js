const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = []

function getUserInput()
{
    return (parseInt(userInput.value));
}

function createOutput(operator, rhs, lhs)
{
    const description = `${rhs} ${operator} ${lhs}`
    outputResult(currentResult, description);
}

function add()
{
    const input = getUserInput();
    const initialResult = currentResult;
    createOutput('+', currentResult, input);
    currentResult += input;
    const logEntry = 
    {
        operation:'ADD',
        rhs:initialResult,
        lhs:input,
        result:currentResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function subtract()
{
    const input = getUserInput();
    createOutput('-', currentResult, input);
    currentResult -= input;
}

function multiply()
{
    const input = getUserInput();
    createOutput('*', currentResult, input);
    currentResult *= input;
}

function divide()
{
    const input = getUserInput();
    createOutput('/', currentResult, input);
    currentResult /= input;
}

addBtn.addEventListener('click', add);
divideBtn.addEventListener('click', divide);
multiplyBtn.addEventListener('click', multiply);
subtractBtn.addEventListener('click', subtract);
