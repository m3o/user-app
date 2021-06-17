const { API_KEY } = process.env;

const m3o = require('@m3o/m3o-node');

exports.handler = async function (event, context) {
  let response = await new m3o.Client({ token: API_KEY }).call(
    'file',
    'List',
    {}
  );
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
