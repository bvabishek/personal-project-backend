const mongoose = require("mongoose");


const employeeInfoSchema = mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      required: [true, "Employee ID is required"],
      default: function() {
        return 'GAR' + (Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0');
      }
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      // validate: {
      //   validator: function(v) {
      //     return /\d{3}-\d{3}-\d{4}/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid phone number! Please enter phone number in the format xxx-xxx-xxxx.`
      // }
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
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
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    skillType: {
      type: String,
      required: [true, "Skill type is required"],
    },
    employmentStatus: {
      type: String,
      required: [true, "Employment status is required"],
    },
    hiringSourceType: {
      type: String,
      required: [true, "Hiring source type is required"],
    },
    hiringSourceName: {
      type: String,
      required: [true, "Hiring source name is required"],
    },
    contractStatus: {
      type: String,
      required: [true, "Contract status is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    officialMail: {
      type: String,
      required: [true, "Official mail is required"],
    }
  },
  {
    timestamps: true,
  }
);


const EmployeeInfo = mongoose.model("EmployeeInfo", employeeInfoSchema);

module.exports = EmployeeInfo;
