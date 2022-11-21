// var queries = require('../Database/queries')
// var db_connection = require('../Database/connection')
var targetService = require('../Services/target.service')
const Target = require("../Models/target");

exports.getTargetsList = (req, res) => {
    try {
        targetService.getAllTargets()
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.getTargetById = (req, res) => {
    try {
        targetService.getTargetById(req.params.target_id, res)
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addTarget = (req, res) => {
    try {
        targetService.addNewTarget(req.body)
    } catch (error) {
        return res.status(500).send({ error });
    }
}

exports.addBulkData = (req, res) => {
    try {
        targetService.addNewTarget(req.body)
    } catch (error) {
        return res.status(500).send({ error });
    }
}
