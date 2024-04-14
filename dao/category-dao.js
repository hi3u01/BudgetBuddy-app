const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const categoryFolderPath = path.join(__dirname, "storage", "categoryList");

// Method to read an category from a file
function get(categoryId) {
  try {
    const filePath = path.join(categoryFolderPath, `${categoryId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadCategory", message: error.message };
  }
}

// Method to write an category to a file
function create(category) {
  try {
    category.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(category);

    fs.writeFileSync(filePath, fileData, "utf8");
    return category;
  } catch (error) {
    throw { code: "failedToCreateCategory", message: error.message };
  }
}

// Method to update category in a file
function update(category) {
  try {
    const currentcategory = get(category.id);
    if (!currentcategory) return null;
    const newcategory = { ...currentcategory, ...category };
    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(newcategory);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newcategory;
  } catch (error) {
    throw { code: "failedToUpdateCategory", message: error.message };
  }
}

// Method to remove an category from a file
function remove(categoryId) {
  try {
    const filePath = path.join(categoryFolderPath, `${categoryId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveCategory", message: error.message };
  }
}

// Method to list category in a folder
function list() {
    try {
      const files = fs.readdirSync(categoryFolderPath);
      const categoryList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(categoryFolderPath, file), "utf8");
        return JSON.parse(fileData);
      });
      return categoryList;
    } catch (error) {
      throw { code: "failedToListCategory", message: error.message };
    }
  }


module.exports = {
  get,
  create,
  update,
  remove,
  list
};

