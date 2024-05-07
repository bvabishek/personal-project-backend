const Department = require("../model/department.model");

exports.getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find({});
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartmentbyId = async (req, res) => {
  try {
    const { deptId } = req.params;
    const department = await Department.findOne({ deptId: deptId });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { deptId } = req.params;
    const department = await Department.findOneAndUpdate(
      { deptId: deptId },
      req.body,
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
    try {
      const { deptId } = req.params;
      const department = await Department.findOneAndDelete({ deptId: deptId });
  
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  