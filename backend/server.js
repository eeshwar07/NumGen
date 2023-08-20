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

  host: "bbvpb4gk3aa40clvmb52-mysql.services.clever-cloud.com",
  user: "u0vnjsmilnrafu0h",
  password: "0V4c3bbMltneX57oBPkt",
  database: "bbvpb4gk3aa40clvmb52",
});

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.post("/api/numgen", (request, response) => {
  const result = request.body.number;
  console.log(request.body);
  const query1 = "SELECT * FROM numgen WHERE RandomNum = ?";

  db.query(query1, [result], (err, res) => {
    console.log(err);
    console.log(res);
    if (res == "") {
      response.send({ message: "Number selection successful.", status: 1 });
    }
    if (res != "") {
      response.send({
        message: "Number already taken, please generate another number.",
        status: 0,
      });
    }
  });
});

app.post("/api/send", (request, response) => {
  const randomNumbers = [];
  for (let i = 0; i < 100000; i++) {
    const random_number = Math.floor(Math.random() * 900000) + 100000;
    randomNumbers.push([random_number]);
  }

  const sql = "INSERT INTO numgen (RandomNum) VALUES ?";
  db.query(sql, [randomNumbers], (err, result) => {
    if (err) {
      console.error("Error inserting random numbers: " + err);
      res.status(500).send("Error inserting random numbers.");
      return;
    }
  });
});

app.post("/api/savedata", (request, response) => {
  const result = request.body.result;
  // const result = 9999;
  const que = "INSERT INTO numgen (RandomNum) VALUES (?)";
  db.query(que, [result], (err, res) => {
    if (err) {
      console.log(err);
      response.send({
        message: "Some error occured.....",
        status: 0,
      });
    } else {
      console.log(res);
      response.send({
        message: "Number selection successful.",
        status: 1,
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});
