const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const financeFolderPath = path.join(__dirname, "storage", "financeList");

// Method to read an finance from a file
function get(financeId) {
  try {
    const filePath = path.join(financeFolderPath, `${financeId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadfinance", message: error.message };
  }
}

// Method to write an finance to a file
function create(finance) {
  try {
    finance.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(financeFolderPath, `${finance.id}.json`);
    const fileData = JSON.stringify(finance);
    fs.writeFileSync(filePath, fileData, "utf8");

    return finance;
  } catch (error) {
    throw { code: "failedToCreatefinance", message: error.message };
  }
}

// Method to update finance in a file
function update(finance) {
  try {
    const currentfinance = get(finance.id);
    if (!currentfinance) return null;
    const newfinance = { ...currentfinance, ...finance };
    const filePath = path.join(financeFolderPath, `${finance.id}.json`);
    const fileData = JSON.stringify(newfinance);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newfinance;
  } catch (error) {
    throw { code: "failedToUpdatefinance", message: error.message };
  }
}

// Method to remove an finance from a file
function remove(financeId) {
  try {
    const filePath = path.join(financeFolderPath, `${financeId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemovefinance", message: error.message };
  }
}

// Method to list finance in a folder
function list() {
  try {
    const files = fs.readdirSync(financeFolderPath);
    const financeList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(financeFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return financeList;
  } catch (error) {
    throw { code: "failedToListfinance", message: error.message };
  }
}


module.exports = {
  get,
  create,
  update,
  remove,
  list
};
