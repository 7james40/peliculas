document.addEventListener('DOMContentLoaded', () => {
  // Pantallas de la app
  const btnIngresar = document.getElementById('btn-ingresar');
  const btnRegistrarme = document.getElementById('btn-registrarme');
  const btnCerrar = document.getElementById('btn-cerrar');
  const pantallaInicio = document.getElementById('inicio');
  const pantallaCartelera = document.getElementById('cartelera');
  const pantallaDescripcion = document.getElementById('descripcion-pelicula');
  const genreButtons = document.querySelectorAll('.genre-btn');
  const estrenosContainer = document.getElementById('estrenos-cards');
  const proximamenteContainer = document.getElementById('proximamente-cards');

  // Función para cambiar entre pantallas
  const cambiarPantalla = (mostrar, ocultar) => {
    mostrar.classList.remove('d-none');
    mostrar.classList.add('active');
    ocultar.classList.add('d-none');
    ocultar.classList.remove('active');
  };

  // Evento para ingresar
  btnIngresar.addEventListener('click', () => {
    cambiarPantalla(pantallaCartelera, pantallaInicio);
  });

  // Evento para registrarme
btnRegistrarme.addEventListener('click', () => {
  const formRegistro = document.getElementById('form-registro');
  formRegistro.classList.remove('d-none'); // Mostrar el formulario de registro
  cambiarPantalla(formRegistro, pantallaInicio); // Ocultar la pantalla de inicio
});

  // Evento para cerrar la descripción de la película
  btnCerrar.addEventListener('click', () => {
    cambiarPantalla(pantallaCartelera, pantallaDescripcion);
  });

  // Función para filtrar películas
  const filtrarPeliculas = (genero) => {
    const allMovies = document.querySelectorAll('.movie');
    allMovies.forEach((movie) => {
      if (genero === 'todos' || movie.classList.contains(genero)) {
        movie.style.display = 'block';
      } else {
        movie.style.display = 'none';
      }
    });
  };

  // Evento para los botones de filtro
  genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remover la clase activa de todos los botones
      genreButtons.forEach((btn) => btn.classList.remove('active'));
      // Añadir clase activa al botón actual
      button.classList.add('active');
      // Obtener género del botón y filtrar
      const genero = button.getAttribute('data-genre');
      filtrarPeliculas(genero);
    });
  });

  // Lista de películas con su descripción y género
  const peliculas = {
    barbie: {
      titulo: "Barbie",
      descripcion: "Barbie se embarca en una aventura única en el mundo real, enfrentándose a situaciones que desafían su comprensión de la vida.",
      descripcion_corta: "Una aventura única en el mundo real.",
      imagen: "barbie.jpeg",
      genero: "animadas",
      tipo: "estrenos"
    },
    chicken_run: {
      titulo: "Chicken Run",
      descripcion: "Un grupo de gallinas intenta escapar de una granja con la ayuda de un gallo experto en vuelo.",
      descripcion_corta: "Gallinas intentando escapar de una granja.",
      imagen: "chicken_run_dawn_of_the_nugget_ver9.jpg",
      genero: "animadas",
      tipo: "estrenos"
    },
    craig_of_the_creek: {
      titulo: "Craig of the Creek",
      descripcion: "Un niño llamado Craig explora un bosque donde enfrenta diversas aventuras con sus amigos.",
      descripcion_corta: "Un niño y sus amigos exploran un bosque.",
      imagen: "Craig_of_the_Creek_Key_Art.jpg",
      genero: "aventuras",
      tipo: "estrenos"
    },
    elenetal: {
      titulo: "Elemental",
      descripcion: "Un mundo donde los elementos (agua, aire, fuego, tierra) conviven, pero el amor entre dos seres de diferentes elementos desafía todo.",
      descripcion_corta: "Un amor entre dos seres de diferentes elementos.",
      imagen: "Elemental.jpg",
      genero: "aventuras",
      tipo: "proximamente"
    },
    shazam_2: {
      titulo: "Shazam! Fury of the Gods",
      descripcion: "Billy Batson y su familia deben enfrentarse a las fuerzas divinas para salvar el mundo.",
      descripcion_corta: "Una aventura para salvar el mundo.",
      imagen: "shazam2.jpg",
      genero: "aventuras",
      tipo: "proximamente"
    },
    wonka: {
      titulo: "Wonka",
      descripcion: "La historia de los primeros años de vida de Willy Wonka y cómo descubrió su pasión por la chocolatina.",
      descripcion_corta: "La historia de Willy Wonka y su pasión por el chocolate.",
      imagen: "wonka_drama.jpg",
      genero: "dramas",
      tipo: "proximamente"
    }
  };

  // Crear las tarjetas de película dinámicamente para Estrenos y Próximamente
  for (let id in peliculas) {
    const pelicula = peliculas[id];
    const movieElement = document.createElement('div');
    movieElement.classList.add('col', 'movie', pelicula.genero);
    movieElement.setAttribute('id', id);

    movieElement.innerHTML = `
      <div class="movie-card">
        <img src="img/${pelicula.imagen}" alt="${pelicula.titulo}">
        <h5>${pelicula.titulo}</h5>
      </div>
    `;
    if (pelicula.tipo === 'estrenos') {
      estrenosContainer.appendChild(movieElement);
    } else {
      proximamenteContainer.appendChild(movieElement);
    }
  }

  // Evento para mostrar la descripción de la película al hacer clic
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const peliculaId = e.target.closest('.movie').id;
      const pelicula = peliculas[peliculaId];

      // Rellenar los datos de la pantalla de descripción
      document.getElementById('descripcion-imagen').src = `img/${pelicula.imagen}`;
      document.getElementById('descripcion-titulo').textContent = pelicula.titulo;
      document.getElementById('descripcion-corta').textContent = pelicula.descripcion_corta;
      document.getElementById('descripcion-texto').textContent = pelicula.descripcion;

      // Cambiar a la pantalla de descripción
      cambiarPantalla(pantallaDescripcion, pantallaCartelera);
    });
  });
});
document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('active');
});
document.querySelector('.menu-close').addEventListener('click', function () {
  document.querySelector('.menu').classList.remove('active');
});

// Cierra el menú al hacer clic en el botón de cierre
document.querySelector('.menu-close').addEventListener('click', function () {
  document.querySelector('.menu').classList.remove('active');
});
