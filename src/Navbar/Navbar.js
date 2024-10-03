import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faEllipsis, faMinus, faUser, faWindowRestore, faXmark } from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";

function Navbar() {
  const [searchTitle, setsearchTitle] = useState(" Search ")
  const [enableinfo, setInfo] = useState(false);
  const [mode, setMode] = useState("dark");
  const userAccountRef = useRef(null);
  const uiModeReference = useRef('light-mode');

  const handleFocus = () => {
    setsearchTitle("Search for people, chats and communities");
  };
  const loggedinUser = JSON.parse(localStorage.getItem('loggedUser:detail'));
  console.log(loggedinUser)

  const handleBlur = () => {
    console.log("called")
    setsearchTitle(" Search");
    setInfo(false)
  };

  const enableUserDetails = () => {
    setInfo(!enableinfo);
  }
  const handleChange = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark";
      uiModeReference.current = newMode + "-mode";
      return newMode;
    });
  }
  useEffect(() => {
    document.documentElement.className = uiModeReference.current;
  }, [mode]);

  const getIcon = (data) => {
    const userName = data.split(" ");
    if(userName[1]) {
        return userName[0]?.charAt(0).toUpperCase() + userName[1]?.charAt(0).toUpperCase();
    }
    return userName[0]?.charAt(0).toUpperCase() + "N";
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userAccountRef.current && !userAccountRef.current.contains(event.target)) {
        setInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  return (
    <>
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
          <div className="profile-section" onClick={enableUserDetails}>
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

    {enableinfo && (<div className="user-account" ref={userAccountRef}>
      <div className="info">
        <div className="logo">
          <span>{getIcon(loggedinUser?.fullName)}</span>
        </div>

        <div className="user-info">
          <p>{loggedinUser?.fullName}</p>
          <span>{loggedinUser?.email}</span>
        </div>
      </div>

      <div className="manage">
        <span>{mode === "dark" ? "Light" : "Dark"} Mode</span> {/* Adjusted label */}
        <Switch
          onChange={handleChange}
          checked={mode === "dark"} 
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="black"
          width={40}
          height={20}
          handleDiameter={15}
        />
      </div>
      <div className="signout" onClick={handleSignOut}>
        <p>Sign out</p>
      </div>
    </div>)
    }
    </>
  );
}

export default Navbar;
