const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5yq7o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("manage_tasks").collection("tasks");

    app.post("/addtask", async (req, res) => {
      const taskadded = req.body;
      console.log(taskadded);
      const result = await taskCollection.insertOne(taskadded);
      res.send(result);
    });

    app.get("/addtask", async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks);
      console.log(tasks);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome to task manager app!");
});

app.listen(port, () => {
  console.log(`Take manger app listening on port ${port}`);
});
