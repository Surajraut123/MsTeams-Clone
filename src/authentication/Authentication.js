import React, {useState, useContext } from 'react';
import logo from './mslogo.png';
import './authentication.scss';
import Input from '../chat/components/Input/Input'
import Loader from '../Loader.gif'
import myContext from '../chat/MyContext';

const Authentication = () => {
    const setLandingPageVisibility = useContext(myContext);
    const [signIn, setSignIn] = useState(false);
    const [clicked, setClickEvent] = useState(false);
    const [valid, setValidity] = useState(true);

    const [data, setFormData] = useState({
        ...(!signIn && {fullname: ''}),
        email: '',
        password: ''
    })

    const handleForm = (event) => {
        if(event === "register") {
            setSignIn(false);
            setClickEvent(false)
        } 
        if(event === "login") {
            setSignIn(true);
            setClickEvent(false)
        }
        if(event === "next") {
            setClickEvent(true)
            setLandingPageVisibility();
        }

        const handleEventUser = async (event) => {
            try {
                const response = await fetch(`http://localhost:8000/api/${event}`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...(!signIn && {fullName: data.fullname}),
                        email: data.email,
                        password: data.password
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
    
                const eventData = await response.json();
                console.log(eventData);
                setClickEvent(false)
            } catch (error) {
                setClickEvent(false)
                setValidity(false)
                console.log(error);
            }
        }
        handleEventUser(event)

    }


    return (
        <div className='container'>
            
            <div className='form'>
                <div className='logo'>  
                    <img src={logo} alt='loading' />
                    <h2>Microsoft</h2>
                </div>

                <div className='heading'>
                    <h2>{signIn ? "Sign in" : "Create account"}</h2>
                </div>

                {!signIn && <Input name='fullname' type="email" placeholder='Andrew Devis' className='input' value={data.fullname} onChange={(e) => setFormData({...data, fullname: e.target.value})}/>}

                <Input name='email' type="email" placeholder='someone@gmail.com' className='input' value={data.email} onChange={(e) => setFormData({...data, email: e.target.value})}/>

                <Input name='password' type="password" placeholder='*******' className='input' value={data.password} onChange={(e) => setFormData({...data, password: e.target.value})}/>

                {signIn && <p id={!valid ? 'invalid' : 'valid'}>Invalid username or password</p>}
                {signIn && <span>Forgot my password</span>}
                <p className='signin'>
                    {!signIn ? 'Already have an account?' : 'No account?'} 
                    <span onClick={() => handleForm(signIn ? "register" : "login")}>
                        {!signIn ? ' Sign in' : ' Create one!'}</span>
                </p>

                <div className='btn'>
                    <button className={!clicked ? "active" : "unactive"} onClick={() => handleForm("next")}>Next</button>
                    <button className={clicked ? "loader": "unactive"}><img src={Loader} alt='loading...'/></button>
                </div>
            </div>
            <p></p>

        </div>
    );
};

export default Authentication;