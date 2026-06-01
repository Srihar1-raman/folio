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

        // Project hover previews
        var projectItems = document.querySelectorAll(".project-item[data-preview]");
        projectItems.forEach(function (item) {
            var src = item.getAttribute("data-preview");
            if (!src) return;

            var preview = document.createElement("div");
            preview.className = "project-preview";

            if (src.match(/\.(mp4|webm)$/i)) {
                var video = document.createElement("video");
                video.src = src;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                preview.appendChild(video);
                var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (!prefersReducedMotion) {
                    item.addEventListener("mouseenter", function () { video.play(); });
                    item.addEventListener("mouseleave", function () { video.pause(); video.currentTime = 0; });
                }
            } else {
                var img = document.createElement("img");
                img.src = src;
                img.alt = "Preview";
                preview.appendChild(img);
            }

            item.appendChild(preview);
        });

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
            var wrapper = document.createElement("div");
            wrapper.className = "gallery-item";

            var img = document.createElement("img");
            img.dataset.src = "public/etc/" + file;
            var name = file.replace(/\.[^.]+$/, "");
            img.alt = name;
            img.loading = "lazy";

            var label = document.createElement("span");
            label.className = "gallery-label";
            label.textContent = name;

            wrapper.appendChild(img);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
            observer.observe(img);
        });
    }

    // Pixel cat that follows cursor on x-axis with walk animation
    function initCat() {
        var cat = document.createElement("div");
        cat.className = "pixel-cat";

        // Frame SVGs: idle, walk1, walk2
        var frames = [
            // idle - sitting
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 16 12" fill="currentColor">' +
            '<rect x="1" y="0" width="2" height="2"/><rect x="11" y="0" width="2" height="2"/>' +
            '<rect x="1" y="2" width="12" height="2"/><rect x="0" y="4" width="14" height="4"/>' +
            '<rect x="2" y="4" width="2" height="2" fill="var(--bg)"/><rect x="9" y="4" width="2" height="2" fill="var(--bg)"/>' +
            '<rect x="5" y="6" width="4" height="1" fill="var(--bg)"/>' +
            '<rect x="1" y="8" width="3" height="2"/><rect x="6" y="8" width="3" height="2"/>' +
            '<rect x="14" y="6" width="2" height="2"/><rect x="14" y="4" width="2" height="1"/></svg>',
            // walk1 - left legs forward
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 16 12" fill="currentColor">' +
            '<rect x="1" y="0" width="2" height="2"/><rect x="11" y="0" width="2" height="2"/>' +
            '<rect x="1" y="2" width="12" height="2"/><rect x="0" y="4" width="14" height="4"/>' +
            '<rect x="2" y="4" width="2" height="2" fill="var(--bg)"/><rect x="9" y="4" width="2" height="2" fill="var(--bg)"/>' +
            '<rect x="5" y="6" width="4" height="1" fill="var(--bg)"/>' +
            '<rect x="0" y="8" width="3" height="2"/><rect x="8" y="8" width="3" height="2"/>' +
            '<rect x="14" y="5" width="2" height="2"/><rect x="14" y="3" width="2" height="1"/></svg>',
            // walk2 - right legs forward
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 16 12" fill="currentColor">' +
            '<rect x="1" y="0" width="2" height="2"/><rect x="11" y="0" width="2" height="2"/>' +
            '<rect x="1" y="2" width="12" height="2"/><rect x="0" y="4" width="14" height="4"/>' +
            '<rect x="2" y="4" width="2" height="2" fill="var(--bg)"/><rect x="9" y="4" width="2" height="2" fill="var(--bg)"/>' +
            '<rect x="5" y="6" width="4" height="1" fill="var(--bg)"/>' +
            '<rect x="2" y="8" width="3" height="2"/><rect x="5" y="8" width="3" height="2"/>' +
            '<rect x="14" y="7" width="2" height="2"/><rect x="14" y="5" width="2" height="1"/></svg>'
        ];

        cat.innerHTML = frames[0];
        document.body.appendChild(cat);

        var targetX = window.innerWidth / 2;
        var currentX = targetX;
        var frameIndex = 0;
        var frameTimer = 0;
        var isMoving = false;

        document.addEventListener("mousemove", function (e) {
            targetX = e.clientX - 16;
        });

        function animate() {
            var dx = targetX - currentX;
            currentX += dx * 0.08;

            var moving = Math.abs(dx) > 1;

            // Flip cat based on direction
            var scaleX = dx < -1 ? -1 : 1;
            cat.style.transform = "translateX(" + currentX + "px) scaleX(" + scaleX + ")";

            // Cycle walk frames when moving
            if (moving) {
                frameTimer++;
                if (frameTimer % 8 === 0) {
                    frameIndex = frameIndex === 1 ? 2 : 1;
                    cat.innerHTML = frames[frameIndex];
                }
                isMoving = true;
            } else if (isMoving) {
                // Return to idle
                cat.innerHTML = frames[0];
                isMoving = false;
                frameTimer = 0;
            }

            requestAnimationFrame(animate);
        }
        animate();
    }

    initCat();
})();