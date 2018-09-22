const listAllTables = require('./listAllTables');
const deleteTable = require('./deleteTable');

const deleteAllTables = async (AWS) => {
  const tableNames = await listAllTables(AWS);
  await Promise.all(tableNames.map(i => deleteTable(AWS, i)));
};

module.exports = deleteAllTables;
