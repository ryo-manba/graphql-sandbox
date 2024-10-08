var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")

var schema = buildSchema(/* GraphQL */`
  type Query {
    hello: String
  }
`)

// Define the root resolver
var root = {
  hello() {
    return "Hello world!"
  }
}

var app = express()

// Handle GET requests to the root path "/"
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Handle requests to the "/graphql" endpoint
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")