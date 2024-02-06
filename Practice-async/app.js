const button = document.querySelector('button');

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
    navigator.geolocation.getCurrentPosition(
        posData => {
            setTimer(2000).then(data => {
                console.log(data, posData);
            });
        },
        error => {
            setTimer(2000).then(data => {
                console.log(data, error);
            });
        }
    );
    setTimeout(() => {
        console.log('Timer done!');
    }, 0);
	console.log('Getting Positions...');
}
button.addEventListener('click', trackUserHandler);
