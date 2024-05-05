const savingPlanDao = require("../../dao/savingPlan-dao.js");

async function ListAbl(req, res) {
  try {
    const savingPlanList = savingPlanDao.list();
    res.json(savingPlanList);
  } catch (e) {
    res.status(500).json({ savingPlan: e.savingPlan });
  }
}

module.exports = ListAbl;
