import React, { useEffect } from 'react'
import "./calenderNavbar.scss"
import Calender from "../calendar/Calender"
import NewMeeting from "../meeting/NewMeeting"
import { INITIAL_EVENTS } from '../calendar/Calendar-event-utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faHashtag, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
function CalendarNavbar() {
  const [meeting, setMeeting] = useState(false)
  const [meetingTime, setMeetingTime] = useState(null)
  const [newMeetingEvent, setNewMeetingEvent] = useState(INITIAL_EVENTS)
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

  const handleMeetingEvent = (event) => {
    setNewMeetingEvent(event)
  }
  useEffect(() => {
  }, [newMeetingEvent])
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
          <Calender getNewMeetingStatus={handleNewMeetingStatus} setMeetingEvent={newMeetingEvent}/>
      </div>
      <NewMeeting meetingStatus={meeting} saveCalendarNavbar={handleSaveMeeting} closeCalendarNavbar={handleCloseMeeting} scheduleMeeting={meetingTime} setMeetingEvent={handleMeetingEvent}/>
    </>
  )
}

export default CalendarNavbar
