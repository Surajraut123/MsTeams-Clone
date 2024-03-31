import React, { useState } from 'react'
import './messageNavigation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faPhone, faPlus, faSquareArrowUpRight, faUserPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
function MessageNavigation() {

    const [select, setSelected] = useState("chat");
    const handleSelection = (event) =>{
        setSelected(event)
    }

    const isSelected = (item) => {
        return select === item;
      }

  return (
    <div className='messageNav'>
        <div className="navbar">
            <div className="userData-section">
                {/* <img src="" alt="" /> */}
                <span id='user'>RS</span>
                <h1>Suraj Raut</h1>
                <div className="data" onClick={()=>handleSelection("chat")} style={{borderBottom : isSelected("chat") ? '3px solid #4845c9' : '3px solid #f5f5f500', fontWeight: isSelected("chat") ? 700 : 'normal'}}>Chat</div>

                <div className="data"  onClick={()=>handleSelection("files")} style={{borderBottom : isSelected("files") ? '3px solid #4845c9' : '3px solid #f5f5f500', fontWeight: isSelected("files") ? 700 : 'normal'}}>Files</div>

                <div className="data"  onClick={()=>handleSelection("photos")} style={{borderBottom : isSelected("photos") ? '3px solid #4845c9' : '3px solid #f5f5f500', fontWeight: isSelected("photos") ? 700 : 'normal'}}>Photos</div>
                <FontAwesomeIcon id="plus" icon={faPlus} />
            </div>

            <div className="user-actions">
                <div className="video-audio">
                    <FontAwesomeIcon id="event" className="event1" icon={faVideo} />
                    <FontAwesomeIcon id="event" icon={faPhone} />
                </div>
                <FontAwesomeIcon id="user-oper" icon={faArrowUpFromBracket} />
                <FontAwesomeIcon id="user-oper" icon={faUserPlus} />
                <FontAwesomeIcon id="user-oper" icon={faSquareArrowUpRight} />
            </div>
        </div>
      
    </div>
  )
}

export default MessageNavigation
