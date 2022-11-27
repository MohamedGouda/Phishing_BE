const { v4: uuidv4 } = require('uuid');
const Group = require("../Models/group");

validateGroupData = (groupDate) => {
    return (validateName(groupDate.name)) ? true : false
}

validateName = (name) => {
    return (name.length <= 50 &&
        name.match(/^[A-Za-z0-9 ]+$/))
}

exports.getGroupById = async (id, res) => {
    try {
        const data = await Group.findOne(({ where: { group_id: id } }))
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.getAllGroups = async (body) => {

    let sortCriteria = []

    sortCriteria.push(body["sort"]["column"])
    sortCriteria.push(body["sort"]["sortType"])

    try {
        const data = await Group.findAll({
            limit: body.numberOfRecords,
            offset: (body.pageNumber * body.numberOfRecords),
            order: [sortCriteria]
        });
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.addNewGroup = async (data) => {

    try {
        if (validateGroupData(data)) {
            data = { ...data, group_id: uuidv4() };
            const addedGroup = await Group.create({ ...data });
            return { status: 200, data: addedGroup };
        } else {
            return { status: 401, data: "added data not valid.." };
        }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.editGroup = async (group_id, body) => {
    try {
        const result = await Group.update({ ...body }, { where: { group_id } })
        return { status: 201, data: result }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.searchGroup = async (body) => {
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

        const data = await Group.findAll({
            ...findObject
        });

        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}