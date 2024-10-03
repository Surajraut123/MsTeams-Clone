import React, {useEffect, useState} from 'react'
import Avatar from '../../assets/user.svg'
import Phone from '../../assets/phone-outgoing.svg'
import Send from '../../assets/send-2.svg'
import Plus from '../../assets/plus.svg'
import Input from '../../components/Input/Input'
const Dashboard = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    console.log(user.id)
    useEffect(() =>{
        const loggedinUser = JSON.parse(localStorage.getItem('user:detail'))
        console.log(loggedinUser)
        const fetchConversations = async() =>{
            const res = await fetch(`http://localhost:8000/api/conversation/${loggedinUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resData = await res.json();
            console.log("Conersation : ", resData);
            setConversations(resData)
        }
        fetchConversations();
    }, [])

    const fetchMessage = async(conversationId) => {
        console.log(conversationId);
    }

    useEffect(() =>{
        const fetchUsers =async() =>{

            const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const resData = await res.json();
            setUsers(resData);
        } 
        fetchUsers();
    },[])

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

    const sendMessage = async(e) =>{
        // console.log("Sendmessage : ", message, messages?.conversationId, user?.id, messages?.receiver?.receiverId);
        const res = await fetch(`http://localhost:8000/api/message`,{
            method: 'POST',
            headers : {'Content-Type' :'application/json'},
            body: JSON.stringify({
                conversationId: messages?.conversationId,
                senderId: user?.id,
                message,
                receiverId: messages?.receiver?.receiverId
            })
        })
        setMessage('')
    }
  return (
    <div className='w-screen flex'>
        <div className='w-[25%] h-screen bg-secondary'>
            <div className='flex justify-center items-center my-8'>
                <div className='border border-primary p-2 rounded-full'>
                    <img src={Avatar} width={50} height={50}/>
                </div>    
                <div className='ml-8'>
                    <h3 className='text-2x'>{user.fullName}</h3>
                    <p className='text-lg font-light'>My Account</p>
                </div>
            </div>
            <hr />
            
            <div className='ml-12 mt-5'>
                <div className='text-primary text-lg'>Messages</div>
                <div>
                    {
                        conversations.length > 0 ?
                        conversations.map(({conversationId, user}) =>{
                            return(
                                <div className='flex items-center my-8'>
                                    <div className='cursor-pointer flex items-center' >
                                        <div>
                                            <img src={Avatar} width={50} height={50} onClick={fetchMessages(conversationId)} alt="loading..."/>
                                        </div>    
                                        <div className='ml-8'>
                                            <h3 className='text-lg'>{user?.fullName}</h3>
                                            <p className='text-sm font-light text-gray-600'>{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className="text-center text-lg font-semibold mt-24"> No Conversations</div>
                    }
                </div>
            </div>
        </div>
        <div className='w-[50%] h-screen bg-white flex flex-col items-center' >
            {
                messages?.receiver?.fullName &&
                <div className='w-[75%] bg-secondary my-14 h-[80px] mt-14 rounded-full flex items-center px-14'>
                    <div className='cursor-pointer'><img src={Avatar} width={50} height={50}/></div>
                    <div className='ml-6 mr-auto'>
                        <h3 className='text-lb'>{messages?.receiver?.fullName}</h3>
                        <p className='text-sm text-gray-600'>Online</p>
                    </div>
                    <div className='cursor-pointer'><img src={Phone} width={24} height={24} /></div>
                </div>

            }
            <div className='h-[75%] w-full overflow-scroll'>
                <div className='p-14'>
                    {
                        messages?.messages?.length > 0 ?
                        messages?.messages.map(({message, user : {id} = {}}) =>{
                            return (
                                <div className={` max-w-[40%]  rounded-b-xl p-4 mb-8 ${id === user.id ? "bg-primary rouned-tl-xl ml-auto text-white" : "bg-secondary rouned-tr-xl"} `}>
                                        {message}
                                    </div>
                            )
                        }) : <div className="text-center text-lg font-semibold mt-24"> No Message</div>
                    }
                </div>
            </div>
            {
                messages?.receiver?.fullName && 
                <div className='p-14 w-full flex items-center'>
                    <Input placeholder='type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputclassName='p-2 border-0 shadow-lg rounded-full bg-light focus: ring-0 focus:border-0 outline-none'/>
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full flex'>
                        <img src={Plus} width={30} height={30} />
                    </div>
                    <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full flex ${!message && 'pointer-events-none'}`} >
                        <img src={Send} width={30} height={30} />
                    </div>


                </div>
            }
        </div>
        <div className='w-[25%] h-screen bg-light px-8 py-16'>
            <div className='text-primary text-lg'>
                People
            </div>
            <div>
                {
                    users.length > 0 ?
                    users.map(({userId, user}) =>{
                        return(
                            <div className='flex items-center my-8'>
                                <div className='cursor-pointer flex items-center' onClick={() =>fetchMessages('new', user)}>
                                    <div>
                                        <img src={Avatar} width={50} height={50}/>
                                    </div>    
                                    <div className='ml-8'>
                                        <h3 className='text-lg'>{user.fullName}</h3>
                                        <p className='text-sm font-light text-gray-600'>{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div className="text-center text-lg font-semibold mt-24"> No Conversations</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Dashboard
