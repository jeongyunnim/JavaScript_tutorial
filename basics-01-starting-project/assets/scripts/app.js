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

function writeToLog(operator, rhs, lhs, result)
{
    const logEntry = {
        _operation:operator,
        _rhs:rhs,
        _lhs:lhs,
        _result:result,
    };
    console.log(logEntry._operation);
}

function add()
{
    const input = getUserInput();
    const initialResult = currentResult;
    createOutput('+', currentResult, input);
    currentResult += input;
    writeToLog('ADD', initialResult, input, currentResult);
}

function subtract()
{
    const input = getUserInput();
    const initialResult = currentResult;
    createOutput('-', currentResult, input);
    currentResult -= input;
    writeToLog('SUBTRACT', initialResult, input, currentResult);
}

function multiply()
{
    const input = getUserInput();
    const initialResult = currentResult;
    createOutput('*', currentResult, input);
    currentResult *= input;
    writeToLog('MULTIPLY', initialResult, input, currentResult);
}

function divide()
{
    const input = getUserInput();
    const initialResult = currentResult;
    createOutput('/', currentResult, input);
    currentResult /= input;
    writeToLog('DIVIDE', initialResult, input, currentResult);
}

addBtn.addEventListener('click', add);
divideBtn.addEventListener('click', divide);
multiplyBtn.addEventListener('click', multiply);
subtractBtn.addEventListener('click', subtract);
