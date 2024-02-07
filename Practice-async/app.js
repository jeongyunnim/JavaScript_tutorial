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

function trackUserHandler() {
    let positionData;
    getPosition().then((posData) => {
        positionData = posData
        return (setTimer(2000)); // setTimer 내부에서 position 객채를 반환하기 때문에 가능.
    })
    .then((data) => {
        console.log(data, positionData);
    }, err => {
        console.log(err);
    });
    // setTimer(1000).then(() => {
    //     console.log('Timer done!');
    // });
	// console.log('Getting Positions...');
}
button.addEventListener('click', trackUserHandler);
