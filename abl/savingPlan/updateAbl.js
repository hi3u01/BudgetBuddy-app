const Ajv = require("ajv");
const ajv = new Ajv();
const savingPlanDao = require("../../dao/savingPlan-dao.js");

ajv.addFormat('date', {
    validate: function(value) {
      
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }
  });

const schema ={
    type: "object",
    properties: {
        goalAmount:{type: "number"},
        savedAmount :{type: "number"},
        Date: {type: "string"},
        Name: {type: "string"},
        userId: {type: "string"},
        id: {type:"string"}
    },
    required: ["id"],
    additionalProperties: false,
};
async function UpdateAbl(req, res) {
  try {
    let savingPlan = req.body;

    // validate input
    const valid = ajv.validate(schema, savingPlan);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const savingPlanList = savingPlanDao.list();
    const savingPlanExists = savingPlanList.some(
      (u) => u.Name === savingPlan.Name && u.id !== savingPlan.id
    );
    if (savingPlanExists) {
      res.status(400).json({
        code: "savingPlanAlreadyExists",
        message: `savingPlan with name ${savingPlan.Name} or color ${savingPlan.Color} already exists`,
      });
      return;
    }

    const updatedsavingPlan = savingPlanDao.update(savingPlan);
    if (!updatedsavingPlan) {
      res.status(404).json({
        code: "savingPlanNotFound",
        message: `savingPlan ${savingPlan.id} not found`,
      });
      return;
    }

    res.json(updatedsavingPlan);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
