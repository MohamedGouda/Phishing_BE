const { v4: uuidv4 } = require('uuid');
const Target = require("../Models/target");

validateTargetData = (targetDate) => {
    return (validateEmail(targetDate.email)/* && validateName(targetDate.name)*/) ? true : false
}

validateTargetDataList = (targetList) => {
}

const validateEmail = (email) => {
    return (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) && String(email).length <= 254);
};

const validateName = (name) => {
    return name.length <= 50
}

exports.getTargetById = async (id, res) => {
    try {
        const data = await Target.findOne(({ where: { target_id: id } }))
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.getAllTargets = async () => {
    try {
        const data = await Target.findAll();
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.addNewTarget = async (data) => {

    try {
        if (validateTargetData(data)) {
            data = { ...data, target_id: uuidv4() };
            const addedTarget = await Target.create({ ...data });
            return { status: 200, data: addedTarget };
        } else {
            return { status: 401, data: "adding failed..." };
        }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.addBulkData = async (data) => {
    try {
        const addedTarget = await Target.bulkCreate(data);
        return { status: 200, data: addedTarget };
    } catch (error) {
        return { status: 500, data: error };

    }
}