
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, '');

export const INITIAL_EVENTS = [

    {
      id: createEventId(),
      title: 'Free Time',
      start: todayStr + 'T08:00:00',
      end: todayStr + 'T11:00:00',
      color: "",
  
    },
    {
      id: createEventId(),
      title: 'LT Review',
      start: todayStr + 'T00:00:00',
      end: todayStr + 'T07:00:00',
      color: ""

    },
    {
      id: createEventId(),
      title: 'Feedback',
      start: todayStr + 'T07:00:00',
      end: todayStr + 'T08:30:00',
      color: ""
    },
    {
      id: createEventId(),
      title: 'new',
      start: todayStr + 'T11:00:00',
      end: todayStr + 'T11:30:00',
      color: ""
    }

  ];

  export function getInitialEvents() {
    return INITIAL_EVENTS;
  }
  
  export function addEvent(newEvent) {
    console.log("Add Event from Utils: ", newEvent)
    console.log("Before update initial events : ", INITIAL_EVENTS)
    INITIAL_EVENTS.push({
      ...newEvent
    });
    console.log("After update inital eventS FROM Utils ", INITIAL_EVENTS)
  }
  
  export function createEventId() {
    return String(eventGuid++);
  }