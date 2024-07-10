import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './userinput.scss'
import { faFont, faPaperclip, faStore, faVideo, faPaperPlane  } from '@fortawesome/fontawesome-free-solid'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchMessage } from '../../action'

function UserInput() {
  const [focused, setFocused] = useState(false)
  const [msg, setMessage] = useState('');
  const conversationId = useSelector(state => state.messages.conversationId);
  const receiveruser = useSelector(state => state.messages.receiveruser);
  const loggedinUser = JSON.parse(localStorage.getItem('loggedUser:detail'))
  const disPatch = useDispatch();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false)
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {

    console.log(conversationId, " ", loggedinUser.id, " ", msg);
      const response = await fetch('http://localhost:8000/api/message', {
        method: "POST",
        body: JSON.stringify({
          conversationId: conversationId,
          senderId: loggedinUser.id,
          message: msg
        }),
        headers: {
          "Content-type": "application/json"
        }
      })

      const res = await response.json()
      console.log(res);

      if(res.action) {
        disPatch(fetchMessage(conversationId, receiveruser))
      }

      setMessage('')
  }

  const inputClassName = focused ? 'focused-input' : '';
  return (
    <div className='userInput'>
      <div className="input-box">
        <input type="text" placeholder='Type a message...' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} className={inputClassName} value={msg}/>
        <FontAwesomeIcon id="eicons" icon={faPaperPlane} onClick={sendMessage}/>
      </div>

      <div className="icons">
        <div className="editor-icons">
          <FontAwesomeIcon id="eicons" icon={faFont} />
          <FontAwesomeIcon id="eicons" icon={faPaperclip} />
          <FontAwesomeIcon id="eicons" icon={faFaceSmile} />
          <FontAwesomeIcon id="eicons" icon={faStore} />
        </div>

        <div className="my-actions">
          <FontAwesomeIcon id="eicons" icon={faVideo} />
          <FontAwesomeIcon id="eicons" icon={faPaperPlane} onClick={sendMessage}/>
        </div>
      </div>

    </div>
  )
}

export default UserInput
