const seedrandom = require("seedrandom")

function getChickens(potentialChickens, seed, team) {
  const rng = seedrandom(seed)
  return potentialChickens
    .sort((a, b) => a.id.localeCompare(b.id))
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
