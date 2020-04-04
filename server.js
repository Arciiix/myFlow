const express = require("express");
const app = express();
const port = 2353;

//Database
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.db", (err) => {
  if (err) {
    console.log(
      `[${formatDate(
        new Date()
      )}] Error while connecting to the database: ${err}`
    );
  } else {
    console.log(`[${formatDate(new Date())}] Connected to the database`);
  }
});

//Static directory
app.use(express.static("../myFlow"));

app.get("/", (req, res, next) => {
  res.sendFile(`index.html`);
});

app.get("/data", async (req, res, next) => {
  //Get data from database
  let data = await getData();
  //Send only contents of messages
  let formatted = data.map((e) => e.content);
  res.send(formatted);
  console.log(`[${formatDate(new Date())}] Sent database data`);
});

app.get("/save", async (req, res, next) => {
  if (req.query.message) {
    await saveData(req.query.message);
    console.log(`[${formatDate(new Date())}] Added a row to the database`);
    res.status(201);
    res.send("");
  }
});

function getData() {
  let sql = `SELECT * FROM messages`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(
          `[${formatDate(
            new Date()
          )}] Error while getting data from database: ${err}`
        );
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function saveData(message) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (id, content, date) VALUES (?, ?, ?)`,
      [null, message, formatDate(new Date())],
      (err) => {
        if (err) {
          console.log(
            `[${formatDate(
              new Date()
            )}] Error while adding to the database: ${err}`
          );
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function formatDate(date) {
  return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()} ${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }.${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }.${date.getFullYear()}`;
}

app.listen(port, () =>
  console.log(`[${formatDate(new Date())}] App has started at port ${port}!`)
);
