const signupFormHandler = async function (event) {
    event.preventDefault();

    //TODO: add form input names for sign up if different
    const firstNameEl = document.querySelector('#firstName-input-signup').value.trim(); 
    const lastNameEl = document.querySelector('#lastName-input-signup').value.trim(); 
    const emailAddressEl = document.querySelector('#emailAddress-input-signup').value.trim(); 
    const userNameEl = document.querySelector('#userName-input-signup').value.trim();
    const passwordEl = document.querySelector('#password-input-signup').value.trim();

    if(passwordEl.length >= 8 && userNameEl) {
        try {
            const resp = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: firstNameEl,
                    lastName: lastNameEl,
                    emailAddressEl: emailAddressEl,
                    userName: userNameEl,
                    password: passwordEl,
                }),
                headers: {'Content-Type': 'application/json'},
            });

            if (resp.ok) {
                document.location.replace('/');
            } else {
                const message = await resp.json();
                alert(`Sign-up Failed! ${message.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error during signup:', err);
            alert('Sign-up Failed!');
        }
    } else {
        alert('Must include both userName and password, password must be 8 or more characters long.');
    }
};

// add event listener
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);