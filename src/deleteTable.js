const deleteTable = (AWS, tableName) => {
  const d = new AWS.DynamoDB();
  return d.deleteTable({ TableName: tableName }).promise();
};

module.exports = deleteTable;
