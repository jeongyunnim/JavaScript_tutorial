const listElement = document.querySelector('.posts');
const postsTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button')

function sendHttpRequest(method, url, data = null) {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		
		xhr.open(method, url);
		xhr.responseType = 'json';
		xhr.onload = function() {
			if (200 <= xhr.status && xhr.status < 300)
			{
				resolve(xhr.response);
			}
			else
			{
				reject(new Error('HTTP Request Error'));
			}
		}
		xhr.onerror = function() {
			reject(new Error('Failed to send request'));
		}
		
		xhr.send(JSON.stringify(data));
	});
	return promise;
}

async function fetchPosts() {
	const reponseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/poss');
	for (const post of reponseData)
	{
		const postEl = document.importNode(postsTemplate.content, true);
		postEl.querySelector('h2').textContent = post.title.toUpperCase();
		postEl.querySelector('p').textContent = post.body;
		listElement.append(postEl);
	};
}

async function createPost(title, content) {
	const postId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: postId
	};
	sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
}


fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
	event.preventDefault();
	const enteredTitle = event.currentTarget.querySelector('#title').value;
	const enteredContent = event.currentTarget.querySelector('#content').value;
	//유효성 검사

	createPost(enteredTitle, enteredContent);
})
