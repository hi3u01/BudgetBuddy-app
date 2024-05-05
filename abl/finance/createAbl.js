const Ajv = require("ajv").default;
const ajv = new Ajv();
const financeDao = require("../../dao/finance-dao.js");
const categoryDao = require("../../dao/category-dao.js");
const userDao = require("../../dao/user-dao.js");
const savingPlanDao = require("../../dao/savingPlan-dao.js");

ajv.addFormat('date', {
    validate: function (value) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }
});

const schema = {
    type: "object",
    properties: {
        amount: { type: "number" },
        type: { type: "string", enum: ["expense", "income"] },
        name: { type: "string" },
        date: { type: "string", format: "date" },
        place: { type: "string" },
        categoryId: { type: "string" },
        savingPlanId: { type: "string" },
        userId: { type: "string" }
    },
    required: ["amount", "type", "date"],
    additionalProperties: false
};


async function createAbl(req, res) {
    try {
        let finance = req.body;
        const valid = ajv.validate(schema, finance);

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // existence category
        if (finance.categoryId) { // Provádět validaci pouze pokud je categoryId definováno
            const categoryList = await categoryDao.list();
            const categoryExists = categoryList.some((u) => u.id === finance.categoryId);

            if (!categoryExists) {
                res.status(400).json({
                    code: "categoryNotExists",
                    message: `category ${finance.categoryId} does not exist`,
                });
                return;
            }
        }

        // // existence user
        // const userList = userDao.list();
        // const userExists = userList.some((user) => user.id === finance.userId);

        // if (!userExists) {
        //     res.status(400).json({
        //         code: "userIdNotExists",
        //         message: `userId ${finance.userId} does not exist`,
        //     });
        //     return;
        // }
         //adding finance to savingPlan
        if (finance.savingPlanId) {
            const selectedSavingPlan = savingPlanDao.get(finance.savingPlanId);

            if (!selectedSavingPlan) {
                res.status(400).json({
                    code: "savingPlanNotFound",
                    message: `Saving plan with ID ${finance.savingPlanId} does not exist`,
                });
                return;
            }
            selectedSavingPlan.savedAmount += finance.amount;
            savingPlanDao.update(selectedSavingPlan);
        }

        finance = financeDao.create(finance);
        res.json(finance);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = {
    createAbl
};
