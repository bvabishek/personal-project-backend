const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employeeController = require("./src/controller/employeeController");
const departmentController = require("./src/controller/departmentController");
const mailerController = require("./src/controller/mailerController");
const cors = require('cors')
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
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
app.delete("/api/employeeinfo/:employeeId", employeeController.deleteEmployee);
app.get("/api/employeeinfo/email/:email",employeeController.getEmployeebyemail);

app.get("/api/departmentinfo",departmentController.getAllDepartment);
app.post("/api/departmentinfo",departmentController.createDepartment);
app.get("/api/departmentinfo/:deptId",departmentController.getDepartmentbyId);
app.put("/api/departmentinfo/:deptId",departmentController.updateDepartment);
app.delete("/api/departmentinfo/:deptId",departmentController.deleteDepartment);

app.post("/api/sendmail",mailerController.postmailer);

module.exports = app;
