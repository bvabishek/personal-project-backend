const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employeeController = require("./src/controller/employeeController");
const cors = require('cors')

app.use(express.json());
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
mongoose
  .connect("mongodb+srv://bvabishek:S32Sc2csjaJpcRcU@cluster0.cfnialp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed");
  });


app.get("/api/employeeinfo", employeeController.getAllEmployees);
app.post("/api/employeeinfo", employeeController.createEmployee);
app.get("/api/employeeinfo/:employeeId",employeeController.getEmployeebyId);
app.put("/api/employeeinfo/:employeeId",employeeController.updateEmployee);
app.delete("/api/employeeinfo/:employeeId", employeeController.deleteEmployee);
