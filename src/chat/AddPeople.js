import React, {useRef} from 'react'
import './addpeople.scss';
const AddPeople = () => {

    const inputRef = useRef(null);

  const handleCopy = () => {
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value)
    .then(() => {
        console.log('Text copied to clipboard');
    })
  };
  return (
    <div className='toggle'>
        <div className='content'>
            <div className='invite-link'>
                <h3>Invite to Microsoft Teams</h3>
                <div className='link'>
                    <input type='text' value="http://localhost:8000/invite/userid" ref={inputRef} readOnly />
                    <button onClick={handleCopy}>Copy</button>
                </div>
            </div>
            <div className='members'>
                <h3>Make Conversations</h3>
                <div className='peoples'>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className="user-profile">
                            <span>SR</span>
                        </div>
                        <div className="user-details">
                            <div className="name-date">
                                <h3 className='text-lg'>Suraj Raut</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPeople