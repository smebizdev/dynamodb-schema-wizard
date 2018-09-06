const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB();

const describeResponseToCreateParams = require('./describeResponseToCreateParams');

/**
 * Accepts an array of table names, returns AWS.DynamoDB#createTable parameters for each table
 *
 * @param {String[]} tables array of table names to export schema from
 * @returns {Object[]} list of objects which we can use to call AWS.DynamoDB#createTable
 */
const exportSchemas = async (tables) => {
  const schemas = await Promise.all(
    tables.map(async (TableName) => {
      const r = await ddb.describeTable({ TableName }).promise();
      return describeResponseToCreateParams(r);
    }),
  );

  return schemas;
};

module.exports = exportSchemas;
