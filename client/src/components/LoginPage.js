import React from 'react';

const PASS = '2511';

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

const verifyPassword = (password, setAuthorized) => {
    if(password === PASS)
        setAuthorized(true);
}

export default LoginPage;