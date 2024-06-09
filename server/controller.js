import pool from './database.js';

export function handleWebSocketMessages(ws, message) {
    console.log("in handleWebSocketMessages");
    const msg = JSON.parse(message);
    console.log("msg:", msg);

    switch (msg.type) {
        case 'createUser':
            handleCreateUser(ws, msg.data);
            break;
        case 'getUserInfo':
            handleGetUserInfo(ws, msg.data);
            break;
        case 'saveState':
            handleSaveState(ws, msg.data);
            break;
        default:
            ws.send(JSON.stringify({ message: 'Unknown message type' }));
            break;
    }
}

export async function handleCreateUser(ws, data) {
    try {
        const { username, email, password } = data;
        const [rows] = await pool.query('SELECT COUNT(*) AS userCount FROM users WHERE username = ? or  email = ?', [username, email]);
        const userCount = rows[0].userCount;
        if (userCount > 0) {
            ws.send(JSON.stringify({ type: "signUpResponse", message: "404" }));
        } else {
            const [dbResponse1] = await pool.query(
                `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
                [username, email, password]
            );
            const [dbResponse2] = await pool.query(
                `INSERT INTO ballinformation (username, x_coordinate, y_coordinate, z_coordinate)
            VALUES (?, ?, ?, ?)`,
                [username, '0', '0', '0']
            );
            const resData = {
                type: "signUpResponse",
                message: "200",
                username: username
            };
            ws.send(JSON.stringify(resData));
        }
    } catch (error) {
        console.error(error);
        ws.send(JSON.stringify({ message: 'Internal server error' }));
    }
}

export async function handleGetUserInfo(ws, data) {
    try {
        const { username, password } = data;
        const [rows] = await pool.query('SELECT COUNT(*) AS userCount FROM users WHERE username = ?', [username]);
        const userCount = rows[0].userCount;
        if (userCount === 0) {
            ws.send(JSON.stringify({ type: "loginResponse", message: "404" }));
        } else {
            const [userInfo] = await pool.query(`SELECT * FROM users where username = ?`, [username]);
            if (userInfo[0].password === password) {
                const [ballInfo] = await pool.query(`SELECT * FROM ballinformation where username = ?`, [username]);
                const resData = {
                    type: "loginResponse",
                    message: "200",
                    username: userInfo[0].username,
                    password: userInfo[0].password,
                    x: ballInfo[0].x_coordinate,
                    y: ballInfo[0].y_coordinate,
                    z: ballInfo[0].z_coordinate
                };
                ws.send(JSON.stringify(resData));
            } else {
                ws.send(JSON.stringify({ type: "loginResponse", message: "404" }));
            }
        }
    } catch (error) {
        console.error(error);
        ws.send(JSON.stringify({ message: 'Internal server error' }));
    }
}

export async function handleSaveState(ws, data) {
    try {
        console.log("in saveState");
        const { username, x, y, z } = data;
        const [userInfo] = await pool.query(`SELECT username FROM users where username = ?`, [username]);
        if (userInfo.length > 0) {
            await pool.query(`
                UPDATE ballinformation
                SET x_coordinate = ?, y_coordinate = ?, z_coordinate = ?
                WHERE username = ?`,
                [x, y, z, username]
            );
            ws.send(JSON.stringify({ message: "200" }));
        } else {
            ws.send(JSON.stringify({ message: "404" }));
        }
    } catch (error) {
        console.error(error);
        ws.send(JSON.stringify({ message: 'Internal server error' }));
    }
}
