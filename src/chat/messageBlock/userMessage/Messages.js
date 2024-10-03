import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './messages.scss';

function Messages() {
  const myState = useSelector((state) => state);
  const messageList = myState.messages;
  const loggedUserId = JSON.parse(localStorage.getItem("loggedUser:detail"));

  const messagesContainerRef = useRef(null);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setIsScrolledToBottom(scrollHeight - scrollTop <= clientHeight + 10);  
    }
  };

  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messageList, isScrolledToBottom]);

  function formatDate(now) {
    if (now) {
      const messageDate = new Date(now);
      const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const formattedDate = messageDate.toLocaleString('en-US', options).replace(',', '');
      return formattedDate;
    }
  }

  return (
    <div
      className='messages'
      ref={messagesContainerRef}
      onScroll={handleScroll}
      style={{ overflowY: 'auto', maxHeight: '500px' }} 
    >
      <div className='p-14'>
        {messageList?.messages?.length > 0 ?
          messageList?.messages?.map(({ key, message, user, sentAt }) => {
            return (
              <div
                className={user.id === loggedUserId.id ? "userMessage" : "receiverMessage"}
                key={key}
              >
                <span>{formatDate(sentAt)}</span>
                <p className="message" dangerouslySetInnerHTML={{ __html: message }} />
              </div>
            );
          })
          : <div className="text-center text-lg font-semibold mt-24"> No Message </div>
        }
      </div>
    </div>
  );
}

export default Messages;
