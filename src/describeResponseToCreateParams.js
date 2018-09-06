/**
 * Converts response from AWS.DynamoDB#describeTable to the params of AWS.DynamoDB#createTable
 *
 * @param {Object} describeTableResponse response from the AWS.DynamoDB#describeTable
 * @returns {Object} params that we can use to call AWS.DynamoDB#createTable
 */
const describeResponseToCreateParams = ({ Table }) => ({
  TableName: Table.TableName,
  AttributeDefinitions: Table.AttributeDefinitions,
  KeySchema: Table.KeySchema,
  GlobalSecondaryIndexes: Table.GlobalSecondaryIndexes
    ? Table.GlobalSecondaryIndexes.map(gsi => ({
      IndexName: gsi.IndexName,
      KeySchema: gsi.KeySchema,
      Projection: gsi.Projection,
      ProvisionedThroughput: {
        ReadCapacityUnits: gsi.ProvisionedThroughput.ReadCapacityUnits,
        WriteCapacityUnits: gsi.ProvisionedThroughput.WriteCapacityUnits,
      },
    }))
    : undefined,
  LocalSecondaryIndexes: Table.LocalSecondaryIndexes
    ? Table.LocalSecondaryIndexes.map(lsi => ({
      IndexName: lsi.IndexName,
      KeySchema: lsi.KeySchema,
      Projection: lsi.Projection,
    }))
    : undefined,
  ProvisionedThroughput: {
    ReadCapacityUnits: Table.ProvisionedThroughput.ReadCapacityUnits,
    WriteCapacityUnits: Table.ProvisionedThroughput.WriteCapacityUnits,
  },
});

module.exports = describeResponseToCreateParams;
