import Streak from '../../models/streaks.model.js';

export const update_Streak_Counter = async (req,res,next) => {

  const {status, timer_Type} = req.body;
  // It will extract attribute from Streak model
  // then this will fetch the current logged user to get its streak details
  const user_Streak = await Streak.findOne({user: req.user._id}); 


};


export const update_Cycle_Counter = async (req,res,next) => {

};