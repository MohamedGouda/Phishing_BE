// var queries = require('../Database/queries')
// var db_connection = require('../Database/connection')
var targetService = require('../Services/target.service')
const Target = require("../Models/target");

exports.getTargetsList = async (req, res) => {
    try {
        const result = await targetService.getAllTargets();
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.getTargetById = (req, res) => {
    try {
        const result = targetService.getTargetById(req.params.target_id, res)
        return res.status(result.status).send(JSON.stringify(result.data)); 
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addTarget = async (req, res) => {
    try {
        const result = await targetService.addNewTarget(req.body)
        console.log(result)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addBulkData = (req, res) => {
    try {
        const result = targetService.addNewTarget(req.body)
        return res.status(result.status).send(JSON.stringify(result.data));
    } catch (error) {
        return res.status(500).send({ error });
    }
}
