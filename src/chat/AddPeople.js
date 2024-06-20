import React, {useEffect, useRef, useState} from 'react'
import './addpeople.scss';
const AddPeople = ({active, loggedInUserId}) => {

    const inputRef = useRef(null);
    const[members, getUserMembers] = useState()
    console.log("logged id : ", loggedInUserId)
    const handleCopy = () => {
        inputRef.current.select();
        navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
    };

    useEffect(() => {
        if(!active) return;
        const getMembers = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users", {
                    method: "GET",
                    headers: {
                        "Content-type" : "application/json"
                    }
                })
                const data = await response.json();
                console.log(data)
                getUserMembers(data)
            } catch (error) {
                console.log("While Fetching members : ", error)
            }
        }

        getMembers()
    },[active])

    const getIcon = (data) => {
        const userName = data.split(" ");
        if(userName[1]) {
            return userName[0]?.charAt(0).toUpperCase() + userName[1]?.charAt(0).toUpperCase();
        }
        return userName[0]?.charAt(0).toUpperCase() + "N";
    }

    const createNewConversation = async (senderId, receiverId) => {
        try {
            const response = await fetch("http://localhost:8000/api/conversation", {
                method: "POST",
                body: JSON.stringify({
                    senderId: senderId,
                    receiverId: receiverId
                }),
                headers: {
                    "Content-type" : "application/json"
                }
            })
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log("While Creating new Conversion : ", error)
        }
    }

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
                    {members?.userData.map((data) => {
                        return (
                            data.userid !== loggedInUserId && (<div className='user' key={data.userid} onClick={() => createNewConversation(loggedInUserId, data.userid)}>
                                <div className="user-profile">
                                    <span>{getIcon(data.fullname)}</span>
                                </div>
                                <div className="user-details">
                                    <div className="name-date">
                                        <h3 className='text-lg'>{data.fullname}</h3>
                                    </div>
                                </div>
                            </div>)
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPeople