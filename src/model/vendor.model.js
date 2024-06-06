const mongoose = require("mongoose");
const Counter = require("./counter.model");

const vendorSchema = mongoose.Schema(
  {
    vendorMasterId:  {
      type: String,
      unique: true,
      required: [true, "Vendor ID is required"],
      default: function() {
        return 'V' + (Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0');
      }
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
        required: [true, "Contact person Name is required"],
    },
    contactEmail: {
      type: String,
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
    }
  },
  {
    timestamps: true,
  }
);

vendorSchema.pre('save', async function(next) {
  let doc = this;
  if (doc.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'vendorMasterId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.vendorMasterId = 'V' + counter.seq.toString().padStart(3, '0');
  }
  next();
});

const VendorInfo = mongoose.model("Vendorinfoschema",vendorSchema)

module.exports = VendorInfo;
