const express = require("express");
const app = express();
const port = 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  next();
});


const userController = require("./controller/user")
const financeController = require("./controller/finance")
const categoryController = require("./controller/category")
const savingPlanController = require("./controller/savingPlan")

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.send("Welcome");
  });

app.use("/user", userController)
app.use("/finance", financeController)
app.use("/category", categoryController)
app.use("/savingPlan", savingPlanController)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }); 