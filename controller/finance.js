const express = require("express");
const router = express.Router();

const {createAbl} = require("../abl/finance/createAbl");
const deleteAbl = require("../abl/finance/deleteAbl");
const getAbl = require("../abl/finance/getAbl");
const updateAbl = require("../abl/finance/updateAbl");


router.post("/create",(req,res)=>{
    createAbl(req,res)
});

router.delete("/delete",(req,res)=>{
    deleteAbl(req,res)
});

router.get("/get",(req,res)=>{
    getAbl(req,res)
});

router.put("/update",(req,res)=>{
    updateAbl(req,res)
});


module.exports = router;