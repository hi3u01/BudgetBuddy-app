const Ajv = require("ajv");
const ajv = new Ajv();
const financeDao = require("../../dao/finance-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    
    const reqParams = req.query?.id ? req.query : req.body;

    
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    const finance = financeDao.get(reqParams.id);
    if (!finance) {
      res.status(404).json({
        code: "financeNotFound",
        message: `finance ${reqParams.id} not found`,
      });
      return;
    }

    res.json(finance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
