/**
 * A small library providing utility methods to to store provided
 * input data respctively to MySql and Rethink database.
 */
var _ = require('underscore-node'),
    async = require('async');

module.exports = {
  
    /**
     * Function to save provided mysql & nosql data in respective database
     * keeping primary key as a linking entity between that two tables of MySql & NoSql database.
     * @param {string} modelName
     * @param {string} mySqlTable
     * @param {json object} rethinkInput
     * @param {json object} mySqlInput
     * @param {string} primaryKey
     * @param {json object} req
     * @returns {Promise}
     */
    save : function(modelName, mySqlTable, rethinkInput, mySqlInput, primaryKey, req){
        
        return new Promise(function(resolve,reject){
            
            req.getConnection(function(err, connection) {
                if (err) {
                    reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                } else {
                    var addQuery = connection.query('INSERT INTO `' + mySqlTable + '` SET ?', mySqlInput, function(err, rows) {
                        if (err) {
                            reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                        } else {
                            var entityIdValue = rows.insertId;
                            
                            /**
                             * Add remaining data to rethink
                             */
                            var OrderModel = require(__dirname + '/app/schema/models/Orders.modal');
                            
                            var order = new OrderModel(rethinkInput);
                            order.created_at = r.now();
                            order.updated_at = r.now();
                            order[primaryKey] = entityIdValue.toString();
                            order.save().then(function (addedEntity) {
                                var finalJson = _.extend(addedEntity, mySqlInput)
                                resolve({
                                    success: true,
                                    message: 'Succes',
                                    orderDetail: finalJson
                                });
                            }, function(error){
                                reject({httpstatus : 500, status: "-4", message : error.message})
                            });
                        }
                    });
                }
            });
        });
    },
    
    /**
     * Function to fetch list of any entity from mysql & nosql database.
     * @param {string} modelName
     * @param {string} mySqlTable
     * @param {string} primaryKey
     * @param {json object} req
     * @returns {Promise}
     */
    list : function(modelName, mySqlTable, primaryKey, req){
        return new Promise(function(resolve,reject){
            
            req.getConnection(function(err, connection) {
                if (err) {
                    reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                } else {
                    var OrderModel = require(__dirname + '/app/schema/models/Orders.modal');
                    var fetchQuery = connection.query('SELECT * FROM  `' + mySqlTable + '`', function(err, rows) {
                        if (err) {
                            reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                        } else {
                            var mySqlResult = rows;
                            global.finalResponse = [];
                            
                            async.each(mySqlResult, function(obj, callback) {
                                
                                var linkingEntity = obj[primaryKey];
                                
                                OrderModel.filter({orderId : linkingEntity.toString()}).orderBy('created_at').run().then(function (list) {
                                    
                                    var tempObj = {
                                        mySql : obj,
                                        noSql : list[0]
                                    };
                                    finalResponse.push(tempObj);
                                    callback()
                                }, function(error){
                                    callback({httpstatus : 500, status: "-4", message : error.message});
                                });
                            }, function(err) {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve({
                                        success: true,
                                        message: 'Succes',
                                        data: finalResponse
                                    });
                                }
                            });
                        }
                    });
                    
                }
            });
        });
    },
    
    /**
     * Function to fetch detail of any entity from mysql & nosql database with the help of
     * provided linking key and its value.
     * @param {string} modelName
     * @param {string} mySqlTable
     * @param {string} primaryKey
     * @param {type} primaryKeyValue
     * @param {json object} req
     * @returns {Promise}
     */
    detail : function(modelName, mySqlTable, primaryKey, primaryKeyValue, req){
        return new Promise(function(resolve,reject){
            
            req.getConnection(function(err, connection) {
                if (err) {
                    reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                } else {
                    var OrderModel = require(__dirname + '/app/schema/models/Orders.modal');
                    var fetchQuery = connection.query('SELECT * FROM  `' + mySqlTable + '` WHERE ' + primaryKey + ' = ?', [primaryKeyValue], function(err, rows) {
                        if (err) {
                            reject({httpstatus : 500, status: "-4", message : "Unable to process your request. Please try again later."});
                        } else {
                            OrderModel.filter({orderId : primaryKeyValue.toString()}).run().then(function (list) {
                                var tempJson = {
                                    mySql : rows[0],
                                    noSql : list[0]
                                }
                                resolve({
                                    success: true,
                                    message: 'Succes',
                                    data: tempJson
                                });
                            }, function(error){
                                reject({httpstatus : 500, status: "-4", message : error.message});
                            });
                        }
                    });
                }
            });
        });
    }
};
