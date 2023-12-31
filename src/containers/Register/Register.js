import React, { useState } from 'react';

const Register = ({ loadUser, onRouteChange }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0 mb3">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="name">Name</label>
                        <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                        onClick={onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt3" type="submit" value="Register" 
                    />
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;