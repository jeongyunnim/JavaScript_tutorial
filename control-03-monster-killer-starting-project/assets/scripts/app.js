const ATTACK_VALUE = 10
const STRONG_ATTACK_VALUE = 17
const MONSTER_VALUE = 14
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function endRound()
{
    const initailHealth = currentPlayerHealth;
    const monsterDamage = dealPlayerDamage(MONSTER_VALUE);
    currentPlayerHealth -= monsterDamage;
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
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0)
    {
        alert("You Lost");
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
    {
        alert("You have a draw!");
    }
}

function attackMonster(mode)
{
    let maxDamage;

    if (mode === 'ATTACK')
    {
        maxDamage = ATTACK_VALUE;
    }
    else
    {
        maxDamage = STRONG_ATTACK_VALUE
    }
    const PlayerDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= PlayerDamage;
}

function attackHandler()
{
    attackMonster('ATTACK');
    endRound();
}

function strongAttackHandler()
{
    attackMonster('STRONG_ATTACK');
    endRound();
}

function healPlayerHandler()
{
    if (currentPlayerHealth > 0)
    {
        increasePlayerHealth(HEAL_VALUE);
        currentPlayerHealth += HEAL_VALUE;
    }
    if (currentPlayerHealth < chosenMaxLife)
    {
        currentPlayerHealth = chosenMaxLife;
    }
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);