import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/index'
import { Navigate, useNavigate } from 'react-router-dom'

const Form = ({ isSigninPage = true }) => {

  // ... -> it is an spread syntax use to iterate through an array and object to expand the array or string when have 0 or more argumentsor elements.

  //Same thing i achieve like 
  /*
  const initialObject = {
    email: '',
    pasword: ''
  }
  if(!isSigninPage) initialObject.fullname = '';
  const[data, setData] = useState(initialObject);
   */
  const[data, setData] = useState({
    ...(!isSigninPage && {
      fullName: ''
    }),
    email: '',
    password: ''
  })

  const handleSubmit = async (e) =>{
    console.log(data);
    e.preventDefault();
    const res  = await fetch(`http://localhost:8000/api/${isSigninPage ? 'login' : 'register'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(res.status === 400) {
      alert('Invalid Credentials')
    } else{

      const resData = await res.json();
      console.log(resData);
  
      if (resData.token && resData.user) {
        localStorage.setItem('user:token', resData.token);
        // Local storage in web browsers can only store strings. So, if you want to store a JavaScript object in local storage, you need to convert it to a string first.
        localStorage.setItem('user:detail', JSON.stringify(resData.user));
        console.log(resData.user)
        navigate("/");
      }
      
    }


  }

  const navigate = useNavigate();
  return (
    <div className='bg-light h-screen flex items-center justify-center'>
      <div className='bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
        <div className='text-4xl font-extrabold'>Welcome {isSigninPage && 'Back'} </div>
        <div className='text-xl font-light mb-10'>{isSigninPage ? 'Sign in to explore' : 'Sign Up now to get started'}</div>

        <form className='flex flex-col items-center w-full' onSubmit={(e) => handleSubmit(e)}>

          {!isSigninPage && <Input label='Full Name' name='name' placeholder='Enter your full name' className='mb-6 w-[50%]' value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value})}/>}

          <Input label='Email' name='email' type="email" placeholder='Enter your email' className='mb-6 w-[50%]' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

          <Input label='Password' name='password' placeholder='Enter your password' className='mb-6 w-[50%]' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>

          <Button label={isSigninPage ? 'Sign in' : 'Sign up'} className='w-1/2 mb-2' type='submit'/>
        </form>
        <div>{isSigninPage ? 'Do not have an account?' : 'Already have an account?' }<span className='text-primary cursor-pointer underline' onClick={() =>navigate(`/users/${isSigninPage ? 'signup' : 'signin'}`)}>{isSigninPage ? 'Sign in' : 'Sign up'    }</span></div>
      </div>
    </div>
  )
}

export default Form
