const { ApolloServer, gql } = require("apollo-server-lambda")
const selectChickens = require("./utils/selectChickens")
const getPotentialChickens = require("./utils/getPotentialChickens")

const typeDefs = gql`
  type Chicken {
    id: String!
    name: String!
  }
  enum WeekDays {
    TODAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
  }

  enum Team {
    Elements
    Artemis
    Attract
    Discover
    Gemini
    Mercury
    Experience
  }

  type Query {
    chickens(day: WeekDays, team: Team): [Chicken!]
  }
`

function whichDay(day) {
  switch (day) {
    case "MONDAY":
      return 1
    case "TUESDAY":
      return 2
    case "WEDNESDAY":
      return 3
    case "THURSDAY":
      return 4
    case "FRIDAY":
      return 5
    default:
      return undefined
  }
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    chickens: async (parent, args) => {
      const { day, team } = args
      const dayIndex = whichDay(day)
      const potentialChickens = await getPotentialChickens()
      return selectChickens(potentialChickens, dayIndex, team)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    allowedHeaders: "*",
  },
})
