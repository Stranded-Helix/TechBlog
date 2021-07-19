const signUpForm = async (event) => {
    event.preventDefault();

    const usernameData = document.querySelector('#inputUsername');
    const passwordData = document.querySelector('#inputPassword');

    const response = await fetch('/api/user/create', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameData.value,
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

document.querySelector('.signup-form');
document.addEventListener('submit', signUpForm);