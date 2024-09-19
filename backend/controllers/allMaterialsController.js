const mongoose = require("mongoose");
const Week = require("../modules/weeksModel"); // Week model

// Controller function to get a week, its lessons, and the practices
const getWeekWithLessonsAndPractices = async (req, res) => {
  const { weekId } = req.params;
  try {
    const result = await Week.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(weekId) } }, // Use "new" here
      {
        $lookup: {
          from: "lessons", // Join with lessons collection
          localField: "lessons", // Field in Week document
          foreignField: "_id", // Field in Lesson document
          as: "lessonData",
        },
      },
      { $unwind: "$lessonData" },
      {
        $lookup: {
          from: "practices", // Join with practices collection
          localField: "lessonData.practices",
          foreignField: "_id",
          as: "lessonData.practicesData",
        },
      },
      {
        $group: {
          _id: "$_id",
          number: { $first: "$number" },
          lessons: {
            $push: {
              Title: "$lessonData.Title",
              Img: "$lessonData.Img",
              file: "$lessonData.file",
              practices: "$lessonData.practicesData",
            },
          },
        },
      },
    ]);

    res.status(200).json(result[0]); // Send the result as a JSON response
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "Failed to fetch week data" });
  }
};

module.exports = { getWeekWithLessonsAndPractices };
