const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize Express
const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'event_management',
    password: 'Radhika@1980',
    port: 5432,
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse incoming JSON requests
app.use(bodyParser.json());

// API to create a new event
app.post('/api/events', async (req, res) => {
    const { name, date, location } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO events (name, date, location) VALUES ($1, $2, $3) RETURNING *`,
            [name, date, location]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to retrieve all events
app.get('/api/events', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM events ORDER BY created_at DESC`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
