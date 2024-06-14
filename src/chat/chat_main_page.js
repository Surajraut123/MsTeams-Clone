import React from 'react'
import UserMassage from './messageBlock/userMessage/UserMassage';
import Contacts from './contactBlock/Contacts';
import "./chatMain.scss"
import messageStorage from "./store"
import {Provider} from "react-redux"
import myContext from './MyContext';

messageStorage.subscribe(() => console.log(messageStorage.getState()))

function chat_main_page() {
  let isClick = false;
  const updateUserClickEvent = () => {
    isClick = true;
  }
  return (
    <div className='chat-main'>
      <Provider store={messageStorage}>
      <myContext.Provider value={{isClick, updateUserClickEvent}}>
        <Contacts/>
        <UserMassage/>
        </myContext.Provider>
      </Provider>
    </div>
  )
}

export default chat_main_page
