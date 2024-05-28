import React from 'react'
import './usermessage.scss'
import UserInput from '../userInput/UserInput'
import Messages from './Messages'
import MessageNavigation from '../messageNavbar/MessageNavigation'
import ChatHomePage from '../../ChatHomePage'
import { useSelector } from 'react-redux'
function UserMassage() {
  const data = useSelector(state => state.messages.messages.length);
  console.log(data)
  return (
    <div className='message'>
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
