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

let battleLog = [];

function getMaxLifeValues()
{
    const enteredValue = prompt('Maximum life for you and the monster.', '100');
    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) === true || parsedValue <= 0)
    {
        throw { message: 'Invalid user input, not a number!'};
    }
    return parsedValue;
}

let chosenMaxLife;

try 
{
    chosenMaxLife = getMaxLifeValues();
}
catch (error)
{
    console.log(error);
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
    switch(event) 
    {
        case (LOG_EVENT_GAME_OVER):
            logEntry.taget = 'GAME';
            break ;
        case (LOG_EVENT_MONSTER_ATTACK):
            logEntry.taget = 'PLAYER';
            break ;
        case (LOG_EVENT_PLAYER_ATTACK):
            logEntry.taget = 'MONSTER';
            break ;
        case (LOG_EVENT_PLAYER_HEAL):
            logEntry.taget = 'PLAYER';
            break ;
        case (LOG_EVENT_PLAYER_STRONG_ATTACK):
            logEntry.taget = 'MONSTER';
            break ;
        default:
            logEntry = {};
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
    let maxDamage = (mode === MODE_ATTACK) ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let event = (mode === MODE_ATTACK) ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

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
    let i = 0;
    for (logEntry of battleLog)
    {
        console.log(`#${i}`);
        for (key in logEntry)
        {
            console.log(`${key}: ${logEntry[key]}`);
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);