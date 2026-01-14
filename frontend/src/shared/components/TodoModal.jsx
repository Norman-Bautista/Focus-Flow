import React, { useState } from 'react'
import { create_Task, update_Task, delete_Task } from '../../api/task.api'
import Button from './Button';



const TodoModal = ({onClose,disptach}) => {
  
  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>
        <h2 className='text-lg font-bold '>
          Add a Task 
        </h2>
        <div className='space-y-4'>
          <div className="container">
            <form action="" className='flex flex-col gap-2'>
              <label>
              Title:
            </label>
            <input
              type="text"
              name="Task Title"
              className='w-full border rounded px-3 py-2 focus:outline-none'
            />
            <label>
              Description:
            </label>
            <input
              type="text"
              name="Task Title"
              className='w-full border rounded px-3 py-2 focus:outline-none'
            />
            <label>
              Priority:
            </label>
            <select name="status" id="" className='bg-white p-2 rounded outline outline-1'>
              <option value="High">High: Priority/Urgent</option>
              <option value="Moderate">Medium: Priority/Moderate</option>
              <option value="Low">Low: Priority/Minor</option>
            </select>
            <div className='flex justify-evenly'>
              <Button className="mt-4 bg-secondary outline-primary outline-1 text-primary px-4 py-2 rounded cursor-pointer" onClick={onClose}>
              Cancel
              </Button>
              <Button className="mt-4 bg-primary text-white px-4 py-2 rounded cursor-pointer" onClick={create_Task}>
                Add Task
              </Button>
            </div>
            
            </form>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoModal