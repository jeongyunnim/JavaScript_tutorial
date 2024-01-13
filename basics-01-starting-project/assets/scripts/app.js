const defaultResult = 0;

let currentResult = defaultResult;

function add(num1, num2)
{
    const result = num1 + num2;
    alert('the result is ' + result);
}

add(currentResult, 2);

currentResult += 30;

outputResult(currentResult, '');