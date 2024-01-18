const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const DEFAULT_CHOICE = ROCK;

const RESULT_DRAW = "DRAW";
const RESULT_PLAYER = "PLAYER";
const RESULT_COMPUTER = "COMPUTER";

let gameIsRunning = false;

const getPlayerChoice = function()
{
	const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, 'result').toUpperCase();
	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS)
	{
		alert(`Invalid choice! We chose "${DEFAULT_CHOICE}" for you`);
		return (DEFAULT_CHOICE);
	}
	return (selection);
};

const getComputerChoice = function ()
{
	const randomValue = Math.random();
	if (randomValue < 0.34)
		return (SCISSORS);
	else if (randomValue < 0.67)
		return (ROCK)
	else
		return (PAPER);
};

const getWinner = function(playerChoice, computerChoice)
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

startGameBtn.addEventListener('click', function() {
	if (gameIsRunning === true)
	{
		return ;
	}
	gameIsRunning = true;
	console.log("Game is starting...");
	const playerSelction = getPlayerChoice();
	console.log('Your choice is', playerSelction);
	const computerSelction = getComputerChoice();
	console.log('Computer\'s choice is', computerSelction);
	alert(`The Winner is ${getWinner(playerSelction, computerSelction)}`);
});

