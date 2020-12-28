const loginFormHandler = async function (event) {
	event.preventDefault();

	const UsernameEl = document.querySelector('#Username-input-login');
	const passwordEl = document.querySelector('#password-input-login');
	fetch('/api/User/login', {
		method: 'post',
		body: JSON.stringify({
			Username: UsernameEl.value,
			password: passwordEl.value,
		}),
		headers: { 'Content-Type': 'application/json' },
	})
		.then(function () {
			document.location.replace('/dashboard');
		})
		.catch((err) => console.log(err));
};

document
	.querySelector('#login-form')
	.addEventListener('submit', loginFormHandler);
