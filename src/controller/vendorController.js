const Vendor = require("../model/vendor.model");

exports.getAllVendors = async (req, res) => {
  try {
    const vendorinfo = await Vendor.find({});
    res.status(200).json(vendorinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendorbyId = async (req, res) => {
  try {
    const { vendorMasterId } = req.params;
    const vendorinfo = await Vendor.findOne({ vendorMasterId: vendorMasterId });

    if (!vendorinfo) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendorinfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const vendorinfo = await Vendor.create(req.body);
    res.status(200).json({vendor: vendorinfo,message:"vendor created successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const { vendorMasterId } = req.params;
    const vendorinfo = await Vendor.findOneAndUpdate(
      { vendorMasterId: vendorMasterId },
      req.body,
      { new: true }
    );

    if (!vendorinfo) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({vendor: vendorinfo,message: "vendor updated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
    try {
      const { vendorMasterId } = req.params;
      const vendorinfo = await Vendor.findOneAndDelete({ vendorMasterId: vendorMasterId });
  
      if (!vendorinfo) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  