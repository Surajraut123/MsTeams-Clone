
import './App.css';
import Navbar from './Navbar/Navbar';
import TeamsActivity from './TeamsNavigation/TeamsActivity';
import UserMassage from './chat/messageBlock/userMessage/UserMassage';
// import Contacts from './chat/contactBlock/Contacts';
import Activity from './activity/activity';
// import CalendarNavbar from './calender/navbar/CalendarNavbar';


function App() {
  return (
      <div className="App"> 
        <Navbar/>
        <div className="userSection">
          <TeamsActivity/>
          {/* <CalendarNavbar/> */}
            {/* <Contacts/>
            <UserMassage/> */}
            <Activity/>
        </div>
      </div>
  );
}

export default App;
