const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;
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
    });

    app.patch("/addtask/:id", async (req, res) => {
      const id = req.params.id;
      const updateTaskStatus = req.body;
      // console.log("body", updateTaskStatus);
      // console.log("id", id);
      const filter = { _id: ObjectId(id) };
      const taskStatus = updateTaskStatus.taskStatus;

      const updatedDoc = {
        $set: {
          taskStatus: taskStatus,
        },
      };

      const updatedTaskStatus = await taskCollection.updateOne(
        filter,
        updatedDoc
      );
      //console.log("updatedTaskStatus", updatedTaskStatus);
      res.send(updatedTaskStatus);
    });

    app.patch("/addtask/edit/:id", async (req, res) => {
      const id = req.params.id;
      const updateTask = req.body;
      console.log("body", updateTask);
      console.log("id", id);
      const filter = { _id: ObjectId(id) };
      const taskDescription = updateTask.taskDescription;

      const updatedDoc = {
        $set: {
          taskDescription: taskDescription,
        },
      };
      const updatedTask = await taskCollection.updateOne(filter, updatedDoc);
      console.log("updatedTaskStatus", updatedTask);
      res.send(updatedTask);
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
