import React from 'react'

const Input = ({
    label = '',
    name = '',
    type = 'text',
    className = '',
    inputclassName = '',
    isRequired = true,
    placeholder = '',
    value = '',
    onChange = () =>{}  
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={name} className='block mb-2 text-sm font-medium'> {label}</label>

      <input type={type} id={name} className={`${inputclassName}` } placeholder={placeholder} required={isRequired} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input
