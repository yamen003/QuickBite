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
let db;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db("guests");
    }
    return db;
}

async function createUser(newUser) {
    const result = await db.collection("guests").insertOne(newUser);
    console.log(`New user with id: ${result.insertedId}`);
    return result;
}

async function findUserByEmail(email) {
    const result = await db.collection("guests").findOne({ email });
    return result;
}

async function findUserByEmailAndPassword(email, password) {
    const result = await db.collection("guests").findOne({ email, password });
    return result;
}

app.post('/api/signup', async (req, res) => {
    console.log('Received signup request');
    const { name, email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const result = await createUser({ name, email, password, cart: [] });
        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (e) {
        console.error('Error in /api/signup:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    console.log('Received login request');
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const user = await findUserByEmailAndPassword(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = { 
            email: user.email, 
            name: user.name, 
            cart: user.cart 
        };
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '20m' });

        res.status(200).json({ message: 'Login successful', token, name: user.name });
    } catch (e) {
        console.error('Error in /api/login:', e);
        res.status(500).json({ message: 'Internal server error' });
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
        const db = await connectToDatabase();
        const user = await findUserByEmail(email);
        if (user) {
            res.status(200).json({ nameuser: user.name, emailuser: user.email });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        console.error('Error in /api/user:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch user cart
app.get('/api/cart', verifyToken, async (req, res) => {
    const email = req.user.email;

    try {
        const db = await connectToDatabase();
        const user = await findUserByEmail(email);
        if (user) {
            res.status(200).json({ cart: user.cart });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        console.error('Error in /api/cart:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/cart', verifyToken, async (req, res) => {
    const email = req.user.email;
    const { cart } = req.body;

    try {
        const db = await connectToDatabase();
        const result = await db.collection("guests").updateOne(
            { email: email },
            { $set: { cart: cart } } // Update the user's cart
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Cart updated successfully' });
        } else {
            res.status(400).json({ message: 'Failed to update cart' });
        }
    } catch (e) {
        console.error('Error in /api/cart:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/cart', verifyToken, async (req, res) => {
    console.log('Received request to clear entire cart');
    const email = req.user.email;

    try {
        const db = await connectToDatabase();
        const result = await db.collection("guests").updateOne(
            { email: email },
            { $set: { cart: [] } }  // Clear the cart
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Cart cleared successfully' });
        } else {
            res.status(400).json({ message: 'Failed to clear cart' });
        }
    } catch (e) {
        console.error('Error in /api/cart:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectToDatabase();  // Ensure the database is connected when the server starts
});
