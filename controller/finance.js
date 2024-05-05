const express = require("express");
const router = express.Router();

const {createAbl} = require("../abl/finance/createAbl");
const deleteAbl = require("../abl/finance/deleteAbl");
const getAbl = require("../abl/finance/getAbl");
const updateAbl = require("../abl/finance/updateAbl");
const listAbl = require("../abl/finance/listAbl");

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

router.get("/list",(req,res)=>{
    listAbl(req,res);
});

module.exports = router;