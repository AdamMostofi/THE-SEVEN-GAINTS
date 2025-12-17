import express from 'express';
import mysql from 'mysql2/promise'; // Using the promise-based version
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to read JSON data from the client

// --- Database Connection ---
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check database connection on startup
async function checkDbConnection() {
    try {
        await pool.getConnection();
        console.log('✅ Connected successfully to MySQL database!');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error);
        // Exit process if DB connection fails
        process.exit(1); 
    }
}
checkDbConnection();


// --- Root API Endpoint ---
app.get('/', (req, res) => {
    res.send('Mountain Explorer API is running!');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
});

// index.js (add this block before app.listen)

// GET /api/mountains - Get a list of all mountains
app.get('/api/mountains', async (req, res) => {
    try {
        // Query to select all data from the mountains table
        const [rows] = await pool.query('SELECT name, height, country, link_slug, image_url FROM mountains ORDER BY height DESC');
        
        // rows will be an array of mountain objects
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching mountains:", error);
        res.status(500).json({ message: "Failed to retrieve mountain list." });
    }
});

// index.js - Updated GET /api/mountains

// GET /api/mountains - Get a list of all mountains
app.get('/api/mountains', async (req, res) => {
    try {
        // We include 'id' so the frontend can create dynamic links like /mountains/1, /mountains/2
        const query = `
            SELECT id, name, height, country, summary, image_url 
            FROM mountains 
            ORDER BY height DESC
        `;
        const [rows] = await pool.query(query);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching mountains:", error);
        res.status(500).json({ message: "Failed to retrieve mountain list." });
    }
});

// index.js - Updated GET /api/mountains/:id

// GET /api/mountains/:id - Get details for a specific mountain
app.get('/api/mountains/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Query to select all fields for the mountain matching the ID
        const [rows] = await pool.query('SELECT * FROM mountains WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mountain not found.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(`Error fetching mountain ${id}:`, error);
        res.status(500).json({ message: "Failed to retrieve mountain details." });
    }
});

// index.js - New GET /api/products endpoint

// GET /api/products - Get all recommended products grouped by mountain
app.get('/api/products', async (req, res) => {
    try {
        // Select all relevant fields from products and the mountain name
        const query = `
            SELECT 
                p.id, 
                p.name AS product_name, 
                p.category, 
                p.price, 
                p.link, 
                p.image_url AS product_image_url,
                m.name AS mountain_name,
                m.id AS mountain_id
            FROM products p
            JOIN mountains m ON p.mountain_id = m.id
            ORDER BY m.height DESC, p.category
        `;
        const [rows] = await pool.query(query);

        // Group the products by mountain for easier rendering on the recommended page
        const productsByMountain = rows.reduce((acc, product) => {
            const { mountain_name, mountain_id, ...productDetails } = product;
            if (!acc[mountain_id]) {
                acc[mountain_id] = {
                    mountain_id,
                    mountain_name,
                    products: []
                };
            }
            acc[mountain_id].products.push(productDetails);
            return acc;
        }, {});

        res.status(200).json(Object.values(productsByMountain));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to retrieve product list." });
    }
});