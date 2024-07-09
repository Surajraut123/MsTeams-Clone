import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import Loader from '../../../Loader.gif'
import contactimg from './cimg.png';
import "./list.scss"
import {fetchMessage} from '../../action/index'
import myContext from '../../MyContext';

function List(props) {
  const myState = useSelector((state) => state.messages)
  const disPatch = useDispatch();
  const [conversations, setConversations] = useState([]);

  const loggedinUser = JSON.parse(localStorage.getItem('loggedUser:detail'))
  const {updateUserClickEvent} = useContext(myContext);
    useEffect(() =>{

      let isMounted = true
      const fetchConversations = async() =>{
        try{
          const res = await fetch(`http://localhost:8000/api/conversation/${loggedinUser?.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const resData = await res.json();
          if(isMounted) {
            setConversations(resData)
          }
        } catch(error) {
          console.error(error)
        }
      }
      fetchConversations();
      return () => {
        isMounted = false;
      }

  

    }, [props.fetchConversation, loggedinUser?.id])


  const getIcon = (data) => {
    const userName = data.split(" ");
    if(userName[1]) {
        return userName[0]?.charAt(0).toUpperCase() + userName[1]?.charAt(0).toUpperCase();
    }
    return userName[0]?.charAt(0).toUpperCase() + "N";
  }
  const handleClickEvent = (conversationId, user) => {
    console.log(conversationId, " ", user);
    disPatch(fetchMessage(conversationId, user))
    updateUserClickEvent()

  }

  return (
    <div className='teamMates'>
      {
        conversations.length > 0 ?
          conversations.map(({conversationId, user}) => {
            return(
              <div key={conversationId} className='user' onClick={() => handleClickEvent(conversationId, user)}>
                <div className="user-profile">
                  <span>{getIcon(user.fullName)}</span>
                </div>
                <div className="user-details">
                  <div className="name-date">
                    <h3 className='text-lg'>{user?.fullName}</h3>
                  </div>
                  <div className="latest-message">
                  <p>
                    {myState.messages.length > 0 && 
                      myState.messages[myState.messages.length - 1].message}
                  </p>

                  </div>
                </div>
              </div>
            )
          }) : <div className="contactimg"> 
            <img src={contactimg} alt='loading... '/>
            <p>Have a private chat</p>
          </div>
      }
    </div>
  )
}

export default List
