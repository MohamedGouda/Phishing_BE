const { v4: uuidv4 } = require('uuid');
const User = require("../Models/user");

validateUserData = (targetDate) => {
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

exports.getUserById = async (id, res) => {
    try {
        const data = await User.findOne(({ where: { user_id: id } }))
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.getAllUsers = async (body) => {

    let sortCriteria= []

    sortCriteria.push(body["sort"]["column"])
    sortCriteria.push(body["sort"]["sortType"])

    try {
        const data = await User.findAll({
            limit: body.numberOfRecords,
            offset: (body.pageNumber * body.numberOfRecords),
            order: [sortCriteria]
        });
        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}

exports.addNewUser = async (data) => {

    try {
        if (validateUserData(data)) {
            data = { ...data, user_id: uuidv4() };
            const addedUser = await User.create({ ...data });
            return { status: 200, data: addedUser };
        } else {
            return { status: 401, data: "added data not valid.." };
        }
    } catch (error) {
        return { status: 500, data: error };
    }
}

exports.searchUser=  async (body) => {
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

        const data = await User.findAll({
            ...findObject
        });

        return { status: 200, data };
    } catch (error) {
        return { status: 404, data: error };
    }
}