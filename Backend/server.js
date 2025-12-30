import 'dotenv/config'; // This must stay at the very top line
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DEBUGGING LOGS ---
// This helps us see if the .env file is actually working
console.log("--- Checking Database Variables ---");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("----------------------------------");

// --- Database Connection Pool ---
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mountainsdb',
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
        console.error('❌ Failed to connect to database:', error.message);
        process.exit(1); 
    }
}
checkDbConnection();

// --- API ROUTES ---

// 1. Root Endpoint
app.get('/', (req, res) => {
    res.send('Mountain Explorer API is running!');
});

// 2. GET all Mountains (For Home Page Timeline)
app.get('/api/mountains', async (req, res) => {
    try {
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

// 3. GET a single Mountain (For Details Page)
app.get('/api/mountains/:id', async (req, res) => {
    const { id } = req.params;
    try {
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

// 4. GET all Products (For Recommended Page)
app.get('/api/products', async (req, res) => {
    try {
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

        // Grouping products by mountain
        const productsByMountain = rows.reduce((acc, product) => {
            const { mountain_name, mountain_id, ...productDetails } = product;
            if (!acc[mountain_id]) {
                acc[mountain_id] = { mountain_id, mountain_name, products: [] };
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
// --- CORRECT CONTACT ROUTE ---
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Log arrival in terminal
        console.log("📩 Submission received for:", name);

        // 2. The SQL Query (Matches your id, name, email, message, created_at structure)
        // Note: 'id' and 'created_at' are handled automatically by the DB
        const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
        
        await pool.query(sql, [name, email, message]);

        console.log("✅ Saved to database successfully.");
        res.status(200).json({ message: "Expedition inquiry saved successfully!" });

    } catch (error) {
        console.error("❌ DATABASE ERROR:", error.message);
        res.status(500).json({ error: "Failed to save to database." });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
});