const loginForm = async function(event) {
    event.preventDefault();

    const usernameData = document.querySelector('#inputUsername');
    const passwordData = document.querySelector('#inputPassword');

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameData.nodeValue,
            password: passwordData.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(response)
    }
}

document.querySelector('.login-form');
document.addEventListener('submit', loginForm);