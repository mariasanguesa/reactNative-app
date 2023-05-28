const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

// Ruta de ejemplo para obtener la información de un restaurante
app.get('/restaurantes', async (req, res) => {

  try {
    // Realizar la petición a la API de Yelp
    const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=Nueva+España%2C+Madrid`, {
      headers: {
        Authorization: 'Bearer IXsuXNr31QgsAUZ3ZggY-UE55uTKt8LBTVC9SIT_mA3U6hqKfHkkDb83SBUl6-aMqD1W1io794rL0jO-RjSySQiA5BlYIkPfTIDjahxwCcjX5fNZp7SoqN31UTVuZHYx',
        'Content-Type': 'application/json',
      },
    });

    // Obtener los datos de respuesta de la API de Yelp
    const restauranteData = response.data;

    // Devolver los datos del restaurante como respuesta
    res.json(restauranteData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del restaurante' });
  }
});

app.get('/restaurantes/:restauranteId', async (req, res) => {
  const { restauranteId } = req.params;
  try {
    // Realizar la petición a la API de Yelp
    const response = await axios.get(`https://api.yelp.com/v3/businesses/${restauranteId}`, {
      headers: {
        Authorization: 'Bearer IXsuXNr31QgsAUZ3ZggY-UE55uTKt8LBTVC9SIT_mA3U6hqKfHkkDb83SBUl6-aMqD1W1io794rL0jO-RjSySQiA5BlYIkPfTIDjahxwCcjX5fNZp7SoqN31UTVuZHYx',
        'Content-Type': 'application/json',
      },
    });

    // Obtener los datos de respuesta de la API de Yelp
    const restauranteData = response.data;

    // Devolver los datos del restaurante como respuesta
    res.json(restauranteData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del restaurante' });
  }
});

app.get('/reviews/:restauranteId', async (req, res) => {
  const { restauranteId } = req.params;

  try {
    const response = await axios.get(`https://api.yelp.com/v3/businesses/${restauranteId}/reviews`, {
      headers: {
        Authorization: 'Bearer IXsuXNr31QgsAUZ3ZggY-UE55uTKt8LBTVC9SIT_mA3U6hqKfHkkDb83SBUl6-aMqD1W1io794rL0jO-RjSySQiA5BlYIkPfTIDjahxwCcjX5fNZp7SoqN31UTVuZHYx',
        'Content-Type': 'application/json',
      },
    });

    const reseniasData = response.data;

    res.json(reseniasData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reseñas del restaurante' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
