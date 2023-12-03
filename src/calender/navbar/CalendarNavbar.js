import React from 'react'
import "./calenderNavbar.scss"
import Calender from "../calendar/Calender"
import NewMeeting from "../meeting/NewMeeting"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faHashtag, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
function CalendarNavbar() {
  const [meeting, setMeeting] = useState(false)
  const [meetingTime, setMeetingTime] = useState(null)
  const handleNewMeetingStatus = (event, arg) =>{
    setMeeting(event);
    setMeetingTime(arg.date);
  }

  const handleCloseMeeting = (event) =>{
    setMeeting(event);
  }

  const handleSaveMeeting = (event) =>{
    setMeeting(event);
  }
  console.log("meeting : ", meeting);
  return (
    <>
      <div className={meeting ? 'hiddenCalendar' : 'calendarNavbar'}>
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
          <Calender getNewMeetingStatus={handleNewMeetingStatus}/>
      </div>
      <NewMeeting meetingStatus={meeting} saveCalendarNavbar={handleSaveMeeting} closeCalendarNavbar={handleCloseMeeting} scheduleMeeting={meetingTime}/>
    </>
  )
}

export default CalendarNavbar
