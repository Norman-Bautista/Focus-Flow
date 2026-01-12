import React, { useState } from 'react'
import { create_Task, update_Task, delete_Task } from '../../api/task.api'



const TodoModal = ({onClose,disptach}) => {
  
  const [timer, setTimer] = useState({
      
    });


  return (
    <div className="container fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className='bg-secondary rounded-2xl shadow-lg p-8 w-full max-w-md'>
        <h2 className='text-md font-bold text-primary '>
          Add a Task 
        </h2>
        <div className='space-y-4'>
          <div className="container">
            <form action="">
              <label>
              Title:
            </label>
            <input
              type="text"
              name="Task Title"
              className='w-full border rounded px-3 py-2'
            />
            <label>
              Description:
            </label>
            <input
              type="text"
              name="Task Title"
              className='w-full border rounded px-3 py-2'
            />
            <label>
              Priority:
            </label>
            <select name="status" id="">
              <option value="High">High Priority/Urgent</option>
              <option value="Moderate">Medium Prioriry/Moderate</option>
              <option value="Low">Low Priority/Minor</option>
            </select>
            
            </form>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoModal