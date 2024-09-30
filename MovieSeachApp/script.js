// Call `showSpinner` 
function showSpinner() {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = '<div class="spinner"></div>';
}

// Function to fetch and display movie data
function fetchAndDisplayMovies(query) {
  const apiKey = "406f1c32"; // OMDB API key
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === "False") {
        displayNoResultsMessage(data.Error); // Display no results message
        return;
      }
      displayMovies(data.Search); // Call the function to display movies
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Event listener for search button
document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    fetchAndDisplayMovies(query); // Call the function with the search query
    searchInput.value = ""; // Clear the input field
  } else {
    displayNoResultsMessage("Please enter a movie title.");
  }
});

// Function to display movies on the web page
function displayMovies(movies) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = ""; // Clear any previous results

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="more-info-button" data-imdbid="${movie.imdbID}">More Info</button>
        `;

    movieContainer.appendChild(movieElement);
  });

  // Add event listeners to "More Info" buttons
  const moreInfoButtons = document.querySelectorAll(".more-info-button");
  moreInfoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const imdbID = this.getAttribute("data-imdbid");
      fetchMovieDetails(imdbID);
    });
  });
}

// Function to fetch and display movie details
function fetchMovieDetails(imdbID) {
  const apiKey = "406f1c32"; // OMDB API key
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayMovieDetails(data); // Call the function to display movie details
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

// Function to display movie details in a modal
function displayMovieDetails(movie) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  modalContent.innerHTML = `
        <button class="close-button">&times;</button>
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <img src="${movie.Poster}" alt="${movie.Title}" style="width: 100%; margin-top: 15px;">
    `;

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  // Display the modal
  setTimeout(() => {
    modalContainer.classList.add("show");
  }, 10);

  // Add event listener to the close button
  const closeButton = modalContent.querySelector(".close-button");
  closeButton.addEventListener("click", function () {
    closeModal(modalContainer);
  });

  // Close modal when clicking outside the content area
  modalContainer.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
      closeModal(modalContainer);
    }
  });
}

// Function to close the modal
function closeModal(modalContainer) {
  modalContainer.classList.remove("show");
  setTimeout(() => {
    document.body.removeChild(modalContainer);
  }, 300);
}

// Function to display a no results message
function displayNoResultsMessage(message) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = `<p>${message}</p>`;
}
