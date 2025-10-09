import Streak from '../../models/streaks.model.js';

export const streak_Counter = async (req,res,next) => {
  
  try {
    
    // I used this cycle as request body to req cycle count
    // then first is I need to check the user's current streak count
    const {cycle} = req.body;
    const streak = await Streak.findOne({user: req.user._id});

    if (!user_Streak) {
      return res.status(404).json({ success: false, message: "Streak not found" });
    };

    // I used arithmetic condition here to be strict in streak
    // It will depend to cycle count of user in a day
    if (cycle === 2) {
      streak.streak += 1;
    }
    
    await streak.save();

    res.status(200).json({
      success: true,
      message: "Streak updated successfully",
      data: user_Streak,
    });

    
  } catch (error) {
    next(error);
  }
};

export const cycle_Counter = async(req,res,next) => {

  try {

  } catch (error) {
    next(error);
  }
};