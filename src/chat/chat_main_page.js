import React from 'react'
import UserMassage from './messageBlock/userMessage/UserMassage';
import Contacts from './contactBlock/Contacts';
import messageStorage from "./store"
import {Provider} from "react-redux"
messageStorage.subscribe(() => console.log(messageStorage.getState()))

function chat_main_page() {
  return (

    <div style={{display: 'flex', width: '100%'}}>
      <Provider store={messageStorage}>
        <Contacts/>
        <UserMassage/>
      </Provider>
    </div>
  )
}

export default chat_main_page
