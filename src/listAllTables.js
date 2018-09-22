const listAllTables = async (AWS) => {
  const d = new AWS.DynamoDB();

  const tableNames = [];

  let lt = await d.listTables().promise();

  tableNames.push(...lt.TableNames);

  while (lt.LastEvaluatedTableName) {
    // eslint-disable-next-line no-await-in-loop
    lt = await d.listTables({ ExclusiveStartTableName: lt.LastEvaluatedTableName });
    tableNames.push(...lt.TableNames);
  }

  return tableNames;
};

module.exports = listAllTables;
