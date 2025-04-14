document.addEventListener("DOMContentLoaded", function () {
  // Code dépendant du DOM
  const navbar = document.querySelector(".navbar");
  const isHomePage = window.location.pathname.includes("annonces") || window.location.pathname === "/";

  const annoncesSection = document.querySelector("#annonces");
  const devenirExpertSection = document.querySelector("#devenir-expert");

  console.log("Section annonces : ", annoncesSection);
  console.log("Section devenir-expert : ", devenirExpertSection);

  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      // e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (navbar) {
    navbar.className = "navbar";
    if (isHomePage) {
      navbar.classList.add("home-page");

      let lastScroll = 0;
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        lastScroll = currentScroll;
      });

      // Force une vérification initiale
      window.dispatchEvent(new Event('scroll'));
    } else {
      navbar.classList.add("scrolled");
    }
  } else {
    console.error("Navbar non trouvée.");
  }

 /*  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");

  /*if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
      let searchQuery = searchInput.value.trim().toLowerCase();
      if (searchQuery === "") return;

      let content = document.querySelector(".content");
      let regex = new RegExp(searchQuery, "gi");
      let hasMatch = false;

/*       function highlightMatches(node) {
        if (node.nodeType === 3) {
          let match = node.nodeValue.match(regex);
          if (match) {
            let span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(
              regex,
              `<span class='highlight'>${match[0]}</span>`
            );
            node.replaceWith(span);
            hasMatch = true;
          }
        } else if (node.nodeType === 1 && node.childNodes) {
          node.childNodes.forEach(highlightMatches);
        }
      }

      content.querySelectorAll(".highlight").forEach((el) => {
        el.replaceWith(document.createTextNode(el.textContent));
      });

      highlightMatches(content);

      if (!hasMatch) {
        alert("Aucun résultat trouvé !");
      }
    });
  } else {
    console.error("Éléments de recherche non trouvés.");
  }*/
}); 