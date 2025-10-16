import {
    loadHeaderFooter,
    setActiveNavLink,
    initializeMobileMenu,
} from "./modules/Utils.mjs";
import Favorites from "./modules/Favorites.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    // Load header & footer before initializing favorites
    await loadHeaderFooter(() => {
        setActiveNavLink();
        initializeMobileMenu();
    });

    // Initialize favorites page
    const favoritesPage = new Favorites();
    favoritesPage.init();
});
