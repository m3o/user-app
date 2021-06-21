const { API_KEY } = process.env;

const m3o = require("@m3o/m3o-node");

exports.handler = async function (event, context) {
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: { error: "no api key" },
    };
  }
  
  let body = JSON.parse(event.body);
  if (!body.token) {
    return {
      statusCode: 400,
      body: { error: "no token" },
    };
  }
  try {
    let response = await new m3o.Client({ token: API_KEY }).call(
      "user",
      "VerifyEmail",
      {
        token: body.token,
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: { error: JSON.stringify(e) },
    };
  }
};
