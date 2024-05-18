const Employee = require("../model/employee.model");
const admin = require('../firebase/firebaseadmin');


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeebyId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ employeeId: employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeebyemail = async (req, res) => {
  try {
    const { email } = req.params;
    const employee = await Employee.findOne({ email: email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOneAndUpdate(
      { employeeId: employeeId },
      req.body,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { uid } = req.params;
    
    const employee = await Employee.findOneAndDelete({ uid: uid });

    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

  // exports.updatePassword = async (req, res) => {
  //   try {
  //     const { email } = req.params;
  //     const { newPassword } = req.body;
  //     console.log(req.body);
  //     const employee = await Employee.findOneAndUpdate(
  //       { email: email },
  //       { password: newPassword },
  //       { new: true }
  //     );

  //     console.log("Updated Employee:", employee);
  
  //     if (!employee) {
  //       return res.status(404).json({ message: "Employee not found" });
  //     }
  
  //     res.status(200).json(employee);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  
  