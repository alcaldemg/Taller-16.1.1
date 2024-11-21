document.addEventListener('DOMContentLoaded', function () {

  const resultsContainer = document.getElementById('scrollContainer'); // Definimos la variable aquí

  document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value.trim();

    if (query) {
      const url = `https://openlibrary.org/search.json?q=${query}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Verifica que los datos se están recibiendo
            displayResults(data.docs);         
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Hubo un error al realizar la búsqueda.');
        });
    } else {
      alert('Por favor, ingresa un texto para buscar.');
    }
  });

  // Definir la función displayResults correctamente antes de llamarla
  function displayResults(items) {
    // Verificamos que el contenedor existe antes de manipularlo
    if (!resultsContainer) {
      console.error('No se encontró el contenedor de resultados.');
      return;
    }

    // Limpiar resultados anteriores
    resultsContainer.innerHTML = '';

    // Si no hay resultados, mostrar un mensaje
    if (items.length === 0) {
      resultsContainer.innerHTML = ' <div class="text-center container"> <h5 class="card-title" text-center> No se encontraron resultados </h5> </div>' ;
      resultsContainer.style.display = 'block'; // Muestra el contenedor vacío con el mensaje
      return;
    }

    // Crear la fila para las tarjetas
    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-3 g-4';

    // Recorrer los elementos recibidos
    items.forEach((item, index) => {
      const title = item.title || 'Sin título';
      const authors = item.author_name ? item.author_name.join(', ') : "Sin autor especificado";
      const description = item.first_sentence ? item.first_sentence.join(' ') : 'Sin descripción disponible';
      const coverId = item.cover_i ? item.cover_i : null;
      const imageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150';

      const cardId = `card-${index}`;

      // Crear la tarjeta
      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
  <div class="card h-100 d-flex flex-column" id="${cardId}" style="max-height: 700px;">
    <img src="${imageUrl}" class="card-img-top" style="width: 100%; height: 300px; object-fit: contain;" alt="${title}">
    <div class="card-body" style="flex-grow: 1; overflow-y: auto;">
      <h5 class="card-title">${title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${authors}</h6>
      <p class="card-text">${description}</p>
    </div>
  </div>
`;

      // Añadir la tarjeta a la fila
      row.appendChild(col);
    });

    // Añadir la fila al contenedor
    resultsContainer.appendChild(row);

    // Mostrar los contenedores ahora que hay resultados
    resultsContainer.style.display = 'block'; // Muestra el contenedor con resultados

  }
});
