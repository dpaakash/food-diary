import React from 'react';

const LoginPage = ({ setAuthorized }) => {
    const [password, setPassword] = React.useState('');

    return (
        <React.Fragment>
            <form onSubmit={(e) => { e.preventDefault(); verifyPassword(password, setAuthorized) }}>
                <input 
                    placeholder = 'Password' 
                    type='password'
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)} 
                    autoFocus
                />
                <button>Submit</button>
            </form>   
        </React.Fragment>
    )
}

const verifyPassword = async (password, setAuthorized) => {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await response.json();
        setAuthorized(data.isAuthenticated);
        
        if(!data.isAuthenticated) 
            alert('Incorrect Password!')
    } catch (e) {
        console.error('Error authenticating the user', e);
    }  
}

export default LoginPage;