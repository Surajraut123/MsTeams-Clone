import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './userinput.scss'
import { faFont, faPaperclip, faStore, faVideo, faPaperPlane  } from '@fortawesome/fontawesome-free-solid'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
function UserInput() {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false)
  };

  const inputClassName = focused ? 'focused-input' : '';
  return (
    <div className='userInput'>
      <div className="input-box">
        <input type="text" placeholder='Type a message...' onFocus={handleFocus} onBlur={handleBlur} className={inputClassName}/>
        <FontAwesomeIcon id="eicons" icon={faPaperPlane} />
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
          <FontAwesomeIcon id="eicons" icon={faPaperPlane} />
        </div>
      </div>

    </div>
  )
}

export default UserInput
