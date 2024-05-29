import React, {useState } from 'react'
import './teamsactivity.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faCommentDots, faPeopleGroup, faBell, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom';

function TeamsActivity() {
  let selectionPath = useLocation();
  const[selected, setSelected] = useState(selectionPath.pathname)
  const combinedEvent = (event) =>{
    setSelected(event[1]);
  }


  return (
    <div className='activitySection'>
      <Link to="/activity" >
        <div className={`activity ${selected === '/bell' ? 'selected' : ''}`} onClick={()=>combinedEvent(["bell", "/bell"])}>
          <FontAwesomeIcon id="icons" className="bell" icon={faBell} />
          <p>Activity</p>
        </div>
      </Link>

      <Link to="/community">
        <div className={`activity ${selected === '/community' ? 'selected' : ''}`} onClick={()=>combinedEvent(["community", "/community"])}>
          <FontAwesomeIcon id="icons" className="community" icon={faPeopleGroup} />
          <p>Community</p>
        </div>
        </Link>
      <Link to="/" >
        <div className={`activity ${selected === '/chat' ? 'selected' : ''}`} onClick={()=>combinedEvent(["chat", "/chat"])}>
          <FontAwesomeIcon id="icons" className="chat" icon={faCommentDots} />
          <p>Chat</p>
        </div>
      </Link>

      <Link to="/calendar" >
        <div className={`activity ${selected === '/calendar' ? 'selected' : ''}`} onClick={()=>combinedEvent(["calendar", "/calendar"])}>
          <FontAwesomeIcon id="icons" className="calendar" icon={faCalendarDays} />
          <p>Calendar</p>
        </div>
      </Link>  
      <Link to="/help" >
        <div className={`activity ${selected === 'help' ? 'selected' : ''}`} onClick={()=>combinedEvent(["help", "/help"])}>
          <FontAwesomeIcon id="icons" className="calendar" icon={faCircleQuestion} />
          <p>Help</p>
        </div>
      </Link>  
      {/* <Link to="/help" >
        <div className="acti">
          <FontAwesomeIcon id='helpIcon' icon={faCircleQuestion} />
          <p>Help</p>
        </div>
      </Link> */}
    </div>
  )
}

export default TeamsActivity
