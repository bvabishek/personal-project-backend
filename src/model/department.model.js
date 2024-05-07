const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    deptId: {
        type: String,
        required: [true, "Department ID is required"],
      },
    departmentName: {
      type: String,
      required: [true, "Department is required"],
    },
  },
  {
    timestamps: true,
  }
);

const DepartmentInfo = mongoose.model("Departmentinfo",departmentSchema)

module.exports = DepartmentInfo;
