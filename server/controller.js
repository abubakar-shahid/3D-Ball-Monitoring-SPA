import pool from './database.js';

export async function getNotes(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM notes");
        res.json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createNote(req, res) {
    // Controller logic for creating a note
}

export async function updateNote(req, res) {
    // Controller logic for updating a note
}

export async function deleteNote(req, res) {
    // Controller logic for deleting a note
}
