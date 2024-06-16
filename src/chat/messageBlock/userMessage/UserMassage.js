import {React, useContext, useEffect, useState} from 'react'
import './usermessage.scss'
import UserInput from '../userInput/UserInput'
import Messages from './Messages'
import MessageNavigation from '../messageNavbar/MessageNavigation'
import ChatHomePage from '../../ChatHomePage'
import { useSelector } from 'react-redux'
import myContext from '../../MyContext'
function UserMassage() {


  const value = useContext(myContext);

    const data = useSelector(state => state.messages.messages.length);
    console.log(data!=="0")

    return (
      <div className={!value.isClicked? 'message' : 'mobileMessage'}>
        {
          data !== 0 ? (
            <>
              <MessageNavigation/>
              <Messages/>
              <UserInput/>
            </>
          ) : (
          <ChatHomePage/> 
          )
        }
      </div>
    )
}

export default UserMassage
