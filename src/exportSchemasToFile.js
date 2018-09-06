const fs = require('fs');
const exportSchemas = require('./exportSchemas');

/**
 * Same as exportSchemas, but saves to a file
 *
 * @param {String[]} tables list of table names which schema we want to export
 * @param {String} filepath filepath where to save schema
 */
const exportSchemasToFile = async (tables, filepath) => {
  const schemas = await exportSchemas(tables);
  const filedata = JSON.stringify(schemas, null, 4);
  fs.writeFileSync(filepath, filedata);
};

module.exports = exportSchemasToFile;
