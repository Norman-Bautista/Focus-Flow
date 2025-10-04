import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  period: { type: String, enum: ["daily", "weekly", "monthly"], default: "weekly" },
  startDate: Date,
  endDate: Date,

  metrics: {
    streakCount: Number,
    cyclesCompleted: Number,
    consistencyRate: Number,
    currentStreak: Number,
    mostEffectiveTimer: {
      focusDuration: Number,
      breakDuration: Number,
    },

    mostProductiveDays: {
      breakdown: [
        {
          day: { type: String },
          timeSpent: { type: Number, default: 0 }, // minutes
        }
      ],
      topDay: { type: String }, // name of day with highest timeSpent
    }
  },

  aiSummary: { type: String },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Insights = mongoose.model("Insights", insightSchema)

export default Insights;
