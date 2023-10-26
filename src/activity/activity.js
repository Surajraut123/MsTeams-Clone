import React from 'react'
import UserMassage from '../chat/messageBlock/userMessage/UserMassage';
import Contacts from '../chat/contactBlock/Contacts';
import "./activity.scss"
function activity() {
  return (
    <div className='activity'>
      <Contacts title={"Feed"} />
      <UserMassage/>
    </div>
  )
}

export default activity
