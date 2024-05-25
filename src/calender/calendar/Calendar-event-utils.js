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
      color: "",
      extendedProps: {
        department: 'BioChemistry',
        description: 'Lecture'
      }

    },
    {
      id: createEventId(),
      title: 'Feedback',
      start: '2024-05-16' + 'T07:00:00',
      end: '2024-05-16' + 'T08:30:00',
      color: "",
      extendedProps: {
        department: 'BioChemistry',
        description: 'Lecture'
      }

    }
  ];
  
  
  export function createEventId() {
    return String(eventGuid++);
  }