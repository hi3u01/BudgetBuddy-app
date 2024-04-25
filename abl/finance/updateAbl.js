const Ajv = require("ajv");
const ajv = new Ajv();
const financeDao = require("../../dao/finance-dao.js");

ajv.addFormat('date', {
  validate: function(value) {
    
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
});

const schema ={
  type: "object",
  properties: {
    Amount: { type: "number" },
    Group: { type: "string", enum: ["finance", "savings"] },
    Type: { type: "string", enum: ["expense", "income"] },
    Name: { type: "string" },
    Date: { type: "string", format: "date" },
    Place: { type: "string" },
    categoryId: { type: "string" },
    savingPlanId: { type: "string" },
    userId: { type: "string" }
  },
  required: ["id", "userId"],
  additionalProperties: false
};
async function UpdateAbl(req, res) {
  try {
    let finance = req.body;

    // validate input
    const valid = ajv.validate(schema, finance);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedFinance = financeDao.update(finance);
    if (!updatedFinance) {
      res.status(404).json({
        code: "financeNotFound",
        message: `Finance ${finance.id} not found`,
      });
      return;
    }

    res.json(updatedFinance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
