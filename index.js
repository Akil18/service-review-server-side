const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 5000 || process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nvyyp05.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverApi: ServerApiVersion.v1,
});

async function run() {
   try {
      const servicesCollection = client.db("schemeCtg").collection("services");
      const usersCollection = client.db("schemeCtg").collection("users");
      const reviewsCollection = client.db("schemeCtg").collection("reviews");

      // GET
      app.get("/servicesinHome", async (req, res) => {
         const query = {};
         const cursor = servicesCollection.find(query).limit(3);
         const services = await cursor.toArray();
         res.send(services);
      });

      app.get("/services", async (req, res) => {
         const query = {};
         const cursor = servicesCollection.find(query);
         const services = await cursor.toArray();
         res.send(services);
      });

      app.get("/services/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         console.log(query);
         const service = await servicesCollection.findOne(query);
         res.send(service);
      });

      app.get("/users", async (req, res) => {
         const query = {};
         const cursor = usersCollection.find(query);
         const users = await cursor.toArray();
         res.send(users);
      });

      app.get("/reviews", async (req, res) => {
         const query = {};
         const cursor = reviewsCollection.find(query);
         const reviews = await cursor.toArray();
         res.send(reviews);
      });

      // POST
      app.post("/users", async (req, res) => {
         const user = req.body;
         const result = await usersCollection.insertOne(user);
         res.send(result);
      });

      app.post("/reviews", async (req, res) => {
         const review = req.body;
         const result = await reviewsCollection.insertOne(review);
         res.send(result);
      });
   } finally {
   }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
   res.send("server is up");
});

app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
