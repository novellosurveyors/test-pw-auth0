const faunadb = require("faunadb");
const { Paginate, Match, Index } = faunadb.query;

const secret = process.env.FAUNADB_SERVER_SECRET;
const client = new faunadb.Client({ secret });

const handler = async (event) => {
  try {
    const { data } = await client.query(
      Paginate(Match(Index("by_ref_location")))
    );
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
