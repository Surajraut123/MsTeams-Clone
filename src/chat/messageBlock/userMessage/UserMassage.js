import React from 'react'
import './usermessage.scss'
import UserInput from '../userInput/UserInput'
import Messages from './Messages'
import MessageNavigation from '../messageNavbar/MessageNavigation'
function UserMassage() {
  return (
    <div className='message'>
      <MessageNavigation/>
        <Messages/>
      <UserInput/>
    </div>
  )
}

export default UserMassage
