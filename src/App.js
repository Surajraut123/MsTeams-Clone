
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
import myContext from './chat/MyContext';
import peopleContext from './chat/AddPeopleContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect , useState} from 'react';
import AddPeople from './chat/AddPeople';


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
  const [appVisibility, setAppVisibility] = useState(false);
  const [converstion, setConverstion] = useState(false);

  useEffect(() => {
    let timer;
    if (visibility) {
      timer = setTimeout(() => {
        setAppVisibility(true);
        const welcomeElement = document.getElementById('welcome');
        if (welcomeElement) {
          welcomeElement.style.display = "none";
        }
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [visibility]);


  const setLandingPageVisibility = () => {
    setVisibility(true)
  }

  const handleConversionVisibility = () => {
    setConverstion(true);
  }
    const handleOutsideClick = () => {
    if (converstion) {
      setConverstion(false);
    }
  };
  


  return (
    <Router>
      <div className="App"> 
        {visibility && <Navbar/>}
          {appVisibility && <div className="userSection" onClick={handleOutsideClick}>
            {converstion && <AddPeople/>}
            <TeamsActivity/>
            <peopleContext.Provider value={handleConversionVisibility}>
              <Routes>
                  <Route exact path='/' element={<Chat/>}></Route>
                <Route exact path='/community' element={<Community/>}></Route>
                <Route exact path='/calendar' element={<CalendarNavbar/>}></Route>
                <Route exact path='/activity' element={<Activity/>}></Route>
              </Routes>  
            </peopleContext.Provider>
          </div>}
        <myContext.Provider value={setLandingPageVisibility}>
          {!visibility && <UserAuthentication/>}
          {visibility && <div id='welcome'>
            <img src={Logo} alt='loading'/>
            <div className='logo'>  
              <img src={logo} alt='loading' />
              <h2>Microsoft</h2>
            </div>
          </div>}
        </myContext.Provider>
      </div>
     </Router>  
  );
}

export default App;
