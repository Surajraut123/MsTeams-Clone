import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareUpRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./list.scss"
function List() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
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

// const fetchMessages = async(conversationId, receiver) =>{
//   const res = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
//       method: 'GET',
//       headers : {
//           'Content-Type' : 'application/json' 
//       },
//   })
//   const resData = await res.json();
//   console.log(resData);
//   setMessages({messages: resData, receiver, conversationId})
// }
  return (
    <div className='teamMates'>
      {
        conversations.length > 0 ?
          conversations.map(({conversationId, user}) =>{
            return(
              <div className='user'>
                <div className="user-profile">
                  {/* <img src={Avatar} width={50} height={50} alt="loading..."/> */}
                  <span>RS</span>
                </div>    
                <div className="user-details" >
                  <div className="name-date">
                    <h3 className='text-lg'>{user?.fullName}</h3>
                  </div>
                  <div className="latest-message">
                    <p>This message was deleted</p>
                  </div>
                </div>
              </div>
            )
          }) : <div className="text-center text-lg font-semibold mt-24"> No Conversations</div>
      }
    </div>
  )
}

export default List
