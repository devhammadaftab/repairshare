import './style.css';
import React from 'react'

function Task ({ task, index, disabled, handleChange }) {
  return (
    <div className='task'>
      <input
        disabled={disabled}
        type='checkbox'
        id={`${task.title}${task.id}`}
        checked={task.isChecked}
        onChange={(event) => handleChange(event.target.checked, index)}
      />
      <label htmlFor={`${task.title}${task.id}`}>{task.title}</label>
    </div>
  )
}

export default Task;
