import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import contactimg from './cimg.png';
import "./list.scss";
import { fetchMessage } from '../../action/index';
import myContext from '../../MyContext';

function List(props) {
  const myState = useSelector((state) => state.messages);
  const disPatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const loggedinUser = JSON.parse(localStorage.getItem('loggedUser:detail'));
  const { updateUserClickEvent } = useContext(myContext);

  useEffect(() => {
    let isMounted = true;
    const fetchConversations = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/conversation/${loggedinUser?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resData = await res.json();
        if (isMounted) {
          setConversations(resData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchConversations();
    return () => {
      isMounted = false;
    };
  }, [props.fetchConversation, loggedinUser?.id]);

  useEffect(() => {
    const fetchLastMessages = async () => {
      const conversationlastMessageArray = [];
      for (let convId of conversations) {
        const id = convId.conversationId;
        try {
          const response = await fetch(`http://localhost:8000/api/message/${id}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          });

          const res = await response.json();
          conversationlastMessageArray.push({ id, message: res[res.length - 1].message });
        } catch (error) {
          console.error(error);
        }
      }
      setLastMessages(conversationlastMessageArray);
    };

    if (conversations.length > 0) {
      fetchLastMessages();
    }
  }, [conversations]);

  const getIcon = (data) => {
    const userName = data.split(" ");
    if (userName[1]) {
      return userName[0]?.charAt(0).toUpperCase() + userName[1]?.charAt(0).toUpperCase();
    }
    return userName[0]?.charAt(0).toUpperCase() + "N";
  };

  const handleClickEvent = (conversationId, user) => {
    console.log(conversationId, " ", user);
    disPatch(fetchMessage(conversationId, user));
    updateUserClickEvent();
  };

  const getLastMessage = (conversationId) => {
    const message = lastMessages.find((msg) => msg.id === conversationId);
    return message ? message.message.slice(0, 30) : '';
  };

  return (
    <div className='teamMates'>
      {conversations.length > 0 ? (
        conversations.map(({ conversationId, user }) => (
          <div key={conversationId} className='user' onClick={() => handleClickEvent(conversationId, user)}>
            <div className="user-profile">
              <span>{getIcon(user.fullName)}</span>
            </div>
            <div className="user-details">
              <div className="name-date">
                <h3 className='text-lg'>{user?.fullName}</h3>
              </div>
              <div className="latest-message">
                <p>{getLastMessage(conversationId)}...</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="contactimg">
          <img src={contactimg} alt='loading...' />
          <p>Have a private chat</p>
        </div>
      )}
    </div>
  );
}

export default List;
