const financeDao = require("../../dao/finance-dao.js");

async function listAbl(req, res) {
  try {
    const financeList = financeDao.list();
    res.json(financeList);
  } catch (e) {
    res.status(500).json({ finance: e.finance });
  }
}

module.exports = listAbl;
