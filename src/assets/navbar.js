console.log("hello");
        document.addEventListener("DOMContentLoaded", function () {
           // console.log("Le DOM est complètement chargé.");
            const navbar = document.querySelector(".navbar");

            if (navbar) {
                console.log("Navbar trouvée!");

                window.addEventListener("scroll", function () {
                   // console.log("Scroll détecté!");

                    if (window.scrollY > 50) {
                        navbar.classList.add("scrolled");
                        //console.log("Navbar modifiée (scrolled ajoutée)");
                    } else {
                        navbar.classList.remove("scrolled");
                       // console.log("Navbar modifiée (scrolled enlevée)");
                    }
                });
            } else {
                console.error("Navbar non trouvée.");
            }
        });
        document.getElementById("searchButton").addEventListener("click", function() {
            let searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
            if (searchQuery === "") return;
            
            let content = document.querySelector(".content");
            let regex = new RegExp(searchQuery, "gi");
            let hasMatch = false;
            
            function highlightMatches(node) {
                if (node.nodeType === 3) {
                    let match = node.nodeValue.match(regex);
                    if (match) {
                        let span = document.createElement("span");
                        span.innerHTML = node.nodeValue.replace(regex, `<span class='highlight'>${match[0]}</span>`);
                        node.replaceWith(span);
                        hasMatch = true;
                    }
                } else if (node.nodeType === 1 && node.childNodes) {
                    node.childNodes.forEach(highlightMatches);
                }
            }
            
            content.querySelectorAll(".highlight").forEach(el => {
                el.replaceWith(document.createTextNode(el.textContent));
            });
            
            highlightMatches(content);
            
            if (!hasMatch) {
                alert("Aucun résultat trouvé !");
            }
        });

        
        
        