const API_KEY = 'LAr7dQkmkuz0us0JdiTYwljfrTEDzNUN';
// ARRAY con los ID gifs [lechuga, cebolla, tomate, espinaca, coliflor, calabacin, olivas, soja, girasol, aguacate]
const query = ['hPcRM5Hr5F1xm', 'zRlOz8XKLe7qo', 'WW9DU2lEykWXe', '56jPgVn17BDiAq1UrS', '2js6hegB3hwtXAlkOJ', '89sIi77nGsdnq', 'YPsnKQK6cvcB2G7iLs', 'kf4SXNzSfiAiQ',  'efrkrsYaJw0nJB6HBV','h7uPUKaftYTKd1AiBB']; // Lo que quieras buscar, ej: 'plant celebration'
const URL = `https://api.giphy.com/v1/gifs/${query[9]}?api_key=${API_KEY}&rating=g`;

async function obtenerGif() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const gifURL = data.data.images.original.url;
    // console.log(data);

    document.getElementById('gif').innerHTML = `
      <img src="${gifURL}" alt="Celebration gif" style="max-width: 300px">
    `;
  } catch (error) {
    console.error('Error al obtener el gif:', error);
  }
}

obtenerGif();
