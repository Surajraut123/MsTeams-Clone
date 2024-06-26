import React, { useContext, useState } from 'react'
import './contacts.scss'
import List from './contactList/List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useSelector } from 'react-redux'
import { faVideo, faPenToSquare, faCaretDown, faCaretRight, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import myContext from '../MyContext'
import peopleContext from '../AddPeopleContext';
function Contacts(props) {

  const [select, setSelect] = useState(false);
  const handleRecent = () => {
    select ? setSelect(false) : setSelect(true);
  }

  const value = useContext(myContext)
  const peopleContextValue = useContext(peopleContext);
  return (
    <div className={!value?.isClicked ? 'userContact' : 'userContact userMobile'}>
      <div className="header">
        <h1>{props.title==="Feed" ? "Feed" : "Chat"}</h1>

        <div className="chatIcons">
          <div id="filter" className='icons'>
            <hr style={{width: "17px"}}/>
            <hr style={{width: "11px"}}/>
            <hr style={{width: "5px"}}/>
          </div>
          <div id="meeting" className={props.title === "Feed" ? "icon1" : "Selected"}>
            <FontAwesomeIcon icon={faGear} id='gear'/>
          </div>
          <div id="meeting" className={props.title === "Feed" ? "Selected" : "icons"}>
            <FontAwesomeIcon icon={faVideo} />
          </div>
          <div id="new-conv" className={props.title === "Feed" ? "Selected" : "icons"}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </div>
        </div>
      </div>

      <div className="recent" onClick={handleRecent}>
        <FontAwesomeIcon icon={faCaretDown} id='recent-icons' style={{display : select ? 'none' : 'block'}}/>
        <FontAwesomeIcon icon={faCaretRight} id='recent-icons' style={{display : select ? 'block' : 'none'}}/>
        <span>Recent</span>
      </div>
      <List fetchConversation={props.fetchConversation}/>

      <div className='add-member'>
        <div className='btn' onClick={() => {peopleContextValue.handleConversionVisibility(true)}}>
          <FontAwesomeIcon id="plus-people" icon={faUserPlus} />
          <p>invite people</p>
        </div>
      </div>
    </div>
  )
}

export default Contacts
