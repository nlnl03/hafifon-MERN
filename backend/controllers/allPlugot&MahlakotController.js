const mongoose = require("mongoose");
const Pluga = require("../models/plugotModel"); // Week model

// Controller function to get a pluga, and its mahlakot
const getPlugotWithMahlakot = async (req, res) => {
  try {
    const result = await Pluga.aggregate([
      {
        // Lookup mahlakot associated with each pluga
        $lookup: {
          from: "mahlakas",
          localField: "_id",
          foreignField: "pluga", // the field in "mahlakas" that links to the week
          as: "mahlakot",
        },
      },

      {
        $unwind: {
          path: "$mahlakot",
        },
      },

      {
        $group: {
          _id: "$_id",
          Title: { $first: "$Title" },
          color: { $first: "$color" },
          createdAt: { $first: "$createdAt" }, // Add createdAt to retain it after grouping
          mahlakot: {
            $push: "$mahlakot",
          },
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(result); // Send the result as a JSON response
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "Failed to fetch plugot and mahlakot data" });
  }
};

module.exports = { getPlugotWithMahlakot };
