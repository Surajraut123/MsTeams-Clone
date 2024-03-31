
import './App.css';
import Navbar from './Navbar/Navbar';
import TeamsActivity from './TeamsNavigation/TeamsActivity';
import Chat from './chat/chat_main_page';
import Activity from './activity/activity';
import CalendarNavbar from './calender/navbar/CalendarNavbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// import UserMassage from './chat/messageBlock/userMessage/UserMassage';
// import Contacts from './chat/contactBlock/Contacts';
// import NewMeeting from './calender/meeting/NewMeeting';

function App() {
  return (
    <Router>
      <div className="App"> 
        <Navbar/>
        <div className="userSection">
          <TeamsActivity/>
          {/* <NewMeeting/> */}
          <Routes>
            <Route exact path='/' element={<Chat/>}></Route>
            <Route exact path='/calendar' element={<CalendarNavbar/>}></Route>
            <Route exact path='/activity' element={<Activity/>}></Route>
          </Routes>  
        </div>
      </div>
     </Router>  
  );
}

{/* <Contacts/>
<UserMassage/> */}
export default App;
