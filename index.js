import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { buildSchema } from "graphql";
import fs from "fs";

const schemaString = fs.readFileSync("schema.graphql", "utf8");
const schema = buildSchema(schemaString);

const resolvers = {
  hello() {
    return "Hello world!";
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue: resolvers }));

app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.info("Server is running at http://localhost:4000");
});
