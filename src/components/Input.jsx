import React from 'react'

const Input = ({ label, id, name, value, onChange, error }) => {
  return (
    <div className='input-container'>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          // ref={titleRef}
        />
        <span className='error'>{error}</span>
      </div>
  )
}

export default Input
