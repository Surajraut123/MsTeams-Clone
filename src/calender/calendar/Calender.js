import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timegridplugin from '@fullcalendar/timegrid'
import "./Calendar.scss"
function Calender({getNewMeetingStatus}) {

  let tempMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let perMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const[isrender, setrender] = useState(true);

  var todayDate = "";
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
    var title = document.querySelector(".fc-toolbar-title");
    if (title) {
      title.textContent = getTodayDate();
      handleWeekDays();

      // Select the buttons based on their titles
      const prevButton = document.querySelector('button[title="Previous week"]');
      const nextButton = document.querySelector('button[title="Next week"]');
      const todayButton = document.querySelector('button[title="This week"]');
      
      if (prevButton) {
        prevButton.addEventListener("click", function () {
          title.textContent = title.textContent.replace(todayDate, "");
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        });
      }
      if (nextButton) {
        nextButton.addEventListener("click", function () {
          title.textContent = title.textContent.replace(todayDate, "");
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        });
      }
      if (todayButton) {
        todayButton.addEventListener("click", function () {
          title.textContent = title.textContent.replace(todayDate, "");
          todayButton.textContent = todayButton.textContent.replace("today", "")
          title.textContent = getTodayDate();
          handleWeekDays();
        });
      }
      
      todayButton.textContent = "Today"
    }
  });

  let tmpWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  let perWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleWeekDays = () => {
    const day = document.querySelectorAll(".fc-col-header-cell-cushion")
    day.forEach((element) => {
      var givenDay = element.textContent;
      const dayName = document.createElement("p");
      dayName.textContent = getDayName(givenDay);

      const dayDate = document.createElement("span")
      dayDate.textContent = getDayDate(givenDay);
      

      element.innerHTML = "";
      element.appendChild(dayDate)
      element.appendChild(dayName)
    });
  }

  const getDayName = (name) => {
    const index = tmpWeek.indexOf(name.slice(0, 3));
    // console.log("index : " + index + " day : " + perWeek[index])
    return perWeek[index];
  }
  const getDayDate = (name) => {
    const index = name.indexOf("/");

    return name.slice(index+1)
  }


  useEffect(()=>{
    if(isrender) {
      const CalendarType = document.querySelector(".fc-toolbar-chunk")
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

      CalendarType.appendChild(divtag)
    }  
  })
  
  const handleDateClick = (arg) => { 
    // alert(arg.dateStr)
    getNewMeetingStatus(true, arg);
    setrender(false);
  }
  
  return (
    <div className='mycalender'>
      <FullCalendar
        plugins={[ timegridplugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="timeGridWeek"
        weekends={false}
        nowIndicator={true}
      />

    </div>
  )
}

export default Calender
