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
        return res.status(200).send(JSON.stringify(data.rows));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.getAllTargets = async () => {
    try {
        const data = await Target.findAll();
        return res.status(200).send(JSON.stringify(data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addNewTarget = async (data) => {

    try {
        if (validateTargetData(data)) {
            const addedTarget = await Target.create({ ...data });
            return res.status(200).send(JSON.stringify(addedTarget.rows));
        } else {
            return res.status(402).send({ error: 'Please enter valid data' });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addBulkData = async (data) => {
    try {
        const addedTarget = await Target.bulkCreate(data);
        return res.status(200).send(JSON.stringify(addedTarget.rows));
    } catch (error) {
        return res.status(500).send({ error });

    }
}