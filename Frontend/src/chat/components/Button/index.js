import React from 'react'

const index = ({
    label = 'Button',
    type = 'Button',
    className = '',
    disabled = false
}) => {
  return (
    <button type={type} className={`text-white bg-primary font-medium text-sm rounded-lg text-center px-5 focus:outline-none ${className}`} disabled={disabled}>{label}</button>
  )
}

export default index
