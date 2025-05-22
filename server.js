const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // instancia lista para usar
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register-user', async (req, res) => {
  const { idUser, cardBalance, numberTravelDiary, frequentSchedules, frequentRoutes } = req.body;

  const sql = `INSERT INTO users (idUser, cardBalance, numberTravelDiary, frequentSchedules, frequentRoutes)
               VALUES (?, ?, ?, ?, ?)`;

  try {
    await db.query(sql, [idUser, cardBalance, numberTravelDiary, frequentSchedules, frequentRoutes]);
    res.send('Usuario registrado con éxito');
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).send('Error al guardar en la base de datos');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
