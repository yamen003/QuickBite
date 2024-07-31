import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const { json } = pkg;
const app = express();
const port = process.env.PORT || 5000;
const secretKey = 'ayo_key_yamen_kekekekek';

const uri = "mongodb+srv://yamenouannes123:Uj63En9Sh8g3d5a3@cluster0.phdvzbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());

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
        console.error('Error in /api/signup:', e);
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

        const token = jwt.sign({ email: user.email, name: user.name }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, name: user.name });
    } catch (e) {
        console.error('Error in /api/login:', e);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}

app.get('/api/user', verifyToken, async (req, res) => {
    const email = req.user.email;

    try {
        await client.connect();
        const user = await findUserByEmail(client, email);
        if (user) {
            res.status(200).json({ name: user.name });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        console.error('Error in /api/user:', e);
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
