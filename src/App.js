
import './App.css';
import Navbar from './Navbar/Navbar';
import TeamsActivity from './TeamsNavigation/TeamsActivity';
import Chat from './chat/ChatMainPage';
import Activity from './activity/activity';
import CalendarNavbar from './calender/navbar/CalendarNavbar';
// import UserAuthentication from './authentication/Authentication'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Community from './community/Community';

// import UserMassage from './chat/messageBlock/userMessage/UserMassage';
// import Contacts from './chat/contactBlock/Contacts';
// import NewMeeting from './calender/meeting/NewMeeting';

// const ProtectedRoute = ({ children, auth= false}) =>{
//   const isLoggedIn = localStorage.getItem('user:token') !== null || false
//   if(!isLoggedIn && auth)  {
//     return <Navigate to={'users/signin'}/>
//   } else if(isLoggedIn && ['/users/signin', '/users/signup'].includes(window.location.pathname)) {
//     return <Navigate to={'/'}/>
//   }

//   return children
// }

function App() {
  return (
    <Router>
      <div className="App"> 
        <Navbar/>
        <div className="userSection">
          <TeamsActivity/>
          <Routes>
            <Route exact path='/' element={<Chat/>}></Route>
            <Route exact path='/community' element={<Community/>}></Route>
            <Route exact path='/calendar' element={<CalendarNavbar/>}></Route>
            <Route exact path='/activity' element={<Activity/>}></Route>
          </Routes>  
        </div>
        {/* <UserAuthentication/> */}
      </div>
     </Router>  
  );
}

export default App;
