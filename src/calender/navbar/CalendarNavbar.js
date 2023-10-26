import React from 'react'
import "./calenderNavbar.scss"
import Calender from "../calendar/Calender"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faHashtag, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
function CalendarNavbar() {
  return (
    <div className='calendarNavbar'>
      <div className="section">
        <div className="cheader">
            <FontAwesomeIcon id="cicon" icon={faCalendarDays} />
            <h1>Calendar</h1>
            <a href="/google-calendar">Add to Google Calendar</a>
        </div>

        <div className="userMeetings">
            <p id="my-meeting" ><FontAwesomeIcon icon={faHashtag}/> Join with an ID</p>
            <p id="my-meeting" ><FontAwesomeIcon icon={faVideo}/> Meet Now</p>
            <p id="new-meeting"><FontAwesomeIcon icon={faPlus}/> New Meeting</p>
        </div>

      </div>
        <Calender/>
    </div>
  )
}

export default CalendarNavbar
