const selectChickens = require("./utils/selectChickens")
const getPotentialChickens = require("./utils/getPotentialChickens")

const TODAY = undefined

exports.handler = async function (event, context) {
  const { team } = event.queryStringParameters
  const potentialChickens = await getPotentialChickens()
  const chickens = selectChickens(potentialChickens, TODAY, team)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        chickens: chickens.map((chicken) => chicken.name),
        chickenIds: chickens.map((chicken) => chicken.id),
      },
      null,
      2
    ),
  }
}
