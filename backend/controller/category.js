const express = require("express");
const router = express.Router();

const {createAbl} = require("../abl/category/createAbl");
const deleteAbl = require("../abl/category/deleteAbl");
const getAbl = require("../abl/category/getAbl");
const updateAbl = require("../abl/category/updateAbl");
const listAbl = require("../abl/category/listAbl");

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