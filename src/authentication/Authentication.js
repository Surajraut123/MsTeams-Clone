import React, { useState } from 'react';
import logo from './mslogo.png';
import './authentication.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Authentication = () => {
    const [heading, setHeading] = useState({ name: "Create account", visibilities: true });
    const [placeholder, setPlaceHolder] = useState("someone@example.com");
    const [input, setInput] = useState("");
    const [signIn, setSignIn] = useState(false);

    const setData = (data) => { 
        if(data === "signin") {
            setSignIn(true);
            setHeading({ name: "Sign in", visibilities: true });
            setPlaceHolder("Email, phone, or Skype");
        }

        if(data === "create") {
            setSignIn(false);
            setHeading({ name: "Create account", visibilities: true });
            setPlaceHolder("someone@example.com");
        }

        if(!data){
            if(signIn) {
                setHeading({name: "Enter the password", visibilities: true});
                setPlaceHolder("**********");
            } else{
                if(input !== "") {
                    setHeading({name: "Create Password", visibilities: false});
                    setPlaceHolder("Create password");
                } else{
                    alert("Please enter the valid data..")
                }
            }
        }
        if(data === "back") {
            setHeading({name: "Create account", visibilities: true});
            setPlaceHolder("someone@example.com");
        }

        if(data === "+910000000000") {
            setPlaceHolder("someone@example.com")
        } else if(data === "someone@example.com") {
            setPlaceHolder('+910000000000');
        }

        if(signIn) {

        }
    }


    return (
        <div className='container'>
            <div className='form'>
                <div className='logo'>  
                    <img src={logo} alt='loading' />
                    <h2>Microsoft</h2>
                </div>

                <div className={!heading.visibilities ? 'username' : 'disable'}>
                    <FontAwesomeIcon id="left" icon={faArrowLeft} onClick={() => setData("back")} />
                    <p className='uname'>{input}</p>
                </div>

                <div className='heading'>
                    <h2>{heading.name}</h2>
                    <p className={!heading.visibilities ? 'visible' : 'disable'}>Enter the password you would like to use with your account</p>
                </div>

                <input type={heading.visibilities ? 'email' : 'password'} name='username' id='username' placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} required/>

                <p className={!heading.visibilities ? 'detail' : 'disable'}>
                    By providing your phone number, you agree to receive service notifications to your mobile phone. Text messaging rates may apply
                </p>

                <p className={!signIn ? heading.visibilities ? 'auth' : 'disable' : 'disable'} onClick={() => setData(placeholder === "+910000000000" ? "+910000000000" : "someone@example.com")}>Use a {placeholder !== "+910000000000" ? 'phone number' : 'email id'} instead</p>

                {signIn ? <span>Forgot my password</span>: <p className='signin'>{!signIn ? 'Already have an account?' : 'No account?'} <span onClick={() => setData(signIn ? "create" : "signin")}>{!signIn ? 'Sign in' : 'Create one!'}</span></p>}

                <div className='btn'>
                    <button onClick={() => setData(false)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Authentication;