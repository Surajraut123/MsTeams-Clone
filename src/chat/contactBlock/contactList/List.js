import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "./list.scss"
import {fetchMessage} from '../../action/index'
function List() {
  const myState = useSelector((state) => state.messages)
  console.log("From list :", myState.messages.length);
  const disPatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))

  const[displayContact, setDisplayContact] = useState(true);
    useEffect(() =>{
      const loggedinUser = JSON.parse(localStorage.getItem('user:detail'))
      console.log(loggedinUser)
      const fetchConversations = async() =>{
          const res = await fetch(`http://localhost:8000/api/conversation/${loggedinUser?.id}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const resData = await res.json();
          console.log("Conersation : ", resData);
          setConversations(resData)
      }
      fetchConversations();
  }, [])

  const userMessages = () => {
    setDisplayContact(false);
  }


  return (
    <div className='teamMates'>
      {/* { */}
        {/* conversations.length > 0 ?
          conversations.map(({conversationId, user}) => { */}
            {/* return( */}
              <div className='user' onClick={() => {
                // disPatch(fetchMessage(conversationId))
                userMessages()
              }}>
              {/* <div key={conversationId} className='user' onClick={() => disPatch(fetchMessage(conversationId))}> */}
                <div className="user-profile">
                  <span>RS</span>
                </div>
                <div className="user-details">
                  <div className="name-date">
                    <h3 className='text-lg'>Suraj Raut</h3>
                    {/* <h3 className='text-lg'>{user?.fullName}</h3> */}
                  </div>
                  <div className="latest-message">
                  <p>
                    {/* {myState.messages.length > 0 && 
                      myState.messages[myState.messages.length - 1].message} */}
                      Good Morning
                  </p>

                  </div>
                </div>
              </div>
            {/* ) */}
          {/* }) : <div className="text-center text-lg font-semibold mt-24"> No Conversations</div> */}
      {/* // } */}
    </div>
  )
}

export default List
