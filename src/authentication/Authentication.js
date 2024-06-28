import React, {useState, useContext, useEffect } from 'react';
import logo from './mslogo.png';
import './authentication.scss';
import Input from '../chat/components/Input/Input'
import Loader from '../Loader.gif'
import myContext from '../chat/MyContext';
import Offline from './Offline';

const Authentication = (props) => {
    const setLandingPageVisibility = useContext(myContext);
    const [signIn, setSignIn] = useState(false);
    const [clicked, setClickEvent] = useState(false);
    const [loginDataValidity, setLoginDataValidity] = useState({valid: true, text: ''});
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        setIsOnline(navigator.onLine)
    }, [])

    const [data, setFormData] = useState({
        ...(!signIn && {fullname: ''}),
        email: '',
        password: ''
    })

    const selectAuth = (auth) => {
        if(auth === "register") {
            setFormData({
                ...(!signIn && {fullname: ''}),
                email: '',
                password: ''
            })
            setSignIn(false);
        } 
        if(auth === "login") {
            setFormData({
                ...(!signIn && {fullname: ''}),
                email: '',
                password: ''
            })
            setSignIn(true);
        }
    }

    const checkConversationAlreadyExist = async (senderId, receiverId) => {
        try {
            const response = await fetch('/api/checkconversation', {
                method: "POST",
                body: JSON.stringify({
                    senderId: senderId,
                    receiverId: receiverId
                }),
                headers: {
                    "Content-type" : "application/json"
                }
            })

            const data = await response.json();
            console.log("In check conversation")
            if(data.length === 0) {
                return false;
            }
            return true;
        } catch (error) {
            console.log("In checkconversation : ",  error)
        }
    }
    const createLinkConversation = async (senderId, receiverId, event) => {
        let isExist = false;
        if(event === 'login') {
            isExist = await checkConversationAlreadyExist(senderId, receiverId);
        }
        if(!isExist) {
            try {
                const response = await fetch("http://localhost:8000/api/conversation", {
                    method: "POST",
                    body: JSON.stringify({
                        senderId: senderId,
                        receiverId: receiverId
                    }),
                    headers: {
                        "Content-type" : "application/json"
                    }
                })
                const data = await response.json();
                console.data("New Conversation through link: ", data)
            } catch (error) {
                console.log("Through Link Convrsation : ", error)
            }
        }
    }

    const handleForm = (event) => {
        const handleEventUser = async (event) => {
            setClickEvent(true)
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
                if(!response.ok) {
                
                    if(response.status === 500 || response.status === 400) {
                        alert(eventData.message)
                    } else{
                        setLoginDataValidity({valid: false, text: eventData.message})
                    }
                    setTimeout(()=>{
                        setClickEvent(false)
                    }, 1000)
                } else{
                    console.log("Registration : ", eventData);
                    setTimeout(()=>{
                        setClickEvent(false)
                        setLandingPageVisibility(eventData.user.id);
                    }, 3000)

                    if(event === "login") {
                        localStorage.setItem("user:token", eventData.token)
                        localStorage.setItem("loggedUser:detail", JSON.stringify(eventData.user))
                    }
                    if(props.receiverId !== '' && eventData.user.id !== props.receiverId) {
                        createLinkConversation(eventData.user.id, props.receiverId, event);
                    }
                }
            } catch (error) {
                setClickEvent(false)
                console.error(error);
                alert("Something went wrong!")
            }
        }
        handleEventUser(event)

    }


    return (
        isOnline ? 
        (<div className='container'>
            
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

                <Input name='password' type="password" placeholder='*******' className='input' id='inputs' value={data.password} onChange={(e) => setFormData({...data, password: e.target.value})}/>

                {!loginDataValidity.valid && <p id={!loginDataValidity.valid ? 'invalid' : 'valid'}>{loginDataValidity.text}</p>}
                {signIn && <span>Forgot my password</span>}
                <p className='signin'>
                    {!signIn ? 'Already have an account?' : 'No account?'} 
                    <span onClick={() => selectAuth(signIn ? "register" : "login")}>
                        {!signIn ? ' Sign in' : ' Create one!'}</span>
                </p>

                <div className='btn'>
                    <button className={!clicked ? "active" : "unactive"} onClick={() => handleForm(signIn ? "login" : "register")}>Next</button>
                    <button className={clicked ? "loader": "unactive"}><img src={Loader} alt='loading...'/></button>
                </div>
            </div>
            <p></p>

        </div>) : <Offline />
    );
};

export default Authentication;