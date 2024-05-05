const Ajv = require("ajv").default;
const ajv = new Ajv();
const savingPlanDao = require("../../dao/savingPlan-dao.js");
const userDao = require("../../dao/user-dao.js");


ajv.addFormat('date', {
    validate: function(value) {
      
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }
  });

const schema ={
    type: "object",
    properties: {
        goalAmount:{type: "number"},
        savedAmount: { type: "number"},
        Name: {type: "string"},
        userId: {type: "string"}
    },
    required: ["goalAmount","Name"],
    additionalProperties: false,
};

async function createAbl(req, res) {
    try {
      let savingPlan = req.body;
      const valid = ajv.validate(schema, savingPlan);
      
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
      
      //existence savingPlan
      const savingPlanList = savingPlanDao.list();
      const NameExists = savingPlanList.some((u) => u.Name === savingPlan.Name);
      if (NameExists) {
        res.status(400).json({
          code: "NameAlreadyExists",
          message: `savingPlan with name ${savingPlan.Name} already exists`,
        });
        return;
      }
      // //existence user
      // const userList = userDao.list();
      // const userExists = userList.some((user) => user.id === savingPlan.userId)
      
      // if (!userExists){
      //   res.status(400).json({
      //     code: "userIdNotExists",
      //     message: `userId ${category.userId} does not exist`,
      //   }); 
      //   return;
      // }

      savingPlan = savingPlanDao.create(savingPlan);
      res.json(savingPlan);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

module.exports = {
    createAbl
}