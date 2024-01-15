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

function calculate(operator)
{
    const input = getUserInput();
    const initialResult = currentResult;
    if (operator === '+')
    {
        currentResult += input;
    }
    else if (operator === '-')
    {
        currentResult -= input;
    }
    else if (operator === '/')
    {
        currentResult /= input;
    }
    else
    {
        currentResult *= input;
    }
    createOutput(operator, initialResult, input);
    writeToLog(operator, initialResult, input, currentResult);
}

function add()
{
    calculate('+');
}

function subtract()
{
    calculate('-');
}

function multiply()
{
    calculate('*');
}

function divide()
{
    calculate('/');
}

addBtn.addEventListener('click', add);
divideBtn.addEventListener('click', divide);
multiplyBtn.addEventListener('click', multiply);
subtractBtn.addEventListener('click', subtract);
