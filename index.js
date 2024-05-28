const express = require("express");
const app = express();
const mongoose = require("mongoose");
//controller imports
const employeeController = require("./src/controller/employeeController");
const departmentController = require("./src/controller/departmentController");
const mailerController = require("./src/controller/mailerController");
const userController = require("./src/controller/userconfigController");
const vendorController = require("./src/controller/vendorController");
const projectController = require("./src/controller/projectController");
const taskController = require("./src/controller/taskController");

const cors = require('cors')
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization'
}));


mongoose
  .connect("mongodb+srv://bvabishek:LT9Ko5NIiG18gssa@cluster0.cfnialp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// Handle preflight requests
app.options("/api/employeeinfo", cors());

// Routes
app.get("/api/employeeinfo", employeeController.getAllEmployees);
app.post("/api/employeeinfo", employeeController.createEmployee);
app.get("/api/employeeinfo/:employeeId",employeeController.getEmployeebyId);
app.put("/api/employeeinfo/:employeeId",employeeController.updateEmployee);
app.delete("/api/employeeinfo/:uid", employeeController.deleteEmployee);
app.get("/api/employeeinfo/email/:email",employeeController.getEmployeebyemail);
app.get("/api/employee/department/:department",employeeController.getEmployeebyDepartment)

app.get("/api/departmentinfo",departmentController.getAllDepartment);
app.post("/api/departmentinfo",departmentController.createDepartment);
app.get("/api/departmentinfo/:deptId",departmentController.getDepartmentbyId);
app.put("/api/departmentinfo/:deptId",departmentController.updateDepartment);
app.delete("/api/departmentinfo/:deptId",departmentController.deleteDepartment);

app.post("/api/users",userController.createUsers);
app.get("/api/users",userController.getAllUsers);
app.post("/api/users/disable/:uid",userController.disableUser);
app.post("/api/users/enable/:uid",userController.enableUser);
app.delete("/api/users/:uid",userController.deleteUser);

app.post("/api/vendor",vendorController.createVendor);
app.get("/api/vendor",vendorController.getAllVendors);
app.get("/api/vendor/:vendorMasterId",vendorController.getVendorbyId);
app.put("/api/vendor/vendorupdate/:vendorMasterId",vendorController.updateVendor);
app.delete("/api/vendor/vendordelete/:vendorMasterId", vendorController.deleteVendor);

app.post("/api/project",projectController.createProject);
app.get("/api/project",projectController.getAllProject);
app.get("/api/project/:projectId",projectController.getProjectbyId);
app.put("/api/project/projectupdate/:projectId",projectController.updateProject);
app.delete("/api/project/projectdelete/:projectId", projectController.deleteProject);

app.post("/api/tasks",taskController.createTask);
app.get("/api/tasks",taskController.getAllTasks);
app.get("/api/tasks/:projectId",taskController.getTaskbyId);
app.put("/api/tasks/taskupdate/:taskId",taskController.updateTask);
app.delete("/api/tasks/taskdelete/:taskId", taskController.deleteTask);
app.patch("/api/tasks/statusupdate/:taskId", taskController.updateTaskStatus);
app.patch("/api/tasks/hoursupdate/:taskId", taskController.updateTaskHours);

app.post("/api/sendmail",mailerController.postmailer);

module.exports = app;
