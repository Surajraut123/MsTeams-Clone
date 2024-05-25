import React from 'react'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import './community.scss';
const Community = () => {
  return (
    <div className='communityMain'>
      <div className='container'>
        <div className='heading'>
          <h2>Communities you are a part of will show up here</h2>
          <p>Get started creating your own community by downloading the Teams mobile app</p>
        </div>
        <div className='content'>
          <div className='template'>
            <div className='imgcontainer1'>
              <img src={img1} alt='loading' />
            </div>
            <div>
              <h4>Find your community</h4>
              <p>Bond with others over shared interests</p>
            </div>
          </div>
          <div className='template'>
            <div className='imgcontainer2'>
              <img src={img2} alt='loading' />
            </div>
            <div>
              <h4>Spark discussion</h4>
              <p>Share news and engage in discussions</p>
            </div>
          </div>
          <div className='template'>
            <div className='imgcontainer3'>
              <img src={img3} alt='loading' />
            </div>
            <div>
              <h4>Connect with others</h4>
              <p>Create posts, plan events, and more</p>
            </div>
          </div>
        </div>
        <div className='button'>
          <button>Get started on mobile</button>
        </div>
      </div>
    </div>
  )
}

export default Community