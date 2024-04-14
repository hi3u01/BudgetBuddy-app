const Ajv = require("ajv").default;
const ajv = new Ajv();
const categoryDao = require("../../dao/category-dao.js");
const userDao = require("../../dao/user-dao.js");

const schema ={
    type: "object",
    properties: {
        Name:{type: "string"},
        Color: {type: "string"},
        limit : {type: "number"},
        userId: {type: "string"},
    },
    required: ["Name", "Color", "userId"],
    additionalProperties: false,
};

async function createAbl(req, res) {
    try {
      let category = req.body;
      const valid = ajv.validate(schema, category);
      
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
      // existence category
      const categoryList = categoryDao.list();
      const categoryExists = categoryList.some((u) => u.Name === category.Name || u.Color === category.Color);
      
      if (categoryExists) {
        res.status(400).json({
          code: "categoryAlreadyExists",
          message: `category with name ${category.Name} or color ${category.Color} already exists`,
        });
        return;
      } 
      
      //existence user
      const userList = userDao.list();
      const userExists = userList.some((user) => user.id === category.userId)
      
      if (!userExists){
        res.status(400).json({
          code: "userIdNotExists",
          message: `userId ${category.userId} does not exist`,
        }); 
        return;
      }
  
      category = categoryDao.create(category);
      res.json(category);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

module.exports = {
    createAbl
}