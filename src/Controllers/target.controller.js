// var queries = require('../Database/queries')
// var db_connection = require('../Database/connection')
var targetService = require('../Services/target.service')
const Target = require("../Models/target");

exports.getTargetsList = async (req, res) => {
    try {
        // var listQuery = queries.targetQueryList.getTargetsList_Query;
        const data = await Target.findAll();
        // var data = await db_connection.dbQuery(listQuery);
        return res.status(200).send(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}

exports.getTargetById = async (req, res) => {
    try {
        var id = req.query.targetId;
        var listQuery = queries.targetQueryList.getTargetById_Query;
        var data = await db_connection.dbQuery(listQuery, id);
        return res.status(200).send(JSON.stringify(data.rows));

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}

exports.addTarget = async (req, res) => {
    try {

        if (targetService.validateTargetData(req.body)) {
            var listQuery = queries.targetQueryList.saveTarget_Query;
            var data = await db_connection.dbQuery(listQuery, targetData);
            return res.status(200).send(JSON.stringify(data.rows));
        }else{
            return res.status(402).send({error: 'Please enter valid data'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}
