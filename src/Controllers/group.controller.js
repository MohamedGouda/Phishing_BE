var groupService = require('../Services/group.service')
const Group = require("../Models/group");

exports.getGroupsList = async (req, res) => {
    try {
        const result = await groupService.getAllGroups(req.body);
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.getGroupById = async (req, res) => {
    try {
        const result = await groupService.getGroupById(req.params.group_id, res)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addGroup = async (req, res) => {
    try {
        const result = await groupService.addNewGroup(req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.editGroup = async (req, res)=>{
    try {
        const result = await groupService.editGroup(req.params.group_id,req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}


exports.searchGroups = async (req, res) => {
    try {
        const result = await groupService.searchGroup(req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}