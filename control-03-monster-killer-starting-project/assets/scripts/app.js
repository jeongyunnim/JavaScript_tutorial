const ATTACK_VALUE = 10
const STRONG_ATTACK_VALUE = 17
const MONSTER_VALUE = 14
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster.', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) === true || chosenMaxLife <= 0)
{
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHearlth)
{
    let logEntry;
    
    logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHearlth,
    }
    if (event === LOG_EVENT_GAME_OVER)
    {
        logEntry.taget = 'GAME';
    }
    else if (event === LOG_EVENT_MONSTER_ATTACK)
    {
        logEntry.taget = 'PLAYER';
    }
    else if (event === LOG_EVENT_PLAYER_ATTACK)
    {
        logEntry.taget = 'MONSTER';
    }
    else if (event === LOG_EVENT_PLAYER_HEAL)
    {
        logEntry.taget = 'PLAYER';
    }
    else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK)
    {
        logEntry.taget = 'MONSTER';
    }
    battleLog.push(logEntry);
}

function reset()
{
    resetGame(chosenMaxLife);
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
}

function endRound()
{
    const initailHealth = currentPlayerHealth;
    const monsterDamage = dealPlayerDamage(MONSTER_VALUE);
    currentPlayerHealth -= monsterDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, monsterDamage, currentMonsterHealth, currentPlayerHealth);
    if (currentPlayerHealth <= 0 && hasBonusLife === true)
    {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initailHealth;
        setPlayerHealth(currentPlayerHealth);
        alert("You would be dead but the bonus life saved you!");
        return ;
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0)
    {
        alert("You Won");
        writeToLog(LOG_EVENT_GAME_OVER, "PLAYER WIN", currentMonsterHealth, currentPlayerHealth);
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0)
    {
        alert("You Lost");
        writeToLog(LOG_EVENT_GAME_OVER, "MONSTER WIN", currentMonsterHealth, currentPlayerHealth);
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
    {
        alert("You have a draw!");
        writeToLog(LOG_EVENT_GAME_OVER, "A DRAW", currentMonsterHealth, currentPlayerHealth);
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
    {
        reset();
    }
}

function attackMonster(mode)
{
    let maxDamage;
    let event;

    if (mode === MODE_ATTACK)
    {
        maxDamage = ATTACK_VALUE;
        event = LOG_EVENT_PLAYER_ATTACK;
    }
    else
    {
        maxDamage = STRONG_ATTACK_VALUE
        event = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const PlayerDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= PlayerDamage;
    writeToLog(event, PlayerDamage, currentMonsterHealth, currentPlayerHealth);
}

function attackHandler()
{
    attackMonster(MODE_ATTACK);
    endRound();
}

function strongAttackHandler()
{
    attackMonster(MODE_STRONG_ATTACK);
    endRound();
}

function healPlayerHandler()
{
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE)
    {
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    if (currentPlayerHealth < chosenMaxLife)
    {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler()
{
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);