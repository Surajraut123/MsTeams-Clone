import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareUpRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./list.scss"
function List() {
  return (
    <div className='teamMates'>
      <div className="user">
        <div className="user-profile">
          {/* <img src="" alt="" /> */}
          <span>RS</span>
        </div>

        <div className="user-details">
          <div className="name-date">
            <span>Suraj Raut</span>
            <p>10/15</p>
          </div>
          <div className="latest-message">
            <p>This message was deleted</p>
          </div>
        </div>

        <div className="user-actions">
          <FontAwesomeIcon icon={faSquareUpRight}/>
          <FontAwesomeIcon icon={faEllipsis}/>
        </div>
      </div>
    </div>
  )
}

export default List
