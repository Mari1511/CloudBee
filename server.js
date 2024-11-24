const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Inicializar la base de datos
const db = new sqlite3.Database('contratos.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos.');
});

// Configurar Multer para la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            return cb(new Error('Solo se permiten archivos PDF'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limitar a 5MB
});

// Endpoint para subir archivos
app.post('/upload', upload.single('pdf'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    const { filename, path: filepath } = req.file;
    const sql = 'INSERT INTO contratos (filename, filepath) VALUES (?, ?)';
    db.run(sql, [filename, filepath], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, filename, filepath });
    });
});

// Endpoint para obtener todos los contratos
app.get('/contratos', (req, res) => {
    const sql = 'SELECT * FROM contratos';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint para eliminar un contrato
app.delete('/contratos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contratos WHERE id = ?';
    db.run(sql, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send('Contrato no encontrado');
        }
        res.send('Contrato eliminado');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});