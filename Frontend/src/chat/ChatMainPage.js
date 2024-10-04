import React, { useEffect, useState } from 'react'
import UserMassage from './messageBlock/userMessage/UserMassage';
import Contacts from './contactBlock/Contacts';
import "./chatMain.scss"
import messageStorage from "./store"
import {Provider} from "react-redux"
import myContext from './MyContext';

messageStorage.subscribe(() => console.log(messageStorage.getState()))

function ChatMainPage(props) {

  let isClick = false;
  const[isClicked, setClicked] = useState(isClick);
  const updateUserClickEvent = () => {
    setClicked(true)
    isClick = true
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if(screenWidth > 500) {
      setClicked(false)
    }
  }, [isClicked])

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth > 500) {
        setClicked(false)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='chat-main'>
      <Provider store={messageStorage}>
      <myContext.Provider value={{isClicked, updateUserClickEvent}}>
        <Contacts fetchConversation={props.fetchConversation}/>
        <UserMassage/>
      </myContext.Provider>
      </Provider>
    </div>
  )
}

export default ChatMainPage
