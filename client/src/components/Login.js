import axios from 'axios';
import React, { useState } from 'react';

function Login({ setIsLogin }) {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [err, setErr] = useState('');
    const [onLogin, setOnLogin] = useState(false);
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opcacity: onLogin ? 1 : 0
    };

    //We can change input fields via this function
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    };

    //Register Submit Function
    const registerSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            });
            setUser({ name: '', email: '', password: '' });
            setErr(res.data.msg);
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg);
        }
    };

    //Login Submit Function
    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });
            setUser({ email: '', password: '' });
            setErr(res.data.msg);
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        }
        catch (error) {
            error.response.data.msg && setErr(error.response.data.msg);
        }
    };
    return (
        <section className="login-page">
            <div className="login create-note">
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input
                        type="email"
                        name="email"
                        id="login-email"
                        placeholder="Enter valid email address"
                        required
                        value={user.email}
                        onChange={onChangeInput}
                    />
                    <input
                        type="password"
                        name="password"
                        id="login-password"
                        placeholder="Enter Password"
                        required
                        value={user.password}
                        autoComplete="true"
                        onChange={onChangeInput}
                    />
                    <button>Login</button>
                    <p>You don't have an account?
                         <span onClick={() => setOnLogin(true)}> Register Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
            <div className="register create-note" style={style}>
                <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input
                        type="text"
                        name="name"
                        id="register-name"
                        placeholder="Enter Username"
                        required
                        value={user.name}
                        onChange={onChangeInput}
                    />
                    <input
                        type="email"
                        name="email"
                        id="register-email"
                        placeholder="Enter Valid Email Address"
                        required
                        value={user.email}
                        onChange={onChangeInput}
                    />
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="Enter Password"
                        required
                        value={user.password}
                        autoComplete="true"
                        onChange={onChangeInput}
                    />
                    <button>Register</button>
                    <p>You have an account?
                         <span onClick={() => setOnLogin(false)}> Login Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
        </section>
    )
}

export default Login;