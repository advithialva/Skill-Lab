const express = require("express");
const db = require("mongoose");
var cors = require("cors");
var ObjectId = require("mongodb").ObjectId;
const app = express();
app.use(express.json());
db.set("strictQuery", false);
app.use(cors());

// MongoDB Connection
db.connect("mongodb+srv://advithialva2004:advithi09@cluster0.ec1ejt0.mongodb.net/my_database", {
  useNewURLParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

var conn = db.connection;

//Insert data to database 

app.post("/ins", function (req, res) {
  const fdata = req.body.fdata;
  conn.collection("form_data").insertOne(fdata)
    .then(result => {
      console.log("inserted");
      res.status(202).send("success");
    })
    .catch(err => {
      console.log(err);
    });
});

//Get data from database

app.get("/", (req, res) => {
  conn
    .collection("form_data")
    .find({})
    .toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send("error fetching data");
    });
});

//Delete data
app.post("/delete", (req, res) => {
  console.log(req.body.id);
  let id = req.body.id;
  conn
    .collection("form_data")
    .deleteOne({ _id: ObjectId(id) })
    .then((err) => {
      if (err) {
        console.log("record not deleted");
      } else {
        console.log("deleted");
        res.status(204).send("success");
      }
    });
});

// get data for updated
app.post("/get", (req, res) => {
  let id = req.body.id;
  console.log(id);
  conn
    .collection("form_data")
    .find({ _id: ObjectId(id) })
    .toArray((err, result) => {
      if (err) res.status(400).send("error fetching data");
      res.json(result);
      console.log(result);
    });
});

//Update data
app.post("/update", (req, res) => {
  console.log(req.body);
  let id = req.body._id;
  let title = req.body.title;
  let content = req.body.content;
  let author = req.body.author;
  console.log(id);
  console.log(title);
  console.log(content);
  console.log(author);
  conn
    .collection("form_data")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { title: title, content: content, author: author } }
    )
    .then((err) => {
      if (err) {
        console.log("record not updateed");
        console.log(err);
      } else {
        console.log("updated");
        res.status(204).send("success");
      }
    });
});
