const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const DEFAULT_CHOICE = ROCK;

const RESULT_DRAW = "... NO ONE";
const RESULT_PLAYER = "PLAYER";
const RESULT_COMPUTER = "COMPUTER";

let gameIsRunning = false;

const getPlayerChoice = () =>
{
	const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, 'result').toUpperCase();
	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS)
	{
		alert(`Invalid choice! We chose "${DEFAULT_CHOICE}" for you`);
		return (DEFAULT_CHOICE);
	}
	return (selection);
};

const getComputerChoice = () =>
{
	const randomValue = Math.random();
	if (randomValue < 0.34)
		return (SCISSORS);
	else if (randomValue < 0.67)
		return (ROCK)
	else
		return (PAPER);
};

const getWinner = (playerChoice, computerChoice) =>
{
	if (playerChoice === computerChoice)
	{
		return (RESULT_DRAW);
	}
	else if (
		playerChoice === ROCK && computerChoice === SCISSORS ||
		playerChoice === SCISSORS && computerChoice === PAPER ||
		playerChoice === PAPER && computerChoice === ROCK)
	{
		return (RESULT_PLAYER);
	}
	else
		return (RESULT_COMPUTER);
}

startGameBtn.addEventListener('click', () => 
{
	if (gameIsRunning === true)
	{
		return ;
	}
	gameIsRunning = true;
	console.log("Game is starting...");
	const playerSelction = getPlayerChoice();
	const computerSelction = getComputerChoice();
	const winner = getWinner(playerSelction, computerSelction);
	let message = `You picked ${playerSelction} Computer picked ${computerSelction} `;
	if (winner === RESULT_DRAW)
	{
		message += 'had a draw.';
	}
	else if (winner === RESULT_PLAYER)
	{
		message += 'won.';
	}
	else
	{
		message += 'lost.'
	}
	alert(message);
	gameIsRunning = false;
});

// game 과 관련 없음.

const sumUp = (resultHandler, ...numbers) => {
	const validateNumber = (number) => {
		return isNaN(number) ? 0 : number;
	}

	let sum = 0;
	for (const num of numbers)
	{
		sum += validateNumber(num);
	}
	resultHandler(sum, 'The Result after adding all numbers is');
};

const subtractUp = function (resultHandler, ...numbers) {
	let sum = 0;
	for (const num of numbers)
	{
		sum -= num;
	}
	resultHandler(sum, 'The Result after subtracting all numbers is');
};

const showResult = (result, messageText) => {
	alert(messageText + ' ' + result);
};

sumUp(showResult, 1, 2, 3, 4, 5, 6);
subtractUp(showResult, 1, 2, 3, 4, 5, 6);