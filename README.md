# DynamoDB Schema Wizard

<p align="center">
  <img src="https://f.smebiz.com/icon/64x64.png" alt="SMEBiz logo">
</p>

## Description

Allows you to replicate DynamoDB tables from AWS account to the dynamodb-local.

## API Docs

As there're very few files, please read JSDoc.

## Example

`scripts/exportDynamoDBSchemas.js`

```javascript
require("dotenv").config();

const { exportSchemasToFile } = require("dynamodb-schema-wizard");

const tables = Object.entries(process.env)
  .map(([key, value]) => (key.endsWith("_DYNAMODB_TABLE") ? value : null))
  .filter(i => i);

exportSchemasToFile(tables, `${__dirname}/../dynamodb-schema.json`);
```

`src/aws-sdk.js`

```javascript
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

if (process.env.NODE_ENV !== "production") {
  AWS.config.update({
    endpoint: "http://localhost:8000"
  });
}

module.exports = AWS;
```

`setupTestEnvironment.js`

```javascript
require("dotenv").config();

const dynamodbSchema = require("../dynamodb-schema.json");
const { createTables } = require("dynamodb-schema-wizard");
const AWS = require("../src/aws-sdk");

createTables(new AWS.DynamoDB(), dynamodbSchema);
```

`jest.config.js`

```javascript
module.exports = {
  globalSetup: "./setupTestEnvironment.js"
};
```

`.env`

```
SOME_DYNAMODB_TABLE=sometable
ANOTHER_DYNAMODB_TABLE=someanothertable
```
