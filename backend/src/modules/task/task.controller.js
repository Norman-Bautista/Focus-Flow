import Task from '../../models/tasks.model';

export const get_All_Tasks = async (req,res,next) => {
  
  try {
    
    const task_List = await Task.find({user: req.user._id}).select('title  description created_At');

    if (!task_List || task_List.length === 0) {
      res.status(404).json({success: false, message: 'Tasks not found for this user'});
    };

    res.status(200).json({success: true, message: 'Tasks retrieved successfully', date: task_List});
    
  } catch (error) {
    next(error);
  }
};

export const get_Specific_Task = async (req,res,next) => {

  try {

    const task = await Task.findOne({user: req.user._id}).select('title  description created_At');
    
    if (!task) {
      res.status(404).json({success: false, message: 'Task not found'});
    } 

    res.status(200).json({success: true, message: 'Task found for this user', data: task });

  } catch (error) {
    next(error);
  }

};

export const create_Task = async (req,res,next) => {

  try {
    
    const {title, description, priority} = req.body;

    // Validation 
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const new_Task = await Task.create({...req.body, user: req.user._id,});
    
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: new_Task,
    });

  } catch (error) {
    next(error);
  }
};

// updates title, description, and priority
export const update_Task = async (req,res,next) => {
  
  try {
    
    const {id} = req.params; // task id
    const {type, value} = req.body;

    const fieldMap = {
      title: 'title',
      description: 'description',
      priority: 'priority',
    };

    if (!fieldMap[type]) {
      res.status(400).json({success : true, message: 'Invalid Field Type'});
    }

    const update = { [fieldMap[type]]: value}
    const task_Updated = await Task.findByIdAndUpdate(
      {_id: id, user: req.user._id}, // task id and user id need to be found
      update,
      {new: true, runValidators: true},
    )
    
    if (!task_Updated) {
      res.status(404).json({success: false, message: 'Task not found'})
    }
    res.status(201).json({
      success:true,
      message: `${type} updated successfully`,
      data: task_Updated,
    });
  } catch (error) {
    next(error);
  }
};

export const complete_Task = async (req,res,next) => {

};

export const delete_Task = async (req,res,next) => {
  
}