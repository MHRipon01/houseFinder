const express = require('express')
const app = express()
const cors = require('cors');
// const mongoose = require('mongoose');
app.use(express.json())
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000
require("dotenv").config();
const jwt = require('jsonwebtoken');
app.use(cors()); 

app.use(bodyParser.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sarjove.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

 
const userCollection = client.db('houseFinder').collection('user')
const houseCollection = client.db('houseFinder').collection('house')
 
// require('./userDetails');
// const User = mongoose.model("UserInfo")
// const jwt = require('jsonwebtoken');

app.post('/register', async (req, res) => {
  const userInfo = req.body;
  const email = req.body.email;

  try {
    // Check if the email already exists
    const existingUser = await userCollection.findOne({ email: email });

    if (existingUser) {
      return res.json({ status: 409, message: 'Email already exists. Please use a unique email.' });
    }

    // If the email doesn't exist, proceed with registration
    const result = await userCollection.insertOne(userInfo);
    const usersData = await userCollection.findOne({email:email});

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ userId: result.insertedId, email: userInfo.email }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });

    res.status(201).json({ status: 201, message: 'Registration successful', token , usersData });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
});

app.get('/user/:email' , async(req,res) =>{
  const email = req.params.email;
  const result = await userCollection.findOne({email:email})
  console.log(result);
  res.send(result)
})

app.get('/houses' , async(req,res) => {
const result = await houseCollection.find().toArray()
 
res.send(result)
})


app.post('/login', async(req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the provided email
  
    try {  // const user = users.find(u => u.email === email);
  const user = await userCollection.findOne({email:email})
    if (!user || user.password !== password) {
      return res.json({ error: 'Invalid email or password' });
    }
  
    // User is authenticated, generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });
    res.status(201).json({ token, email });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});















//___________________________________________________________________________
app.listen(port , () =>{
    console.log(`Server started on port: ${port}`)
})
app.get('/', (req,res) =>{
    res.send('houseFinder is searching your house in the sky 😂')
})