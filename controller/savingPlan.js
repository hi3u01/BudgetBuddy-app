const express = require("express");
const router = express.Router();

const {createAbl} = require("../abl/savingPlan/createAbl");
const getAbl = require("../abl/savingPlan/getAbl");
const updateAbl = require("../abl/savingPlan/updateAbl");
const deleteAbl = require("../abl/savingPlan/deleteAbl");


router.post("/create",(req,res)=>{
    createAbl(req,res);
});

router.get("/get",(req,res)=>{
    getAbl(req,res);
});

router.put("/update",(req,res)=>{
    updateAbl(req,res);
});

router.delete("/delete",(req,res)=>{
    deleteAbl(req,res);
});

module.exports = router;