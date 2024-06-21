import React, {useEffect, useRef, useState, useContext} from 'react'
import './addpeople.scss';
import GIF from './msgif.gif'
import correct from './correct.gif';
import peopleContext from './AddPeopleContext';
const AddPeople = ({active, loggedInUserId}) => {

    const inputRef = useRef(null);
    const[members, getUserMembers] = useState()
    const[correctGifVisibility, setGifVisibility] = useState({
        id:'',
        visiblity: false
    });
    const peopleContextValue = useContext(peopleContext);
    console.log("People context", peopleContextValue.fetchConversation)
    const handleCopy = () => {
        inputRef.current.select();
        navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        document.getElementById('copy-btn').innerHTML = "Copied!";
        document.getElementById('copy-btn').style.backgroundColor = "#4845c9";
        document.getElementById('copy-btn').style.color = "white";
    };

    console.log("LoggedinUseriD", loggedInUserId);

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
        // try {
        //     const response = await fetch("http://localhost:8000/api/conversation", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             senderId: senderId,
        //             receiverId: receiverId
        //         }),
        //         headers: {
        //             "Content-type" : "application/json"
        //         }
        //     })
        //     const data = await response.json();
        //     console.log("New Conversation ", data)
        //     console.log("ReceiverId ", receiverId)
        // } catch (error) {
        //     console.log("While Creating new Conversion : ", error)
        // }

        console.log("New Conversations CLicked")
        setTimeout(() => {
            setGifVisibility({id: receiverId, visiblity: false});
            setTimeout(() => {
                peopleContextValue.handleConversionVisibility(false);
            }, 1000)
        }, 1300)
        setGifVisibility({id: receiverId, visiblity: true});
    }

    const handleInsideClick = (event) => {
        event.stopPropagation();
    }

  return (
    <div className='toggle' onClick={handleInsideClick}>
        <div className='content'>
            <div className='invite-link'>
                <h3>Invite to Microsoft Teams</h3>
                <div className='link'>
                    <input type='text' value={`http://localhost:8000/invite/${loggedInUserId}`} ref={inputRef} readOnly />
                    <button onClick={handleCopy} id='copy-btn'>Copy</button>
                </div>
            </div>
            <div className='members'>
                <h3>Make Conversations</h3>
                <div className='peoples'>
                    {members?.userData ? members?.userData.map((data) => {
                        return (
                            data.userid !== loggedInUserId && (<div className='user' key={data.userid} onClick={() => createNewConversation(loggedInUserId, data.userid)}>
                                <div className="user-profile">
                                    <span>{getIcon(data.fullname)}</span>
                                </div>
                                <div className="user-details">
                                    <div className="name-date">
                                        <h3 className='text-lg'>{data.fullname}</h3>
                                    </div>
                                    {(correctGifVisibility.id === data.userid) && correctGifVisibility.visiblity && <img src={correct} alt="loading" />}

                                </div>
                            </div>)
                        )
                    }) : 
                    (<div><img src={GIF} alt='loading...'/> <p>Something Went Wrong!</p></div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPeople