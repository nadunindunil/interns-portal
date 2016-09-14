var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const jsend = require('jsend');

module.exports = {
    getAllActiveTask: function(event, context) {
        var params = {
            TableName: "task",
            IndexName: "statusIndex",
            KeyConditionExpression: "#s = :status",
            ExpressionAttributeValues: {
                ":status": "active"
            },
            ExpressionAttributeNames: {
                "#s": "status",
                "#t": "timestamp"
            },
            ProjectionExpression: "id,#t"

        };
        docClient.query(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    getUserTask: function(event, context) {
        var params = {
            TableName: "person",
            Key: {
                "id": event.body.id
            },
            ProjectionExpression: "task"
        };
        docClient.get(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });

    },
    insertNewTask: function(event, context) {
        var timeStamp = Date.now();
        var params = {
            TableName: "task",
            Item: {
                id: event.body.task,
                timestamp: timeStamp,
                status: "active"
            }
        };
        docClient.put(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    updateUserTask: function(event, context) {
        var params = {
            TableName: "person",
            Key: {
                "id": event.body.id
            },
            UpdateExpression: "SET task = :Task",
            ExpressionAttributeValues: {
                ":Task": event.body.task
            },
            ReturnValues: "ALL_NEW"
        };
        docClient.update(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    },
    disableTask: function(event, context) {
        var params = {
            TableName: "task",
            Key: {
                "id": event.body.id
            },
            UpdateExpression: "SET #s  = :Task",
            ExpressionAttributeValues: {
                ":Task": "deactive"
            },
            ExpressionAttributeNames: {
                "#s": "status"
            },
            ReturnValues: "ALL_NEW",

        };
        docClient.update(params, function(err, data) {
            context.succeed(jsend.fromArguments(err, data));
        });
    }
};