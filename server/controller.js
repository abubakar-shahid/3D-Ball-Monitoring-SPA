import pool from './database.js';

async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
}

getNotes().then(notes => {
    console.log(notes);
}).catch(err => {
    console.error('Error fetching notes:', err);
});
