import Pomodoro from '../../models/pomodoro.model.js';

// Fetches All Timers
export const get_All_Timers = async (req, res, next) => {
  try {
    // find the current user's timer settings
    const timers = await Pomodoro.findOne({ user: req.user._id }).select(
      "focus_Duration rest_Duration longBreak_Duration setCycle_Before_Longbreak"
    );

    // if user has no record yet
    if (!timers) {
      return res.status(404).json({
        success: false,
        message: "No Pomodoro settings found for this user",
      });
    }

    // success response
    return res.status(200).json({
      success: true,
      message: "Pomodoro timers fetched successfully",
      data: {
        focus: timers.focus_Duration,
        rest: timers.rest_Duration,
        longbreak: timers.longBreak_Duration,
        cycleBeforeLongbreak: timers.setCycle_Before_Longbreak,
      },
    });
  } catch (error) {
    next(error); // pass to global error middleware
  }
};

// fetches  Focus, Rest, Longbreak values specifically
export const get_Timer_Value = async (req, res, next) => {
  try {
    const { type } = req.params; // focus | rest | longbreak 
    const fieldMap = {
      focus: "focus_Duration",
      rest: "rest_Duration",
      longbreak: "longBreak_Duration"
    };

    // Input Validation
    if (!fieldMap[type]) {
      return res.status(400).json({ success: false, message: "Invalid timer type" });
    }

    // Missing resource handling
    const timeValue = await Pomodoro.findOne({user: req.user._id}).select(fieldMap[type]);
    if (!timeValue) {
      return res.status(404).json({ success: false, message: "No Pomodoro data found" });
    }

    res.status(200).json({ success: true, data: timeValue });
  } catch (error) {
    next(error);
  }
};


// update requests for timer customizations
export const update_Timer_Values = async (req,res,next) => {
  try {
    const { type } = req.params; // focus | rest | longbreak 
    const { value }= req.body; // req body to display new update value
    const fieldMap = {
      focus: "focus_Duration",
      rest: "rest_Duration",
      longbreak: "longBreak_Duration"
    };

    // Input Validation
    if (!fieldMap[type]) {
      return res.status(400).json({ success: false, message: "Invalid timer type" });
    };

    // use fineOneAndUpdate for updating specific attributes 
    const updated_Timer = await Pomodoro.findOneAndUpdate(
      {user: req.user._id}, // find condition , user id
      {[fieldMap[type]]: value, updated_At: Date.now()}, // points out to the dynamic field type
      {new: true, runValidators: true} // stores the new updated value
    )

    res.status(200).json({ 
      success: true, 
      data: updated_Timer,
      message: `${type} duration updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// clears the focus, rest, longbreak values to default
export const clear_Timer = async (req,res,next) => {
  try { 
    // declare the default values
    const default_Values = {
      focus_Duration : 25,
      rest_Duration: 5,
      longBreak_Duration: 15,
      setCycle_Before_Longbreak: 4,
      updated_At: Date.now(),
    }

    // use findOneAndUpdate, with condition of check user id first 
    // then find those attributes and replace with default Values
    const reset_Values = await Pomodoro.findOneAndUpdate(
      {user: req.user._id},
      default_Values,
      {new: true, runValidators: true},
    )

    res.status(200).json({
      success: true, 
      data: reset_Values,
      message: `${type} Pomodoro value reset to default.`
    })

  } catch (error) {
    next(error);
  }
};

// sets required cycle for automatic longbreak/ or user will get notified with an AI pop up message
export const update_Cycle_Longbreak = async (req,res,next) => {
  try {

    const {value} = req.body;

    if (!value || typeof value === Number || value <= 0) {
      res.status(400).json({success: false, message: "Invalid Cycle Input"})
    }

    const updated_Cycle = await Pomodoro.findOneAndUpdate(
      {user: req.user._id},
      {setCycle_Before_Longbreak: value},
      {new: true, runValidators: true},
    )

    res.status(200).json({success: true, message:'Cycle before long break updated successfully' , data: updated_Cycle})

  } catch (error) {
    next(error);
  }
};