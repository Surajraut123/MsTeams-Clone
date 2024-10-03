import React from 'react'
import Man from './man.png'
import woman from './woman.png'
import "./landingpage.scss"
const ChatHomePage = () => {
  return (
    <div className='landingPage'>
        <div className="content">
            <div className="conversation">
                <div className="receiver">
                    <img src={woman} alt="loading" />
                    <div className="info1">
                        <div className='div1'></div>
                        <div className='div2'></div>
                    </div>
                </div>
                <div className="user">
                    <div className="info1">
                            <div className='div1'></div>
                            <div className='div2'></div>
                        </div>
                    </div>
                <div className="sender">
                    <img src={Man} alt="loading" />
                    <div className="info1">
                    <div className='div1'></div>
                        <div className='div2'></div>
                    </div>
                </div>
            </div>

            <div className="info">
                <h1>Have Private conversations</h1>
                <p>Sometimes you just want to chat or video call privately one-on-one or with a group</p>
            </div>
        </div>
    </div>
  )
}

export default ChatHomePage
