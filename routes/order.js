require('../app/schema/rethinkdb');
var OrderModel = require('../app/schema/models/Orders.modal'),
    fieldsMapping = require('../app/schema/fieldsMapping'),
    credLib = require('../index.js'),
    _ = require('underscore-node');

/**
 * Function to handle the request for order add.
 * @param {type} req
 * @param {type} res
 * @returns JSON response with HTTP status code
 */
module.exports.createOrder = function(req, res) {
    
    var ordersFields = fieldsMapping.orders;
    if(ordersFields && typeof ordersFields !== 'undefined'){
        var input = req.body;
        var primaryKey = ordersFields.LinkingEntity;
        
        var orderMysqlFields = ordersFields.MySql,
            orderRethinkFields = ordersFields.Rethink;

        var orderMySqlInput = _.pick(input, orderMysqlFields),
            orderRethinkInput = _.pick(input, orderRethinkFields);
        
        /**
         * Calling library function which will save data in Mysql & Rethink respectively.
         */
        credLib.save('Orders.modal', 'order', orderRethinkInput, orderMySqlInput, primaryKey, req).then(function(response) {
            res.status(200).send(response);
        },function(error) {
            var httpstatus = error.httpstatus;
            var status = error.status;
            var message = error.message;
            res.status(httpstatus).send({
                status: status,
                message : message
            });
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Mapping for the entity order is not defined.'
        })
    }
}

/**
 * Function to handle the request for order listing.
 * @param {type} req
 * @param {type} res
 * @returns JSON response with HTTP status code
 */
module.exports.getOrdersList = function(req, res) {
    var ordersFields = fieldsMapping.orders;
    
    if(ordersFields && typeof ordersFields !== 'undefined'){
        var primaryKey = ordersFields.LinkingEntity;
        
        /**
         * Calling library function which will fetch data from Mysql & Rethink respectively for al orders.
         */
        credLib.list('Orders.modal', 'order', primaryKey, req).then(function(response) {
            res.status(200).send(response);
        },function(error) {
            var httpstatus = error.httpstatus;
            var status = error.status;
            var message = error.message;
            res.status(httpstatus).send({
                status: status,
                message : message
            });
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Mapping for the entity order is not defined.'
        })
    }
}

/**
 * Function to handle the request for fetching order detail.
 * @param {type} req
 * @param {type} res
 * @returns JSON response with HTTP status code
 */
module.exports.getOrderDetail = function(req, res) {
    var ordersFields = fieldsMapping.orders;
    
    if(ordersFields && typeof ordersFields !== 'undefined'){
        var primaryKey = ordersFields.LinkingEntity;
        var primaryKeyValue;
        
        if(req.params.id){
            primaryKeyValue = parseInt(req.params.id);
        }
        
        /**
         * Calling library function which will fetch oder details from Mysql & Rethink respectively for specfic order.
         */
        credLib.detail('Orders.modal', 'order', primaryKey, primaryKeyValue, req).then(function(response) {
            res.status(200).send(response);
        },function(error) {
            var httpstatus = error.httpstatus;
            var status = error.status;
            var message = error.message;
            res.status(httpstatus).send({
                status: status,
                message : message
            });
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Mapping for the entity order is not defined.'
        })
    }
}

function handleError(res) {
    return function (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

