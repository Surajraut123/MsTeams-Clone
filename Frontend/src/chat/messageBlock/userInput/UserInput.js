import React, {useState, useRef} from 'react'
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
  const messageInputRef = useRef(null);
  const formatEventRef = useRef(null);
  const [selectionRange, setSelectionRange] = useState(null);


  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false)
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.innerHTML);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectionRange(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (selectionRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectionRange);
    }
  };

  const sendMessage = async () => {
    console.log(conversationId, " ", loggedinUser.id, " ", msg);
      const response = await fetch('https://msteams-clone.onrender.com/api/message', {
        method: "POST",
        body: JSON.stringify({
          conversationId: conversationId,
          senderId: loggedinUser.id,
          message: msg,
          sentAt: Date.now()
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
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault();
      document.execCommand('insertHTML', false, '<br><br>');
    }
  };

  const formatText = (command) => {
    restoreSelection();
    document.execCommand(command, false, null);
    let formatRef = formatEventRef.current;
    formatRef.style.display = 'none';

    document.querySelectorAll('.formatter').forEach((name) => {
      if(name.classList.contains(command)) {
        name.style.backgroundColor = "white";
      } else{
        name.style.backgroundColor = "#aeaeae3b";
      }
    })
  };

  const handleFormatEvent = () => {
    let formatRef = formatEventRef.current;
    formatRef.style.display = 'block';
    formatRef.style.display = 'flex';
    formatRef.focus();
  }

  // const handleFormatBlur = () => {
  //   let formatRef = formatEventRef.current;
  //   formatRef.style.display = 'none';
  // }


  const inputClassName = focused ? 'focused-input' : '';
  return (
    <div className='userInput'>
      <div className="input-box">
      <div 
          contentEditable
          type="text" 
          placeholder='Type a message...' 
          onFocus={handleFocus} 
          onBlur={handleBlur}
          onInput={handleInputChange}
          ref={messageInputRef} 
          className={inputClassName} 
          id="userInputMessage"
          onKeyDown={handleKeyPress}

          style={{
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
            maxHeight: '200px',
            height: 'auto',
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '30px',
            borderRadius: '6px',
            paddingTop: '10px',
            fontFamily: 'sans-serif',
            outline: 'none',
            fontSize: '17px'
          }}
        />
        <FontAwesomeIcon id="eicons" icon={faPaperPlane} onClick={sendMessage}/>
      </div>

      <div className="icons">
        <div className="editor-icons">
          <FontAwesomeIcon onClick={handleFormatEvent} id="eicons" icon={faFont} />
          <FontAwesomeIcon id="eicons" icon={faPaperclip} />
          <FontAwesomeIcon id="eicons" icon={faFaceSmile} />
          <FontAwesomeIcon id="eicons" icon={faStore} />
          <div tabIndex={-1} ref={formatEventRef} className='formatEvent'>
            <p className='formatter bold' onClick={() => formatText('bold')}>B</p>
            <p className='formatter italic' onClick={() => formatText('italic')}>I</p>
            <p className='formatter underline' onClick={() => formatText('underline')}>U</p>
          </div>
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
