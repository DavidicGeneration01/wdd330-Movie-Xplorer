import { getLocalStorage, removeFromFavorites, updateFavoritesCount } from "./Utils.mjs";

export default class Favorites {
    constructor() {
        this.favoritesContainer = document.querySelector("#favorites-grid");
        this.emptyMessage = document.querySelector("#empty-state");
    }

    init() {
        this.renderFavorites();
    }

    renderFavorites() {
        const favorites = getLocalStorage("movieFavorites") || [];

        if (!this.favoritesContainer) return;

        if (favorites.length === 0) {
            this.favoritesContainer.innerHTML = "";
            this.emptyMessage.style.display = "block";
            return;
        }

        this.emptyMessage.style.display = "none";

        this.favoritesContainer.innerHTML = favorites
            .map((movie) => this.createFavoriteCard(movie))
            .join("");

        this.initializeRemoveButtons();
    }

    createFavoriteCard(movie) {
        return `
            <div class="movie-card favorite" data-movie-id="${movie.id}">
                <div class="movie-poster">
                    ${
                        movie.posterPath
                            ? `<img src="https://image.tmdb.org/t/p/w500${movie.posterPath}" alt="${movie.title} poster">`
                            : `<div class="no-poster">No Image</div>`
                    }
                </div>
                <div class="movie-info">
                    <div class="movie-header">
                        <h3 class="movie-title">${movie.title}</h3>
                        <span class="movie-year">${movie.year || ""}</span>
                    </div>
                    <div class="movie-meta">
                        <div class="rating">⭐ <span>${movie.rating || "N/A"}</span></div>
                        <div class="genre">${movie.genre || "Unknown"}</div>
                    </div>
                    <p class="movie-description">${movie.description || ""}</p>
                    <button class="remove-favorite-btn">Remove ❌</button>
                </div>
            </div>
        `;
    }

    initializeRemoveButtons() {
        const removeButtons = document.querySelectorAll(".remove-favorite-btn");

        removeButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const movieCard = e.currentTarget.closest(".movie-card");
                const movieId = movieCard.dataset.movieId;

                // Remove movie from localStorage
                const favorites = getLocalStorage("movieFavorites") || [];
                const movie = favorites.find((fav) => fav.id == movieId);

                removeFromFavorites(movie);

                // Remove from UI
                movieCard.remove();

                // Update favorites count in header
                const remaining = document.querySelectorAll(".movie-card.favorite").length;
                updateFavoritesCount(remaining);

                // Show empty state if no more
                if (remaining === 0) {
                    this.emptyMessage.style.display = "block";
                }
            });
        });
    }
}   