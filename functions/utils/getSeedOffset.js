const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
const AU_TIMEZONE_OFFSET_MILLISECONDS = -10 * 60 * 60 * 1000

function daysSinceEpoch(time, dayIndex) {
  const daysSinceEpoch = Math.floor(
    (time.getTime() - AU_TIMEZONE_OFFSET_MILLISECONDS) / MILLISECONDS_IN_A_DAY
  )
  const epochDayOfTheWeek = (daysSinceEpoch - 3) % 7
  const movement = dayIndex ? (7 + dayIndex - epochDayOfTheWeek) % 7 : 0
  return daysSinceEpoch + movement
}

module.exports = function getSeedOffset(dayIndex) {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const seed = daysSinceEpoch(now, dayIndex)
  const base = daysSinceEpoch(start, undefined)
  const offset = seed - base - 1
  return offset
}
