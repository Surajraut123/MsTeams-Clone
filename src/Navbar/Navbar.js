import React, { useState } from 'react';
import "./Navbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faEllipsis, faMinus, faUser, faWindowRestore, faXmark } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [searchTitle, setsearchTitle] = useState(" Search ")

  const handleFocus = () => {
    setsearchTitle("Search for people, chats and communities");
  };

  const handleBlur = () => {
    setsearchTitle(" Search");
  };

  return (
    <div className='navbar'>
      <div className="nav-content">
        <div className="navigation">
          <div className="leftArrow">
            <FontAwesomeIcon icon={faAngleLeft} aria-hidden={true}/>
          </div>
          <div className="rightArrow">
            <FontAwesomeIcon icon={faAngleRight} aria-hidden={true}/>
          </div>
        </div>
        <div className="searchBar" onFocus={handleFocus} onBlur={handleBlur}>
          <input type="text" placeholder={searchTitle}/>
        </div>

        <div className="profile">
          <div className="info">
            <FontAwesomeIcon id="icons" icon={faEllipsis}/>
          </div>
          <div className="profile-section">
            <FontAwesomeIcon id="icons" icon={faUser}/>
          </div>

          <div className="operator">
            <FontAwesomeIcon id="icons" icon={faMinus}/>
            <FontAwesomeIcon id="icons" icon={faWindowRestore}/>
            <FontAwesomeIcon id="cross-icon" icon={faXmark}/>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Navbar;
