const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const schema ={
    type: "object",
    properties: {
        Name:{type: "string"},
        Color: {type: "string"},
        limit: {type:"number"},
        userId: {type: "string"},
        id: {type: "string"}
  },
  required: ["id"],
  additionalProperties: false,
};

async function updateAbl(req, res) {
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

    const categoryList = categoryDao.list();
    const categoryExists = categoryList.some(
      (u) => (u.Name === category.Name|| u.Color === category.Color) && u.id !== category.id
    );
    if (categoryExists) {
      res.status(400).json({
        code: "categoryAlreadyExists",
        message: `category with name ${category.Name} or color ${category.Color} already exists`,
      });
      return;
    }

    const updatedcategory = categoryDao.update(category);
    if (!updatedcategory) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `category ${category.id} not found`,
      });
      return;
    }

    res.json(updatedcategory);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = updateAbl;
