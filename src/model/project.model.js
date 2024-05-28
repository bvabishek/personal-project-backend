const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectId:{
        type: String,
        required: [true,"Project Id is required"]
    },
    projectName: {
        type: String,
        required: [true,"Project Name is required"]
    },
    startDate: {
        type: Date,
        required: [true,"start date is required"]
    },
    endDate: {
        type: Date,
        required: [true,"end date is required"]
    }
  },
  {
    timestamps: true,
  }
);

const ProjectInfo = mongoose.model("Projectinfo",projectSchema)

module.exports = ProjectInfo;

