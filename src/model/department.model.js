const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    deptId: {
        type: String,
        required: [true, "Department ID is required"],
        unique: true,
        default: function() {
          return 'DEP' + (Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0');
        }
      },  
    departmentName: {
      type: String,
      required: [true, "Department is required"],
    },
    labType: {
      type: String,
      required: [true, "Lab type is required"],
    },
    labintercomNo: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function(v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    hodName: {
      type: String,
      required: [true, "HOD Name is required"]
    },
    hodMobno: {
      type: String,
      required: [true,"HOD mobile number is required"]
    }
  },
  {
    timestamps: true,
  }
);

const DepartmentInfo = mongoose.model("Departmentinfo",departmentSchema)

module.exports = DepartmentInfo;
