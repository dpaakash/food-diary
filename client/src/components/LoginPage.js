import React from 'react';

const PASS = '2511';

const LoginPage = ({ setAuthorized }) => {
    const [password, setPassword] = React.useState('');

    return (
        <React.Fragment>
            <input 
                placeholder = 'Password' 
                value = {password} 
                onChange = {(e) => setPassword(e.target.value)} 
            />
            <button
                onClick = {() => verifyPassword(password, setAuthorized)}
            >
                Submit
            </button>
        </React.Fragment>
    )
}

const verifyPassword = (password, setAuthorized) => {
    if(password === PASS)
        setAuthorized(true);
}

export default LoginPage;