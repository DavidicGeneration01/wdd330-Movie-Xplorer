// ...existing code...
export async function loadHeaderFooter(callback) {
  // Try multiple likely locations for partials (works with different dev setups)
  const headerCandidates = [
    "/public/images/json/partials/header.html",
    "/public/images/partials/header.html",
    "/partials/header.html",
    "/public/partials/header.html",
    "partials/header.html",
    "./partials/header.html",
  ];
  const footerCandidates = headerCandidates.map((p) => p.replace("header.html", "footer.html"));

  async function fetchFirst(candidates) {
    for (const path of candidates) {
      try {
        const res = await fetch(path);
        if (res && res.ok) {
          const txt = await res.text();
          console.log("Loaded partial:", path);
          return { path, txt };
        }
      } catch (err) {
        // continue trying other candidates
      }
    }
    throw new Error("No partial found in candidates: " + candidates.join(", "));
  }

  try {
    const headerRes = await fetchFirst(headerCandidates);
    const footerRes = await fetchFirst(footerCandidates);

    const headerTemplate = headerRes.txt;
    const footerTemplate = footerRes.txt;

    const headerElement = document.getElementById("headerData");
    const footerElement = document.getElementById("footerData");

    if (!headerElement) console.warn("No element with id 'headerData' found in DOM");
    if (!footerElement) console.warn("No element with id 'footerData' found in DOM");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    // Fix image srcs that are relative inside the partial (e.g. "logo_1.png")
    if (headerElement) {
      headerElement.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src && !src.startsWith("/") && !src.startsWith("http")) {
          // try common public images folder
          img.src = `/public/images/${src}`;
          console.log("Rewrote img src to", img.src);
        }
      });

      // Turn placeholder hrefs into usable targets so nav shows correctly
      headerElement.querySelectorAll("nav a").forEach((a) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!href || href === "#") {
          const text = (a.textContent || "").toLowerCase();
          let target = "/index.html";
          if (text.includes("trending") || text.includes("popular")) target = "/movie.html";
          if (text.includes("favorites")) target = "/favorites.html";
          if (text.includes("login")) target = "/login.html";
          a.setAttribute("href", target);
        }
      });
    }

    // Initialize favorites count after header is loaded
    const favorites = (typeof getLocalStorage === "function" && getLocalStorage("movieFavorites")) || [];
    if (typeof updateFavoritesCount === "function") updateFavoritesCount(favorites.length);

    // Update the year in the footer
    if (typeof updateCurrentYear === "function") updateCurrentYear();

    // Initialize mobile menu and set active nav link
    if (typeof initializeMobileMenu === "function") initializeMobileMenu();
    if (typeof setActiveNavLink === "function") setActiveNavLink();

    if (typeof callback === "function") callback();
  } catch (err) {
    console.error("loadHeaderFooter error:", err);
  }
}
