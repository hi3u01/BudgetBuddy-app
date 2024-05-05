const Ajv = require("ajv");
const ajv = new Ajv();
const categoryDao = require("../../dao/category-dao.js");
const financeDao = require("../../dao/finance-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function deleteAbl(req, res) {
  try {
    
    const reqParams = req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    categoryDao.remove(reqParams.id);

    const financeList = financeDao.list();
    const finance = financeList.find(finance => finance.categoryId === reqParams.id);
    
    if (finance) {
      finance.categoryId = ""; 
      financeDao.update(finance);
    }
    

    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = deleteAbl;
