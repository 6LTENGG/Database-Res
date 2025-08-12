const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // <--- change if needed
  password: 'MyRoot-031606',        // <--- change if needed
  database: 'thai_restaurant'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ MySQL connected');
});

module.exports = db;
