import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { buildSchema } from "graphql";

const schema = buildSchema(`type Query { hello: String } `);

const root = {
  hello() {
    return "Hello world!";
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue: root }));

app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.info("Server is running at http://localhost:4000");
});
