import React from 'react';
import { useSelector } from 'react-redux';
import './messages.scss';
function Messages() {
  const myState = useSelector((state) => state);
  const messageList = myState.messages;
  // console.log("From Messages: ", myState.messages);
  console.log("My State : ", myState)
  const loggedUserId = JSON.parse(localStorage.getItem("loggedUser:detail"));
  function getCurrentDateTime() {
    let now = new Date();
    
    let day = now.getDate();
    let month = now.getMonth() + 1; // JavaScript months are 0-based.
    let year = now.getFullYear().toString().substr(-2); // Get last 2 digits of year
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes; // Pad minutes to 2 digits
    
    let formatted = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
    
    return formatted;
  }
  return (
    <div className='messages'>
      <div className='p-14'>
        {
            messageList?.messages?.length > 0 ?
            messageList?.messages?.map(({key, message, user}) =>{
                return (
                    <div className={user.id === loggedUserId.id ?  "userMessage" : "receiverMessage"} key={key}>
                        <span>{getCurrentDateTime()}</span>
                        <p>{message}</p>
                    </div>
                 )
            }) : <div className="text-center text-lg font-semibold mt-24"> No Message </div>
        }
    </div>
    </div>
  )
}

export default Messages
