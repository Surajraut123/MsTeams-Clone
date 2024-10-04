

import React, {useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faBars, faCalendarDays, faClock, faLocationDot, faPen, faRepeat, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Editor } from '@tinymce/tinymce-react';
// import { INITIAL_EVENTS } from '../calendar/Calendar-event-utils'
import './newmeeting.scss';

import { addEvent } from "../calendar/Calendar-event-utils";

export const newEventData = [];

function NewMeeting(props) {

    const[dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });
    const [formData, setFormData] = useState({
        title: '',
        attendees: '',
        startDate: '',
        startTime: '',
        lastDate: '',
        lastTime: '',
        duration: '',
        location: ''
    })
    

    const meetingSlot = new Date(props.scheduleMeeting);
    const startDate = meetingSlot.getDate();
    const year = meetingSlot.getFullYear();
    const startTime = meetingSlot.getHours();
    const startMinute = meetingSlot.getMinutes();
    const month = meetingSlot.getMonth();

    useEffect(() => {
        const meetingDate = formatDate(year, month, startDate);
        const meetingTime = formatTime(startTime, startMinute);
        setFormData(prevData => ({
          ...prevData,
          startDate: meetingDate,
          startTime: meetingTime,
          lastDate: meetingDate,
          lastTime: meetingTime
        }));

    }, [year, month, startDate, startTime, startMinute]);
    
    const [duration, setDuration] = useState('00');

    function formatDate(year, month, day) {
        const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        return `${year}-${formattedMonth}-${formattedDay}`;
    }
    function formatTime(hours, minute) {
        const formattedHours = hours%24 === 0 ? 12 : hours%24;
        const suffix = hours < 12 ? 'AM' : 'PM';
        if(!minute) {
            return `${formattedHours}:00 ${suffix}`;
        }
        return `${formattedHours}:${minute} ${suffix}`;
    }

    const editorRef = useRef(null);
    const handleFocus = () => {
        var clicked = document.querySelectorAll(".inputItem")
        if(clicked) {
            clicked.forEach(function (item) {
                item.addEventListener("click", function () {
                    item.style.borderBottom = "2px solid #4845c9";
                });
            });
        }   
    }
    const handleBlur = () => {
        var clicked = document.querySelectorAll(".inputItem")
        if(clicked) {
            clicked.forEach(function (item) {
                    item.style.borderBottom = "2px solid rgba(0, 0, 0, 0)";
            });
        }   
    }
    const handleSaveButton = () => {
        console.log("Save Clicked")
        props.saveCalendarNavbar(false);

        const newEvent = {
            id:"3",
            title: formData.title,
            start: formData.startDate + formatNewMeetingTime(formData.startTime),
            end: formData.lastDate + formatNewMeetingTime(formData.lastTime),
            color: "",
          };
          console.log("After Save new Event : ", newEvent);
        addEvent(newEvent);
        props.handleEventAdd(newEvent);   
    };
    

    const formatNewMeetingTime = (timeData) =>{
        let getTime = timeData.split(":");
        return  'T'+ (Number(getTime[0]) > 10 ? `${getTime[0]}` : `0${getTime[0]}`) + ':' +(getTime[1].split(' ')[0]) + ':00';

    }
    const handleCloseButton = () =>{
        props.closeCalendarNavbar(false);

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedState = {
                ...prevState,
                [name]: value
            };
            return updatedState;
        }); 
    };
    
    useEffect(() => {
        if (formData.startTime && formData.lastTime) {
            let timeDuration = getDuration(formData.lastTime, formData.startTime);
            setDuration(timeDuration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]); 

    

    function generateTimeOptions() {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            const hourInAmPm = hour % 12 === 0 ? 12 : hour % 12;
            const suffix = hour < 12 ? 'AM' : 'PM';
            options.push(
                <option key={`${hour}:00`} value={`${hourInAmPm}:00 ${suffix}`}>{`${hourInAmPm}:00 ${suffix}`}</option>,
                <option key={`${hour}:30`} value={`${hourInAmPm}:30 ${suffix}`}>{`${hourInAmPm}:30 ${suffix}`}</option>
            );
        }
        return options;
    }

    const getDuration = (endTime, beginningTime) => {
        let [endHour, endMin] = endTime.split(":");
        let [beginHour, beginMin] = beginningTime.split(":");
        
        if (endMin.includes("PM")) {
            endHour = Number(endHour) + 12;
        }
        if (beginMin.includes("PM") && beginHour) {
            beginHour = Number(beginHour) + 12;
        }
        
        endHour = Number(endHour);
        beginHour = Number(beginHour);
        endMin = Number(endMin.split(/\s+(AM|PM)/i)[0]);
        beginMin = Number(beginMin.split(/\s+(AM|PM)/i)[0]);
        
        // Calculate differences
        let deltaHours = endHour - beginHour;
        let deltaMinutes = endMin - beginMin;

        if (deltaMinutes < 0) {
            deltaMinutes += 60;
            deltaHours -= 1;
        }

        let duration = "";
        if (deltaHours > 0) duration += `${deltaHours} hr `;
        if (deltaMinutes > 0) duration += `${deltaMinutes} min`;


        setDateTime(prev => {
            const updateDate = {
                ...prev,
                date: `${formData.startDate} + ${formData.lastDate}`,
                time: `${formData.startTime} + ${formData.lastTime}`
            }
            return updateDate;
        })
        return duration.trim(); 
    };

    
    

  return (
    <div className={props.meetingStatus ? "newMeeting" :"hiddenMeeting"}>
        <div className="newMeetingNavbar">
            <div className="headingContent">
                <div className="heading">
                    <FontAwesomeIcon id="cicon" icon={faCalendarDays} />
                    <h1>New meeting</h1>
                </div>
                <div className="save-close-buttons">
                    <button className='save' onClick={handleSaveButton}>Save</button>
                    <button className='close' onClick={handleCloseButton}>Close</button>
                </div>
            </div>
            <hr style={{borderTop : '1px solid #ffffff00'}}/>
            <div className="timeZone">
                <label forName="timeZones">Time Zone: </label>
                <select id="timeZones">
                    <option value="-12">(UTC-12:00) International Date Line West</option>
                    <option value="-12">(UTC-05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    <option value="-11">(UTC-11:00) Midway Island, Samoa</option>
                    <option value="-10">(UTC-10:00) Hawaii</option>
                    <option value="-09">(UTC-09:00) Alaska</option>
                    <option value="-08">(UTC-08:00) Pacific Time (US & Canada)</option>
                    <option value="-07">(UTC-07:00) Mountain Time (US & Canada)</option>
                    <option value="-06">(UTC-06:00) Central Time (US & Canada)</option>
                    <option value="-05">(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option value="-04">(UTC-04:00) Atlantic Time (Canada)</option>
                    <option value="-03">(UTC-03:00) Buenos Aires, Georgetown</option>
                    <option value="-02">(UTC-02:00) Mid-Atlantic</option>
                    <option value="-01">(UTC-01:00) Azores, Cape Verde Islands</option>
                    <option value="00">(UTC±00:00) Greenwich Mean Time (GMT)</option>
                    <option value="01">(UTC+01:00) Amsterdam, Berlin, Paris, Rome</option>
                    <option value="02">(UTC+02:00) Athens, Istanbul, Cairo</option>
                    <option value="03">(UTC+03:00) Moscow, St. Petersburg, Volgograd</option>
                    <option value="04">(UTC+04:00) Dubai, Abu Dhabi, Baku</option>
                    <option value="05">(UTC+05:00) Tashkent, Islamabad, Karachi</option>
                    <option value="05:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    <option value="06">(UTC+06:00) Almaty, Dhaka</option>
                    <option value="07">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                    <option value="08">(UTC+08:00) Beijing, Singapore, Hong Kong</option>
                    <option value="09">(UTC+09:00) Tokyo, Seoul, Osaka</option>
                    <option value="09:30">(UTC+09:30) Adelaide, Darwin</option>
                    <option value="10">(UTC+10:00) Sydney, Melbourne, Brisbane</option>
                    <option value="11">(UTC+11:00) Vladivostok, Solomon Islands, New Caledonia</option>
                    <option value="12">(UTC+12:00) Fiji, Kamchatka, Marshall Is.</option>
                    <option value="13">(UTC+13:00) Nuku'alofa</option>
                </select>     
            </div>
            <hr style={{borderTop : '1px solid #ffffff00'}}/>
        </div>

        <div className="setMeetingForm">
            <div className="meetingForm">
                <form action="#" method="post">
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faPen} />
                        <input type="text"  placeholder='Add Title' className='inputItem' onFocus={handleFocus} onBlur={handleBlur} value={formData.title} name='title' onChange={handleChange}/>
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faUserPlus} />
                        <input type="text"  placeholder='Add Required attendees' className='inputItem' onFocus={handleFocus} onBlur={handleBlur} value={formData.attendees} name='attendees' onChange={handleChange}/>
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faClock} />
                        <div className="time">
                            <div className='start'>
                                <input type="date" id="dateInput" name="startDate" value={formData.startDate} onChange={handleChange}/>
                                <select name="startTime" id="timeSelect" value={formData.startTime} onChange={handleChange}>
                                    {generateTimeOptions()}
                                </select>
                                <FontAwesomeIcon icon={faArrowRight} id='rightArrow'/>
                            </div>
                            <div className='end'>
                                <input type="date" id="dateInput" name="lastDate" value={formData.lastDate} onChange={handleChange}/>
                                <select name="lastTime" id="timeSelect" value={formData.lastTime} onChange={handleChange}>
                                    {generateTimeOptions()}
                                </select>
                            </div>
                            <span>{duration} </span>
                        </div>
                        {/* <input type="text"  placeholder='time' className='inputItem' onFocus={handleFocus} onBlur={handleBlur}/> */}
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faRepeat} />
                        <select id="duration" className='inputItem' onFocus={handleFocus} onBlur={handleBlur} value={formData.duration} onChange={handleChange} name='duration'>
                            <option value="dnr">Does not repeat</option>
                            <option value="ew">Every weekday (Mon -Fri)</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom</option>
                        </select>

                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faLocationDot} />
                        <input type="text"  placeholder='Add location' className='inputItem' onFocus={handleFocus} onBlur={handleBlur} name='location' value={formData.location} onChange={handleChange}/>
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faBars} />
                        <Editor
                            apiKey='ouwa78rqe8kqx3r274f1baz9cr55uwrn3tmemfylnpf1h8bx'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />   

                    </div>
                </form>
            </div>
        </div>
    </div>    
  )
}

export default NewMeeting

export function getNewEventArray() {
    return newEventData;
}
