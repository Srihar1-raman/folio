(function () {
    "use strict";

    var THEME_KEY = "theme";

    function getPreferredTheme() {
        var stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        var btn = document.getElementById("theme-toggle");
        if (btn) {
            btn.textContent = theme === "dark" ? "light" : "dark";
        }
    }

    applyTheme(getPreferredTheme());

    document.addEventListener("DOMContentLoaded", function () {
        var btn = document.getElementById("theme-toggle");
        if (btn) {
            btn.addEventListener("click", function () {
                var current = document.documentElement.getAttribute("data-theme") || "light";
                var next = current === "dark" ? "light" : "dark";
                localStorage.setItem(THEME_KEY, next);
                applyTheme(next);
            });
        }

        // Lazy load gallery images
        var gallery = document.getElementById("gallery");
        if (gallery) {
            loadGallery(gallery);
        }
    });

    function loadGallery(container) {
        var photos = [
            "1.JPG", "747.JPG", "777.JPG", "bandra.JPG", "bangalore rain.jpg",
            "blr 2025.jpg", "blr.jpeg", "churchstreet.gif", "connaught place.gif",
            "d-aalr.jpeg", "dadar .jpg", "delhi 2024.jpg", "delhi 25.JPEG",
            "delhi 6.jpg", "earphones.JPG", "film.JPG", "fun.JPG",
            "hill road.jpeg", "jaipur sunset.JPG", "jaipur.JPG", "jalori.jpg",
            "janpat.JPG", "jibhi.jpg", "kashi.JPG", "kerala sundown.jpg",
            "kerala.jpg", "landour sunset.JPG", "lifafa.jpeg", "mcleodganj.jpeg",
            "minto bridge.JPG", "minto road.jpg", "mumbai 2023.jpg",
            "mumbai central area.JPG", "mussoorie.jpg", "night.jpg",
            "old delhi.jpg", "ride after qaab show.jpeg", "sabz burj.JPG",
            "safdarjang.gif", "saket alley.jpg", "saket.JPEG",
            "september 2025.JPG", "shoja moon light.jpg", "shoja.JPEG",
            "south mumbai.jpg", "taj.JPG", "varanasi.JPG", "varsova.JPG"
        ];

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = function () { img.classList.add("loaded"); };
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "200px" });

        photos.forEach(function (file) {
            var img = document.createElement("img");
            img.dataset.src = "public/etc/" + file;
            img.alt = file.replace(/\.[^.]+$/, "");
            img.loading = "lazy";
            container.appendChild(img);
            observer.observe(img);
        });
    }
})();