const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    vendorMasterId: {
        type: String,
        required: [true, "Vendor Master number is required"],
        unique: true,
      },  
    vendorNo: {
      type: String,
      required: [true, "Vendor Number is required"],
    },
    vendorName: {
      type: String,
      required: [true, "Vendor Name is required"],
    },
    vendorPhoneNo: {
        type: String,
        required: [true,"Vendor mobile number is required"]
    },
    address: {
      type: String,
    },
    contactPersonName: {
        type: String,
        required: [true, "Vendor Name is required"],
    },
    contactEmail: {
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
    contactMobno: {
      type: String,
      required: [true,"Vendor mobile number is required"]
    }
  },
  {
    timestamps: true,
  }
);

const VendorInfo = mongoose.model("Vendorinfoschema",vendorSchema)

module.exports = VendorInfo;
