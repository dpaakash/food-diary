import React from 'react';

const LoginPage = ({ setAuthorized }) => {
    const [password, setPassword] = React.useState('');

    return (
        <React.Fragment>
            <form>
                <input 
                    placeholder = 'Password' 
                    type='password'
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)} 
                    autoFocus
                />
                <button
                    onClick = {() => verifyPassword(password, setAuthorized)}
                >
                    Submit
                </button>
            </form>   
        </React.Fragment>
    )
}

const verifyPassword = async (password, setAuthorized) => {
    // fetch('/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ password })
    // })
    // .then(response => response.json())
    // .then(data => setAuthorized(JSON.parse(data).isAuthenticated))
    // .catch(console.log('error in authorizing the user'));
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await response.json();
        setAuthorized(data.isAuthenticated);
    } catch (e) {
        console.log('error in authorizing the user', e);
    }
    
}

export default LoginPage;