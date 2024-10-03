import React, { useEffect } from 'react'
import "./calenderNavbar.scss"
import Calender from "../calendar/Calender"
import NewMeeting from "../meeting/NewMeeting"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faHashtag, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { getInitialEvents } from '../calendar/Calendar-event-utils';

function CalendarNavbar() {
  const [meeting, setMeeting] = useState(false)
  const [meetingTime, setMeetingTime] = useState(null)

  const [events, setEvents] = useState(getInitialEvents());
  console.log("From Calendar Navbar : ", events);

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
    console.log("From Navbar", event);
    setEvents([...events, event]);
  }
  useEffect(() => {
    console.log("Inside Navbar useEffect : ", getInitialEvents());
    setEvents(getInitialEvents());
  }, [events]);

  const handleEventAdd = (newEvent) => {
    console.log("Handle Event add called : ", newEvent)
    setEvents([...events, newEvent]);
  };


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
              <p id="my-meeting-m" ><FontAwesomeIcon icon={faHashtag}/></p>
              <p id="my-meeting" ><FontAwesomeIcon icon={faVideo}/> Meet Now</p>
              <p id="my-meeting-m" ><FontAwesomeIcon icon={faVideo}/></p>
              <p id="new-meeting"><FontAwesomeIcon icon={faPlus}/> New Meeting</p>
              <p id="new-meeting-m"><FontAwesomeIcon icon={faPlus}/></p>
          </div>

        </div>
          <Calender getNewMeetingStatus={handleNewMeetingStatus}/>
      </div>
      <NewMeeting 
        meetingStatus={meeting} 
        saveCalendarNavbar={handleSaveMeeting} 
        closeCalendarNavbar={handleCloseMeeting} 
        scheduleMeeting={meetingTime} 
        setMeetingEvent={handleMeetingEvent}
        handleEventAdd={handleEventAdd}/>
    </>
  )
}

export default CalendarNavbar
