import pool from './database.js';

export async function createUser(req, res) {
    try {
        const [dbResponse1] = await pool.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [req.body.username, req.body.email, req.body.password]
        );
        const [dbResponse2] = await pool.query(
            `INSERT INTO ballinformation (username, x_coordinate, y_coordinate, z_coordinate)
            VALUES (?, ?, ?, ?)`,
            [req.body.username, '0', '0', '0']
        );
        const resData = {
            message: "Data Inserted Successfully!",
            id: dbResponse1.insertId
        };
        res.json(resData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getUser(req, res) {
    
}

export async function saveState(req, res) {
    
}

export async function getState(req, res) {
    
}
