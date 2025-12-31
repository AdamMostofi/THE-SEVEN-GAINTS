import "dotenv/config"; // This must stay at the very top line
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;


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
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mountainsdb",
  port: process.env.DB_PORT || 3306, // Good for cloud DBs
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check database connection on startup
async function checkDbConnection() {
  try {
    await pool.getConnection();
    console.log("✅ Connected successfully to MySQL database!");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
}
checkDbConnection();

// --- API ROUTES ---

//  Root Endpoint
app.get("/", (req, res) => {
  res.send("Mountain Explorer API is running!");
});

//  GET all Mountains (For Home Page Timeline)
app.get("/api/mountains", async (req, res) => {
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

//  GET a single Mountain (For Details Page)
app.get("/api/mountains/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM mountains WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Mountain not found." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`Error fetching mountain ${id}:`, error);
    res.status(500).json({ message: "Failed to retrieve mountain details." });
  }
});

//  GET all Products (For Recommended Page)
app.get("/api/products", async (req, res) => {
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
//  SIGNUP: Create a new user (CRUD: Create)
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email already exists." });
  }
});

//  LOGIN: Verify user (CRUD: Read)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      res.status(200).json({ message: "Welcome back!", user: rows[0] });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//  CONTACT: Save message linked to user (Related Entities)
app.post("/api/contact", async (req, res) => {
  const { userId, message } = req.body;
  try {
    await pool.query(
      "INSERT INTO user_messages (user_id, message) VALUES (?, ?)",
      [userId, message]
    );
    res
      .status(200)
      .json({ message: "Your message has been saved to your account!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not save message." });
  }
});

// ADMIN ROUTE: Fetch all messages with User details
app.get("/api/admin/messages", async (req, res) => {
  try {
    const sql = `
            SELECT user_messages.id, user_messages.message, user_messages.created_at, 
                   users.username, users.email 
            FROM user_messages 
            JOIN users ON user_messages.user_id = users.id
            ORDER BY user_messages.created_at DESC
        `;
    const [rows] = await pool.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages for admin." });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
