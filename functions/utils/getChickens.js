const seedrandom = require("seedrandom")

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
const AU_TIMEZONE_OFFSET_MILLISECONDS = -10 * 60 * 60 * 1000

function daysSinceEpoch(day) {
  const now = new Date()
  const daysSinceEpoch = Math.floor(
    (now.getTime() - AU_TIMEZONE_OFFSET_MILLISECONDS) / MILLISECONDS_IN_A_DAY
  )
  const epochDayOfTheWeek = (daysSinceEpoch - 3) % 7
  const movement = day ? (7 + day - epochDayOfTheWeek) % 7 : 0
  return daysSinceEpoch + movement
}

const potentialChickens = [
  { id: "U027CLUME", name: "gstamp", team: "mercury" },
  { id: "U02DERN4E", name: "khayman", team: "artemis" },
  { id: "U0274DF37", name: "asellitt", team: "artemis" },
  { id: "U44G2GD4M", name: "Heidi.k", team: "discover" },
  { id: "U07271PS5", name: "prasanna.joshi", team: "discover" },
  { id: "U0G1LM222", name: "stacey" , team: "athena"},
  { id: "U1SG7A284", name: "bakes", team: "mercury" },
  { id: "UDWHM1JTZ", name: "riana.ferreira", team: "artemis" },
  { id: "U02PS4KKA", name: "bordo", team: "discover" },
  { id: "U5G7D3MK7", name: "grant.tibbey", team: "gemini" },
  { id: "UDWR5TJLR", name: "ali.graham", team: "gemini" },
  { id: "UEAR25K88", name: "amanda.varella", team: "artemis" },
  { id: "UF72FC073", name: "Viv", team: "discover" },
  { id: "U025K202K", name: "notahat", team: "mercury" },
  { id: "U9NRV08SZ", name: "daniel.budden", team: "athena" },
  { id: "U639C9S0H", name: "oliver.diestel", team: "athena" },
  { id: "UDJU1AL0K", name: "zoltan.toth", team: "athena" },
  { id: "U8G3NFUMD", name: "emily.koop", team: "athena"  },
  { id: "U0F58P3DJ", name: "fraserxu", team: "discover" },
  { id: "U0286USDZ", name: "riley", team: "experience" },
  { id: "U0K8Z1KD1", name: "kelle", team: "experience" },
  { id: "UFM0UL2GG", name: "claire.grooby", team: "experience" },
  { id: "U029C4B5Z", name: "mario", team: "experience" },
  { id: "UGWEUTNH5", name: "Izzy", team: "experience" },
  { id: "U15HUNCRJ", name: "Sam McKenna (Tue-Fri)", team: "experience" },
  { id: "UCU3DM9C1", name: "madlep", team: "discover" }
]

function getChickens(day, team) {
  const seed = daysSinceEpoch(day)
  const rng = seedrandom(seed * 1e5)

  return potentialChickens
    .filter(x => !team || x.team === team.toLowerCase() || "elements" === team.toLowerCase())
    .map(x => [rng(), x])
    .sort(([a, _a], [b, _b]) => (a > b ? 1 : -1))
    .map(([_, x]) => x)
    .slice(0, 5)
}

module.exports = getChickens
