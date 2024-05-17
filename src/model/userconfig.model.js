const mongoose = require("mongoose");

const userConfigSchema = mongoose.Schema(
  {
    uid: {
        type: String,
        required: [true, "User ID is required"],
        unique: true,
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
    name: {
      type: String,
      required: [true, "Name is required"]
    }
  },
  {
    timestamps: true,
  }
);

const userConfigInfo = mongoose.model("UserConfig",userConfigSchema)

module.exports = userConfigInfo;
