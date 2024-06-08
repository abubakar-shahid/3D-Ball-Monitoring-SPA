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
        res.status(200).json(resData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getUserInfo(req, res) {
    try {
        const [userInfo] = await pool.query(`SELECT * FROM users where id = ?`, [req.body.id]);
        const [ballInfo] = await pool.query(`SELECT * FROM ballinformation where username = ?`, [userInfo[0].username]);
        if (userInfo.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const resData = {
                message: "User Found!",
                username: userInfo[0].username,
                password: userInfo[0].password,
                x: ballInfo[0].x_coordinate,
                y: ballInfo[0].y_coordinate,
                z: ballInfo[0].z_coordinate
            };
            res.status(200).json(resData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function saveState(req, res) {
    try {
        const [userInfo] = await pool.query(`SELECT username FROM users where id = ?`, [req.body.id]);
        const [ballInfo] = await pool.query(`
            UPDATE ballinformation
            SET x_coordinate = ?, y_coordinate = ?, z_coordinate = ?
            WHERE username = ?`,
            [req.body.x_coordinate, req.body.y_coordinate, req.body.z_coordinate, userInfo[0].username]
        );
        res.status(200).json({ message: "Ball State Updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
