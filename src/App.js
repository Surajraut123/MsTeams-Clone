
import './App.css';
import Navbar from './Navbar/Navbar';
import TeamsActivity from './TeamsNavigation/TeamsActivity';
import Chat from './chat/ChatMainPage';
import Activity from './activity/activity';
import CalendarNavbar from './calender/navbar/CalendarNavbar';
import UserAuthentication from './authentication/Authentication'
import Logo from "./logoteams.png"
import logo from './authentication/mslogo.png';
import Community from './community/Community';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect , useState} from 'react';

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

  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeElement = document.getElementById('welcome');
      if (welcomeElement) {
        welcomeElement.style.display = "none";
        setVisibility(true)
      }
    }, 5000);
  
    return () => clearTimeout(timer);
  }, []);
  


  return (
    <Router>
      <div className="App"> 
        {/* {visibility && <Navbar/>}
        {visibility && <div className="userSection">
          <TeamsActivity/>
          <Routes>
            <Route exact path='/' element={<Chat/>}></Route>
            <Route exact path='/community' element={<Community/>}></Route>
            <Route exact path='/calendar' element={<CalendarNavbar/>}></Route>
            <Route exact path='/activity' element={<Activity/>}></Route>
          </Routes>  
        </div>} */}
        <UserAuthentication/>
        {/* <div id='welcome'>
          <img src={Logo} alt='loading'/>
          <div className='logo'>  
            <img src={logo} alt='loading' />
            <h2>Microsoft</h2>
          </div>
        </div> */}
      </div>
     </Router>  
  );
}

export default App;
