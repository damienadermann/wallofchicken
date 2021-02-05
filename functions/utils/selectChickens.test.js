const selectChickens = require("./selectChickens")

const potentialChickens = [
  { id: "1", name: "person1", team: "TEAMA" },
  { id: "2", name: "person2", team: "TEAMA" },
  { id: "3", name: "person3", team: "TEAMA" },
  { id: "4", name: "person4", team: "TEAMB" },
  { id: "5", name: "person5", team: "TEAMB" },
  { id: "6", name: "person6", team: "TEAMB" },
]

const TODAY = undefined
const MONDAY = 1
const WEDNESDAY = 3

describe("selectChickens", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern")
  })
  describe("monday", () => {
    it("selects a random chicken based the day", () => {
      jest.setSystemTime(new Date("2021-02-15").getTime())
      expect(selectChickens(potentialChickens, TODAY, "teama")).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "3",
            "name": "person3",
            "team": "TEAMA",
          },
          Object {
            "id": "1",
            "name": "person1",
            "team": "TEAMA",
          },
          Object {
            "id": "2",
            "name": "person2",
            "team": "TEAMA",
          },
        ]
      `)
    })

    it("selects a random chicken based the future day", () => {
      jest.setSystemTime(new Date("2021-02-14").getTime())
      expect(selectChickens(potentialChickens, MONDAY, "teama")).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "3",
            "name": "person3",
            "team": "TEAMA",
          },
          Object {
            "id": "1",
            "name": "person1",
            "team": "TEAMA",
          },
          Object {
            "id": "2",
            "name": "person2",
            "team": "TEAMA",
          },
        ]
      `)
    })

    it("they match", () => {
      jest.setSystemTime(new Date("2021-02-15").getTime())
      const result1 = selectChickens(potentialChickens, TODAY, "teama")
      jest.setSystemTime(new Date("2021-02-14").getTime())
      const result2 = selectChickens(potentialChickens, MONDAY, "teama")
      expect(result1).toEqual(result2)
    })
  })

  describe("wednesday", () => {
    it("selects a random chicken based the day", () => {
      jest.setSystemTime(new Date("2021-02-17").getTime())
      expect(selectChickens(potentialChickens, TODAY, "teama")).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "3",
            "name": "person3",
            "team": "TEAMA",
          },
          Object {
            "id": "2",
            "name": "person2",
            "team": "TEAMA",
          },
          Object {
            "id": "1",
            "name": "person1",
            "team": "TEAMA",
          },
        ]
      `)
    })

    it("selects a random chicken based the future day", () => {
      jest.setSystemTime(new Date("2021-02-15").getTime())
      expect(selectChickens(potentialChickens, WEDNESDAY, "teama")).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "3",
            "name": "person3",
            "team": "TEAMA",
          },
          Object {
            "id": "2",
            "name": "person2",
            "team": "TEAMA",
          },
          Object {
            "id": "1",
            "name": "person1",
            "team": "TEAMA",
          },
        ]
      `)
    })

    it("they match", () => {
      jest.setSystemTime(new Date("2021-02-17").getTime())
      const result1 = selectChickens(potentialChickens, TODAY, "teama")
      jest.setSystemTime(new Date("2021-02-15").getTime())
      const result2 = selectChickens(potentialChickens, WEDNESDAY, "teama")
      expect(result1).toEqual(result2)
    })
  })
})
