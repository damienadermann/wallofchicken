const seedrandom = require("seedrandom")

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
const AU_TIMEZONE_OFFSET_MILLISECONDS = -10 * 60 * 60 * 1000

function daysSinceEpoch(dayIndex) {
  const now = new Date()
  const daysSinceEpoch = Math.floor(
    (now.getTime() - AU_TIMEZONE_OFFSET_MILLISECONDS) / MILLISECONDS_IN_A_DAY
  )
  const epochDayOfTheWeek = (daysSinceEpoch - 3) % 7
  const movement = dayIndex ? (7 + dayIndex - epochDayOfTheWeek) % 7 : 0
  return daysSinceEpoch + movement
}

function getChickens(potentialChickens, dayIndex, team) {
  const seed = daysSinceEpoch(dayIndex)
  const rng = seedrandom(seed * 1e5)

  return potentialChickens
    .filter(
      (x) =>
        !team || x.team.toLowerCase() === team.toLowerCase() || "elements" === team.toLowerCase()
    )
    .map((x) => [rng(), x])
    .sort(([a, _a], [b, _b]) => (a > b ? 1 : -1))
    .map(([_, x]) => x)
    .slice(0, 5)
}

module.exports = getChickens
