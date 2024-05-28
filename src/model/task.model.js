const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    projectId:{
        type: String,
        required: [true,"Project Id is required"]
    },
    taskId:{
        type: String,
        required: [true,"Task Id is required"]
    },
    taskName: {
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
    },
    totalHours: {   
        type: String
    },
    department: {
        type: String
    },
    assignTo: {
        type: String
    },
    status:{
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const TaskInfo = mongoose.model("Taskinfo",taskSchema)

module.exports = TaskInfo;

