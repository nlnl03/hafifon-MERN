const mongoose = require("mongoose");
const Week = require("../models/weeksModel"); // Week model

// Controller function to get a week, its lessons, and the practices
const getWeekWithLessonsAndPractices = async (req, res) => {
  // const { weekId } = req.params;
  try {
    const result = await Week.aggregate([
      // { $match: { _id: new mongoose.Types.ObjectId(weekId) } }, // Use "new" here

      {
        // Lookup lessons associated with each week
        $lookup: {
          from: "lessons",
          localField: "_id",
          foreignField: "week", // the field in "lessons" that links to the week
          as: "lessons",
        },
      },

      {
        $unwind: {
          path: "$lessons",
          preserveNullAndEmptyArrays: true, // To still show weeks with no lessons
        },
      },
      {
        $lookup: {
          from: "practices", // Join with practices collection
          localField: "lessons._id",
          foreignField: "lesson",
          as: "lessons.practices",
        },
      },
      {
        $group: {
          _id: "$_id",
          number: { $first: "$number" },
          lessons: {
            $push: "$lessons",
          },
        },
      },
      {
        // Sort weeks by the 'number' field to ensure correct order
        $sort: { number: 1 }, // Sort in ascending order by number
      },
    ]);

    res.status(200).json(result); // Send the result as a JSON response
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "Failed to fetch week data" });
  }
};

module.exports = { getWeekWithLessonsAndPractices };
