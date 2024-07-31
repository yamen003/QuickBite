import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://yamenouannes123:Uj63En9Sh8g3d5a3@cluster0.phdvzbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

async function createListing(client, newListing) {
    const result = await client.db("guests").collection("guests").insertOne(newListing);
    console.log(`New listing with id: ${result.insertedId}`);
    return result;
}

async function findUserByEmail(client, email) {
    const result = await client.db("guests").collection("guests").findOne({ email });
    return result;
}

async function findUserByEmailAndPassword(client, email, password) {
    const result = await client.db("guests").collection("guests").findOne({ email, password });
    return result;
}

app.post('/api/signup', async (req, res) => {
    console.log('Received signup request');
    const { name, email, password } = req.body;

    try {
        await client.connect();

        const existingUser = await findUserByEmail(client, email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const result = await createListing(client, { name, email, password });
        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.post('/api/login', async (req, res) => {
    console.log('Received login request');
    const { email, password } = req.body;

    try {
        await client.connect();

        const user = await findUserByEmailAndPassword(client, email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
