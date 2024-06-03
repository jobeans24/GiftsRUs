// process submit event
const loginFormHandler = async function(event) {
    event.preventDefault();

    const userNameEl = document.querySelector('#userName-input-login').value.trim();
    const passwordEl = document.querySelector('#password-input-login').value.trim();

    // valid the user login information
    try {
        const resp = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                userName: userNameEl,
                password: passwordEl,
            }),
            headers: {'Content-Type': 'application/json'},
        });

        console.log(resp);
        if (resp.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Login Failed!')
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('Login Failed!');
    }        
};

// add event listener for login form for the submit button
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
