import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timegridplugin from '@fullcalendar/timegrid'
import { INITIAL_EVENTS } from '../calendar/Calendar-event-utils'
import { getInitialEvents } from '../calendar/Calendar-event-utils';
import "./Calendar.scss"

function Calender({getNewMeetingStatus}) {

  const [events, setEvents] = useState(getInitialEvents());

  useEffect(() => {
    setEvents(getInitialEvents());
  }, []);

  console.log("Evennts from Calender : ", events)
  let tempMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let perMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var todayDate = "";
  
  useEffect(() => {
    const event = document.querySelectorAll('.fc-event-title-container');
    const meetingTitle = document.querySelectorAll('.fc-event-title');
    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = "Microsoft Teams Meeting Suraj Raut";
    
    meetingTitle.forEach(function(element, index) {
      if(element.textContent.trim() === "LT Review") {
        if(event[index]) event[index].appendChild(description);
      }
    });

    function checkIntersection(el1, el2) {
      let rect1 = el1.getBoundingClientRect();
      let rect2 = el2.getBoundingClientRect();
      rect1 = {
          top: rect1.top,
          bottom: rect1.top + 2, 
          left: 0, 
          right: document.documentElement.clientWidth
        };
        return !(rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom ||
               rect1.right < rect2.left ||  
               rect1.left > rect2.right);
    }
  
    function updateHighlighting() {
        const line = document.querySelector('.fc-timegrid-now-indicator-line');
        if (!line) {
            console.error("Time indicator line not found!");
            return;
        }
    
        const containers = document.querySelectorAll('.fc-event-title-container');
        containers.forEach(container => {
            if (checkIntersection(line, container)) {
              container.classList.add('highlight');
            } else {
              container.classList.remove('highlight');
            }
        });
    }
    updateHighlighting();
    setInterval(updateHighlighting, 60000);
    
    const CalendarType = document.querySelector(".fc-toolbar-chunk")
    if(CalendarType.querySelectorAll('.workMode').length === 0) {
      const divtag = document.createElement("div")
      divtag.className = "workMode"

      const icon1 = document.createElement("i")
      icon1.className = "fa-solid fa-calendar-week";

      const icon2 = document.createElement("i")
      icon2.className = "fa-solid fa-chevron-down";
      
      const ptag = document.createElement("p")
      ptag.textContent = "Work Week"
      
      divtag.appendChild(icon1)
      divtag.appendChild(ptag)
      divtag.appendChild(icon2)

      CalendarType.appendChild(divtag);
    }
  }, []);
  const getDayDate = (name) => {
    if(name.includes("day")) {
      const index = name.slice(0,2);
      if(isNaN(Number(index[1]))) {
        return index.slice(0, 1);
      }
      return index;
    } else{ 
      const index = name.indexOf("/");
      return name.slice(index+1)
    }
  }

  const getTodayDate = () => {
    var title = document.querySelector(".fc-toolbar-title")
    if(title) {
      var month = title.textContent.slice(0, 3)
      var len = title.textContent.length
      var year = title.textContent.slice(len-4, len)
      todayDate = perMonth[tempMonth.indexOf(month)];
      todayDate = todayDate + " " + year;
    }
    return todayDate;
  } 
  
  useEffect(() => {
    const handleWeekDays = () => {
      let perWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      let dayindex=0;
      const day = document.querySelectorAll(".fc-col-header-cell-cushion")
      
      day.forEach((element) => {
        var givenDay = element.textContent;
        const dayDate = document.createElement("span")
        dayDate.textContent = getDayDate(givenDay);
        
        const dayName = document.createElement("p");
        dayName.textContent = perWeek[dayindex++];
        
        if(!givenDay.includes("day")) {
          element.textContent = "";
        }
          element.innerHTML = "";
          element.appendChild(dayDate)
          element.appendChild(dayName);
      });
    }

    var title = document.querySelector(".fc-toolbar-title");
    title.textContent = getTodayDate();
    handleWeekDays();
    
    const prevButton = document.querySelector('button[title="Previous week"]');
    const nextButton = document.querySelector('button[title="Next week"]');
    const todayButton = document.querySelector('button[title="This week"]');
    
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if(todayDate.length !== title.textContent.length) {
          title.textContent = title.textContent.replace(todayDate, "").trim();
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        } 
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if(todayDate.length !== title.textContent.length) {
          title.textContent = title.textContent.replace(todayDate, "").trim();
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        }
      });
    }
    if (todayButton) {
      todayButton.addEventListener("click", function () {
        if(todayDate.length !== title.textContent.length) {
          title.textContent = title.textContent.replace(todayDate, "").trim();
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        }
      });
    }
    
    todayButton.textContent = "Today"
  }, [getTodayDate])

  const handleDateClick = (arg) => { 
    getNewMeetingStatus(true, arg);
  }

  console.log(INITIAL_EVENTS)

  const handleEventClick = (clickInfo) => {
    var curr = window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)
    if(curr) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className='mycalender'>
      <FullCalendar
        plugins={[ timegridplugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="timeGridWeek"
        initialEvents={events} 
        weekends={false}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
      />

    </div>
  )
}

export default Calender
