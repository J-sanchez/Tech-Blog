const signupFormHandler = async function (event) {
	event.preventDefault();

	const UsernameEl = document.querySelector('#Username-input-signup');
	const passwordEl = document.querySelector('#password-input-signup');
	fetch('/api/User', {
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
	.querySelector('#signup-form')
	.addEventListener('submit', signupFormHandler);
