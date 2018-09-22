const listAllTables = require('./listAllTables');
const deleteAllItems = require('./deleteAllItems');

const deleteAllItemsFromAllTables = async (AWS) => {
  const tableNames = await listAllTables(AWS);
  await Promise.all(tableNames.map(i => deleteAllItems(AWS, i)));
};

module.exports = deleteAllItemsFromAllTables;
