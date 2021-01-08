const loginFormHandler = async function (event) {
	event.preventDefault();

	const username = document.querySelector('#username-input-login').nodeValue
		.trim;
	const password = document.querySelector('#password-input-login').nodeValue
		.trim;
	if (username && password) {
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('#login-form')
	.addEventListener('submit', loginFormHandler);
