import Insight from "../../models/insights.model.js";


export const get_All_Data = async (req,res,next) => {

  try { 
    const insights = await Insight.find({user: req.user._id});

    // validators if insights doesnt exist yet for user
    // Auto Creates data for new user
    if (!insights.length) {
      const newInsight = await Insight.create({
        user: req.user._id,
        period: "weekly",
        metrics: {
          streakCount: 0,
          cyclesCompleted: 0,
          consistencyRate: 0,
          currentStreak: 0,
          mostEffectiveTimer: { focusDuration: 25, breakDuration: 5 },
          mostProductiveDays: { breakdown: [], topDay: "" },
        },
        aiSummary:
          "No summary yet — complete a few sessions to generate insights!",
      });

      insights = [newInsight];
    }

    res.status(200).json({
      success: true,
      message: "User Performance Insights Fetched",
      data: insights,
    });

  } catch (error) {
    next(error);
  }
};

export const get_Data = async (req,res,next) => {

  try {
    // need to use id as parameter to get specific user
    // the metrics will use as param as what metrics is being fetched
    const {id, metrics} = req.params;
    const insights = await Insight.findOne({_id: id, user: req.user._id});
    if (!insights) {
      return res.status(404).json({ success: false, message: "No insights found" });
    };

    // If the user wants only a specific metric, extract it
    if (metrics) {
      const metricValue = insights.metrics?.[metrics];

      if (metricValue === undefined) {
        return res.status(400).json({
          success: false,
          message: `Metric "${metrics}" not found in this insight.`,
        });
      }

      return res.status(200).json({
        success: true,
        metrics,
        value: metricValue,
      });
    }
    // Otherwise, return the whole insight document
    res.status(200).json({success: true, data: insights})

  } catch (error) {
    next(error);
  }
};

export const create_Data = async (req,res,next) => {
  try {
    const { period } = req.body; // daily | weekly | monthly

    // gets the attributes in Insights model to know where to store these new insights
    const newInsight = new Insight({
      user: req.user._id,
      period,
      metrics: {
        streakCount: 0,
        cyclesCompleted: 0,
        consistencyRate: 0,
        currentStreak: 0,
        mostEffectiveTimer: { focusDuration: 25, breakDuration: 5 },
        mostProductiveDays: { breakdown: [], topDay: "" },
      },
      aiSummary: "No summary yet — complete a few sessions to generate insights!",
    });

    await newInsight.save();

    res.status(201).json({
      success: true,
      message: "New insight record created successfully",
      data: newInsight,
    });
  } catch (error) {
    next(error);
  }
};

export const update_Data = async (req,res,next) => {

  try {
    const { metrics, aiSummary } = req.body;
    const updated_Data = await Insight.findOneAndUpdate(
      {user: req.user._id, period: "daily"},
      {
        $set: {
          ...metrics,
          aiSummary,
          generatedAt: Date.now(),
        }
      },
      {new: true, runValidators: true}
    );

    if (!updated_Data) {
      return res.status(404).json({ success: false, message: "Insight not found" });
    }

    res.status(200).json({
      success: true,
      message: "Insight updated successfully",
      data: updated_Data,
    });

  } catch (error) {
    next(error);
  }
};


