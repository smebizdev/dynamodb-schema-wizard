const AWS = require('aws-sdk');
const chalk = require('chalk');

/**
 * Creates tables using destination as SDK DynamoDB object or DynamoDB endpoint and
 * an array of schemas
 *
 * @param {String|AWS.DynamoDB} destination Endpoint as a string or AWS.DynamoDB instance
 * @param {Object[]} schemas Array of objects which can be used for AWS.DyanmoDB#createTable
 * @returns {Promise} that resolves to array of AWS.DyanmoDB#createTable promises
 */
const createTables = (destination, schemas) => {
  let ddbDestination;

  if (typeof destination === 'string') {
    ddbDestination = new AWS.DynamoDB({ destination });
  } else {
    ddbDestination = destination;
  }

  // Probably need to check if destionation is an instance of AWS.DynamoDB, but we can't do
  // it here with instanceof, as we don't have user's AWS.DynamoDB class to check
  // and it won't work with our AWS.DynamoDB class.
  // Need to deal with .constructor I think, but I don't have time now, so TODO

  console.log(`\n${chalk.bold.white('DynamoDB Schema Wizard started creating tables')}\n`);
  const createTableOperations = schemas.map(schema => ddbDestination
    .createTable(schema)
    .promise()
    .then(() => {
      console.log(`${chalk.bold.green(schema.TableName)} table has been successfully created`);
    })
    .catch((e) => {
      const tableName = chalk.bold.redBright(schema.TableName);
      console.log(`Couldn't create ${tableName} table, error message: ${e.message}`);
    }));

  return Promise.all(createTableOperations).then(() => console.log(`\n${chalk.bold.white('DynamoDB Schema Wizard finished creating tables')}\n`));
};

module.exports = createTables;
