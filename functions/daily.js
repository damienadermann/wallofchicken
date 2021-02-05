const selectChickens = require("./utils/selectChickens")
const potentialChickens = require("./utils/potentialChickens")

const TODAY = undefined

exports.handler = function (event, context, callback) {
  const { team } = event.queryStringParameters
  const chickens = selectChickens(potentialChickens, TODAY, team)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
      {
        chickens: chickens.map((chicken) => chicken.name),
        chickenIds: chickens.map((chicken) => chicken.id),
      },
      null,
      2
    ),
  })
}
