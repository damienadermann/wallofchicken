const { GoogleSpreadsheet } = require("google-spreadsheet")

const ttl = 1000 * 60 * 2
let cache

const getRows = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n\\n/g, "\n"),
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()
  return rows
}

const adaptRows = (rows) => {
  const potentialChickens = []
  for (const row of rows) {
    const { slackName, slackId, team } = row
    if ([slackName, slackId, team].every((value) => typeof value === "string")) {
      potentialChickens.push({
        name: slackName,
        id: slackId,
        team: team.toLowerCase(),
      })
    }
  }
  return potentialChickens
}

const checkExpiry = () => {
  const expires = cache.age + ttl
  if (Date.now() > expires) {
    cache = undefined
  }
}

const setCache = (item) => {
  cache = {
    item,
    age: Date.now(),
  }
}

const getPotentialChickens = async () => {
  const { item } = cache
  if (item) {
    checkExpiry()
    return item
  }
  const rows = await getRows()
  const potentialChickens = adaptRows(rows)
  setCache(potentialChickens)
  return potentialChickens
}

module.exports = getPotentialChickens
