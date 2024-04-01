import React, {useState} from 'react'
import './messages.scss';
function Messages() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
    const [messages, setMessages] = useState({});

    const fetchMessages = async(conversationId, receiver) =>{
        const res = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
            method: 'GET',
            headers : {
                'Content-Type' : 'application/json' 
            },
        })
        const resData = await res.json();
        console.log(resData);
        setMessages({messages: resData, receiver, conversationId})
    }

    function getCurrentDateTime() {
        let now = new Date();
        
        let day = now.getDate();
        let month = now.getMonth() + 1; // JavaScript months are 0-based.
        let year = now.getFullYear().toString().substr(-2); // Get last 2 digits of year
        
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes; // Pad minutes to 2 digits
        
        let formatted = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
        
        return formatted;
    }
  return (
    <div className='messages'>
      <div className='p-14'>
        {/* {
            messages?.messages?.length > 0 ?
            messages?.messages.map(({message, user : {id} = {}}) =>{
                return (
                    <div className={` max-w-[40%]  rounded-b-xl p-4 mb-8 ${id === user.id ? "bg-primary rouned-tl-xl ml-auto text-white" : "bg-secondary rouned-tr-xl"} `}>
                            {message}
                        </div>
                )
            }) : <div className="text-center text-lg font-semibold mt-24"> No Message </div>
        } */}
        <div className="userMessage">
            <span>{getCurrentDateTime()}</span>
            <p>Hey Hi How are you?</p>
        </div>
    </div>
    </div>
  )
}

export default Messages
