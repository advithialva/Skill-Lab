const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://advithialva2004:advithi09@cluster0.ec1ejt0.mongodb.net/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));

// Define Author Schema
const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

const Author = mongoose.model("Author", authorSchema);

// Define Blog Schema
const blogSchema = new mongoose.Schema({
  title: String,
  blogContent: String,
  authorName: String
});

const Blog = mongoose.model("Blog", blogSchema);

// Insert data to database
app.post("/ins", async (req, res) => {
  try {
    const fdata = req.body.fdata;
    const author = new Author({
      name: fdata.authorName,
      email: fdata.authorEmail,
    });
    await author.save();
    fdata.author = author._id;
    const blog = new Blog(fdata);
    await blog.save();
    console.log("Inserted");
    res.status(202).send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting data");
  }
});

// Get data from database
app.get("/", async (req, res) => {
  try {
    const result = await Blog.find({}).populate('author');
    res.json(result);
  } catch (error) {
    res.status(400).send("Error fetching data");
  }
});

// Delete data
app.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    await Blog.deleteOne({ _id: id });
    console.log("Deleted");
    res.status(204).send("success");
  } catch (error) {
    console.log("Error deleting data");
    res.status(500).send("Error deleting data");
  }
});

// Get data for updating
app.post("/get", async (req, res) => {
  try {
    const id = req.body.id;
    const result = await Blog.findById(id).populate('author');
    res.json(result);
  } catch (error) {
    res.status(400).send("Error fetching data");
  }
});

// Update data
app.post("/update", async (req, res) => {
  try {
    const { id, title, content, authorName, authorEmail } = req.body;
    const author = new Author({
      name: authorName,
      email: authorEmail,
    });
    await author.save();
    const updatedData = {
      title,
      content,
      author: author._id,
    };
    await Blog.findByIdAndUpdate(id, updatedData);
    console.log("Updated");
    res.status(204).send("success");
  } catch (error) {
    console.log("Error updating data");
    res.status(500).send("Error updating data");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
