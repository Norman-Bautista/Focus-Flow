import Streak from '../../models/streaks.model.js';

export const update_Streak_Counter = async (req,res,next) => {

  try {
    const {cycle} = req.body; // we will need to get cycle data daily
    let user_Streak = await Streak.findOne({ user: req.user._id });
    // get the users current streak count, and put 0 if theres none
    if (!user_Streak) {
      user_Streak = await Streak.create({
        user: req.user._id,
        last_Active: today,
        streak: 0,
      });
    }

    // Only count streak if user did >= 1 cycle today
    if (cyclesToday > 0 && user_Streak.last_Active !== today) {
      user_Streak.streak += 1;
      user_Streak.last_Active = today;
      await user_Streak.save();
    }

    res.status(200).json({
      success: true,
      message: "Daily streak updated successfully",
      data: user_Streak,
    });

  } catch (error) {
    next(error);
  }
};


export const update_Cycle_Counter = async (req,res,next) => {
  try {

    const {status, timer_Type} = req.body;
    // It will extract attribute from Streak model
    // then this will fetch the current logged user to get its streak details
    // Fetch user's streak record (which stores cycle data too)
    let user_Streak = await Streak.findOne({user: req.user._id});
    if (!user_Streak) {
      user_Streak = await Streak.create({ user: req.user._id });
    }

    if (status === "done" && timer_Type === "focus") {
      user_Streak.cycles_Completed += 1;
      await user_Streak.save();
    }

    res.status(200).json({
      success: true,
      message: "Cycle count updated successfully",
      data: user_Streak,
    });

  } catch (error) {
    next(error);
  }
};