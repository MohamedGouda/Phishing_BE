const { v4: uuidv4 } = require('uuid');
const Target = require("../Models/target");


setReturnedObjectFromVerification = (target, msg) => {
    return obj = {
        target,
        msg
    }
}

validateTargetData = (targetDate) => {
    return (validateEmail(targetDate.email) && validateName(targetDate.name)) ? true : false
}

validateEmail = (email) => {
    return (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) && String(email).length <= 254);
};

validateName = (name) => {
    return (name.length <= 50 &&
        name.match(/^[A-Za-z0-9 ]+$/))
}

checkEmailDuplication = async (email) => {
    const data = await Target.findOne(({ where: { email: email } }))
    return data ? true : false
}

exports.getTargetById = async (id, res) => {
    try {
        const data = await Target.findOne(({ where: { target_id: id } }))
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.getAllTargets = async (body) => {

    let sortCriteria = []

    sortCriteria.push(body["sort"]["column"])
    sortCriteria.push(body["sort"]["sortType"])

    if (!sortCriteria) {
        sortCriteria.push('created_on')
        sortCriteria.push('ASC')
    }

    try {
        const data = await Target.findAll({
            limit: body.numberOfRecords,
            offset: (body.pageNumber * body.numberOfRecords),
            order: [sortCriteria]
        });
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
            return { status: 401, data: "added data not valid.." };
        }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.addBulkData = async (data) => {
    try {
        data = data.map((t) => { return { ...t, target_id: uuidv4() } })

        console.log(data)
        const addedTarget = await Target.bulkCreate(data);
        return { status: 200, data: addedTarget };
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.editTarget = async (target_id , body) => {
    try {
        const result = await Target.update({ ...body }, { where: { target_id } })
        return { status: 201, data: result }
    } catch (error) {
        return { status: 500, data: error };
    }
}


exports.verifyBulkData = async (data) => {
    try {
        validList = []
        notValidList = []
        obj = {}

        data.forEach(target => {
            if (checkEmailDuplication(target.email)) {
                notValidList.push(setReturnedObjectFromVerification(target, 'email duplicated'))
            }
            else if (validateTargetData(target)) {
                validList.push(setReturnedObjectFromVerification(target, ''))
            } else {
                if (target.name == '') {
                    notValidList.push(setReturnedObjectFromVerification(target, 'name is required'))
                } else if (target.email == '') {
                    notValidList.push(setReturnedObjectFromVerification(target, 'email is required'))
                } else {
                    notValidList.push(setReturnedObjectFromVerification(target, ''))
                }
            }
        })
        return {
            status: 200,
            data: {
                valid: validList,
                notValid: notValidList
            }
        }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.searchTargets = async (body) => {
    try {
        let sortCriteria = []
        let searchCriteria = {}
        let findObject = {}

        findObject['limit'] = body.numberOfRecords
        findObject['offset'] = (body.pageNumber * body.numberOfRecords)

        if (body["sort"]) {
            sortCriteria.push(body["sort"]["column"])
            sortCriteria.push(body["sort"]["sortType"])
        } else {
            sortCriteria.push('created_on')
            sortCriteria.push('ASC')
        }

        if (body["search"]) {
            searchCriteria[body["search"]["column"]] = body["search"]["value"]

            findObject['where'] = searchCriteria
        }

        findObject['order'] = [sortCriteria]

        const data = await Target.findAll({
            ...findObject
        });

        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}