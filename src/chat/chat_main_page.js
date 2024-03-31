import React from 'react'
import UserMassage from './messageBlock/userMessage/UserMassage';
import Contacts from './contactBlock/Contacts';
function chat_main_page() {
  return (
    <div style={{display: 'flex', width: '100%'}}>
      <Contacts/>
      <UserMassage/>
    </div>
  )
}

export default chat_main_page
