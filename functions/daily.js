const selectChickens = require("./utils/selectChickens")
const getSeedOffset = require("./utils/getSeedOffset")
const getPotentialChickens = require("./utils/getPotentialChickens")

const TODAY = undefined

exports.handler = async function (event, context) {
  const { team } = event.queryStringParameters
  const { potentialChickens, seeds } = await getPotentialChickens()
  const seedIndex = getSeedOffset(TODAY)
  const chickens = selectChickens(potentialChickens, seeds[seedIndex], team)
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
