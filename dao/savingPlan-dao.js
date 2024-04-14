const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const savingPlanFolderPath = path.join(__dirname, "storage", "savingPlanList");

// Method to read an savingPlan from a file
function get(savingPlanId) {
  try {
    const filePath = path.join(savingPlanFolderPath, `${savingPlanId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadsavingPlan", message: error.message };
  }
}

// Method to write an savingPlan to a file
function create(savingPlan) {
  try {
    savingPlan.id = crypto.randomBytes(16).toString("hex");
    savingPlan.savedAmount = 0;
    const filePath = path.join(savingPlanFolderPath, `${savingPlan.id}.json`);
    const fileData = JSON.stringify(savingPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return savingPlan;
  } catch (error) {
    throw { code: "failedToCreatesavingPlan", message: error.message };
  }
}

// Method to update savingPlan in a file
function update(savingPlan) {
  try {
    const currentsavingPlan = get(savingPlan.id);
    if (!currentsavingPlan) return null;
    const newsavingPlan = { ...currentsavingPlan, ...savingPlan };
    const filePath = path.join(savingPlanFolderPath, `${savingPlan.id}.json`);
    const fileData = JSON.stringify(newsavingPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newsavingPlan;
  } catch (error) {
    throw { code: "failedToUpdatesavingPlan", message: error.message };
  }
}

// Method to remove an savingPlan from a file
function remove(savingPlanId) {
  try {
    const filePath = path.join(savingPlanFolderPath, `${savingPlanId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemovesavingPlan", message: error.message };
  }
}

// Method to list savingPlan in a folder
function list() {
    try {
      const files = fs.readdirSync(savingPlanFolderPath);
      const savingPlanList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(savingPlanFolderPath, file), "utf8");
        return JSON.parse(fileData);
      });
      return savingPlanList;
    } catch (error) {
      throw { code: "failedToListsavingPlan", message: error.message };
    }
  }


module.exports = {
  get,
  create,
  update,
  remove,
  list
};

