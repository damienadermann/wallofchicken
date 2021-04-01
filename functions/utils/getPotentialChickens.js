const { GoogleSpreadsheet } = require("google-spreadsheet")

const ttl = 1000 * 60 * 2
let cache

const getRowsAndRandoms = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n\\n/g, "\n"),
  })
  await doc.loadInfo()
  const chickenSheet = doc.sheetsByIndex[0]
  const chickenRows = await chickenSheet.getRows()
  const randomsSheet = doc.sheetsByIndex[1]
  const randomsRows = await randomsSheet.getRows()
  return [chickenRows, randomsRows]
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

const adaptRandoms = (rows) => {
  const seeds = []
  for (const row of rows) {
    seeds.push(row.seed)
  }
  return seeds
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
  const { item } = cache || {}
  if (item) {
    checkExpiry()
    return item
  }
  const [rows, randoms] = await getRowsAndRandoms()
  const potentialChickens = adaptRows(rows)
  const seeds = adaptRandoms(randoms)
  const newItem = { potentialChickens, seeds }
  setCache(newItem)
  return newItem
}

module.exports = getPotentialChickens
