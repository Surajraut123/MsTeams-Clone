import React from 'react'
import Error from './error.png'
import './offline.scss';
const Offline = () => {
  return (
        <div className='error'>
            <div className='content'>
                <img src={Error} alt='loading'/>
                <h3>We're sorry-- we've run into an issue.</h3>
                <button>Restart</button>
                <p>If that doesn't work, try <span>signing out</span> and back in.</p>
            </div>
        </div>
  )
}

export default Offline