import React, {useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faBars, faCalendarDays, faClock, faLocationDot, faPen, faRepeat, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Editor } from '@tinymce/tinymce-react';
import './newmeeting.scss';
function NewMeeting(props) {

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
    const handleSaveButton = () =>{
        props.saveCalendarNavbar(false);
    }
    const handleCloseButton = () =>{
        props.closeCalendarNavbar(false);
    }

    const meetingSlot = new Date(props.scheduleMeeting);
    const startDate = meetingSlot.getDate();
    const meetingDay = meetingSlot.getDay();
    const year = meetingSlot.getFullYear();
    const endDate = meetingSlot.getDate();
    const startTime = meetingSlot.getHours();
    const month = meetingSlot.getMonth();

    console.log(startDate," ", meetingDay," ", year," ", endDate," ", startTime, " ", month)

    const meetingDate = `${year}-${month+1}-0${startDate}`;
    console.log(meetingDate)

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
                        <input type="text"  placeholder='Add Title' className='inputItem' onFocus={handleFocus} onBlur={handleBlur}/>
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faUserPlus} />
                        <input type="text"  placeholder='Add Required attendees' className='inputItem' onFocus={handleFocus} onBlur={handleBlur}/>
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faClock} />
                        <div className="time">
                        <input type="date" id="dateInput" name="startDate" value={meetingDate} />
                            <select name="cars" id="timeSelect" >
                                <option value="12:00 AM">12:00 AM</option>
                                <option value="12:30 AM">12:30 AM</option>
                                <option value="1:00 AM">1:00 AM</option>
                                <option value="1:30 AM">1:30 AM</option>
                                <option value="2:00 AM">2:00 AM</option>
                                <option value="2:30 AM">2:30 AM</option>
                                <option value="3:00 AM">3:00 AM</option>
                                <option value="3:30 AM">3:30 AM</option>
                                <option value="4:00 AM">4:00 AM</option>
                                <option value="4:30 AM">4:30 AM</option>
                                <option value="5:00 AM">5:00 AM</option>
                                <option value="5:30 AM">5:30 AM</option>
                                <option value="6:00 AM">6:00 AM</option>
                                <option value="6:30 AM">6:30 AM</option>
                                <option value="7:00 AM">7:00 AM</option>
                                <option value="7:30 AM">7:30 AM</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="8:30 AM">8:30 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="9:30 AM">9:30 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="10:30 AM">10:30 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="1:30 PM">1:30 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="2:30 PM">2:30 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="3:30 PM">3:30 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="4:30 PM">4:30 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="5:30 PM">5:30 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="6:30 PM">6:30 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="7:30 PM">7:30 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                                <option value="8:30 PM">8:30 PM</option>
                                <option value="9:00 PM">9:00 PM</option>
                                <option value="9:30 PM">9:30 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                                <option value="10:30 PM">10:30 PM</option>
                                <option value="11:00 PM">11:00 PM</option>
                                <option value="11:30 PM">11:30 PM</option>
                            </select>
                            <FontAwesomeIcon icon={faArrowRight} id='rightArrow'/>
                            <input type="date" id="dateInput" name="lastdate" value={meetingDate}/>
                            <select name="cars" id="timeSelect">
                                <option value="12:00 AM">12:00 AM</option>
                                <option value="12:30 AM">12:30 AM</option>
                                <option value="1:00 AM">1:00 AM</option>
                                <option value="1:30 AM">1:30 AM</option>
                                <option value="2:00 AM">2:00 AM</option>
                                <option value="2:30 AM">2:30 AM</option>
                                <option value="3:00 AM">3:00 AM</option>
                                <option value="3:30 AM">3:30 AM</option>
                                <option value="4:00 AM">4:00 AM</option>
                                <option value="4:30 AM">4:30 AM</option>
                                <option value="5:00 AM">5:00 AM</option>
                                <option value="5:30 AM">5:30 AM</option>
                                <option value="6:00 AM">6:00 AM</option>
                                <option value="6:30 AM">6:30 AM</option>
                                <option value="7:00 AM">7:00 AM</option>
                                <option value="7:30 AM">7:30 AM</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="8:30 AM">8:30 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="9:30 AM">9:30 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="10:30 AM">10:30 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="1:30 PM">1:30 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="2:30 PM">2:30 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="3:30 PM">3:30 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="4:30 PM">4:30 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="5:30 PM">5:30 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="6:30 PM">6:30 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="7:30 PM">7:30 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                                <option value="8:30 PM">8:30 PM</option>
                                <option value="9:00 PM">9:00 PM</option>
                                <option value="9:30 PM">9:30 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                                <option value="10:30 PM">10:30 PM</option>
                                <option value="11:00 PM">11:00 PM</option>
                                <option value="11:30 PM">11:30 PM</option>
                            </select>
                            <p>total Duration</p>
                        </div>
                        {/* <input type="text"  placeholder='time' className='inputItem' onFocus={handleFocus} onBlur={handleBlur}/> */}
                    </div>
                    <div className="content">
                        <FontAwesomeIcon id="meetingIcon" icon={faRepeat} />
                        <select name="cars" id="duration" className='inputItem' onFocus={handleFocus} onBlur={handleBlur}>
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
                        <input type="text"  placeholder='Add location' className='inputItem' onFocus={handleFocus} onBlur={handleBlur}/>
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
