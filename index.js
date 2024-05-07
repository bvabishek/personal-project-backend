const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employeeController = require("./src/controller/employeeController");
const cors = require("cors")

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
mongoose
  .connect("mongodb+srv://bvabishek:S32Sc2csjaJpcRcU@cluster0.cfnialp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/api/employeeinfo", employeeController.getAllEmployees);
app.post("/api/employeeinfo", employeeController.createEmployee);
app.get("/api/employeeinfo/:employeeId",employeeController.getEmployeebyId);
app.put("/api/employeeinfo/:employeeId",employeeController.updateEmployee);
app.delete("/api/employeeinfo/:employeeId", employeeController.deleteEmployee);
