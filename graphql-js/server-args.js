var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")

var schema = buildSchema(/* GraphQL */`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

var root = {
  rollDice({ numDice, numSides }) {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  }
}

var app = express()
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/graphql")
