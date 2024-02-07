const button = document.querySelector('button');

const getPosition = (opts) => {
    const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(success => {
            resolve(success);
        }, error => {
            reject(error);
        }, opts);
    });
    return promise;
}

const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
        // 브라우저는 프로미스가 생성되는 즉시 함수를 실행하고 프로미스를 resolve와 reject로 넘긴다.
        setTimeout(() => {
            resolve('Done!'); // 단순히 호출해서 promise의 상태를 초기화 한다.
        } , duration);
    });
    return promise;
};

async function trackUserHandler() {
    let posData;
    let timerData;
    try {
        posData = await getPosition();
        timerData = await setTimer(2000);
    }
    catch (error) {
        console.log(error);
    }
	console.log(timerData, posData);
};

button.addEventListener('click', trackUserHandler);
