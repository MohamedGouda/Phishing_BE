var userService = require('../Services/user.service')
const User = require("../Models/user");

exports.getUsersList = async (req, res) => {
    try {
        const result = await userService.getAllUsers(req.body);
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const result = await userService.getUserById(req.params.user_id, res)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addUser = async (req, res) => {
    try {
        const result = await userService.addNewUser(req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}


exports.searchUser = async (req, res) => {
    try {
        const result = await userService.searchUser(req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}