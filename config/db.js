const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // change if needed
    password: "MyRoot-031606",  // change if needed
    database: "thai_restaurant"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

module.exports = db;
