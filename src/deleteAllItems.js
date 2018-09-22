const deleteAllItems = async (AWS, tableName) => {
  const d = new AWS.DynamoDB();
  const dc = new AWS.DynamoDB.DocumentClient();

  const describeTable = await d.describeTable({ TableName: tableName }).promise();

  const keys = describeTable.Table.KeySchema.map(i => i.AttributeName);

  const keyForItem = i => keys.reduce((acc, cur) => {
    acc[cur] = i[cur];
    return acc;
  }, {});

  const deleteItems = async (items) => {
    if (items.length === 0) return;

    await Promise.all(
      items.map(i => dc.delete({ TableName: tableName, Key: keyForItem(i) }).promise()),
    );

    // Counld not get it working with batchWrite

    // const params = {
    //   RequestItems: {
    //     [tableName]: items.map(i => ({
    //       // eslint-disable-next-line no-return-assign
    //       DeleteReauest: {
    //         Key: keyForItem(i),
    //       },
    //     })),
    //   },
    // };
    // await dc.batchWrite(params).promise();

    const scan = await dc.scan({ TableName: tableName }).promise();
    deleteItems(scan.Items);
  };

  const scan = await dc.scan({ TableName: tableName }).promise();
  deleteItems(scan.Items);
};

module.exports = deleteAllItems;
