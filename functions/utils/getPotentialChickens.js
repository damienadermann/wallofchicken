const { GoogleSpreadsheet } = require("google-spreadsheet")

const ttl = 1000 * 60 * 2
let cache

const getPotentialChickens = async () => {
  if (cache) {
    const potentialChickens = cache.item
    const expires = cache.age + ttl
    if (Date.now() > expires) {
      cache = undefined
    }
    return potentialChickens
  }
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()

  const potentialChickens = []
  for (const row of rows) {
    if (row.enabled === "TRUE") {
      potentialChickens.push({
        name: row.slackName,
        id: row.slackId,
        team: row.team,
      })
    }
  }
  cache = {
    item: potentialChickens,
    age: Date.now(),
  }
  return potentialChickens
}

module.exports = getPotentialChickens
