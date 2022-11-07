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

      // GET
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
