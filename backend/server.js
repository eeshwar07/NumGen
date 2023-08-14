const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const parser = require("body-parser");

const db = mysql.createPool({
  //   host: "db-mysql-numgen-do-user-14471510-0.b.db.ondigitalocean.com",
  //   user: "doadmin",
  //   password: "AVNS_qHSShVtgNPyeoku0JyA",
  //   database: "defaultdb",

  host: "localhost",
  user: "root",
  password: "",
  database: "num_gen",
});

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.post("/api/numgen", (request, response) => {
  const result = request.body.result;
  const query1 = "SELECT * FROM numgen WHERE RandomNum = ?";
  db.query(query1, [result], (err, res) => {
    if (res == "") {
      const query2 = "INSERT INTO numgen (RandomNum) VALUES (?) ";
      db.query(query2, [result], (err, res) => {
        response.send({ message: "Number selection successful.", status: 1 });
      });
    }
    if (res != "") {
      response.send({
        message: "Number already taken, please generate another number.",
        status: 0,
      });
    }
  });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
