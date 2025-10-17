import {
    loadHeaderFooter,
    setActiveNavLink,
    initializeMobileMenu,
} from "./modules/Utils.mjs";
import Favorites from "./modules/Favorites.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    // Wait until header and footer are loaded
    await loadHeaderFooter(() => {
        setActiveNavLink();
        initializeMobileMenu();
    });

    // Now initialize favorites AFTER DOM update
    const favoritesPage = new Favorites();

    // Wait a small delay to ensure dynamic content inserted
    setTimeout(() => {
        favoritesPage.init();
    }, 100);
});
