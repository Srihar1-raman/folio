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
            // idle - sitting cat with pointy ears, round head, body, tail, and four legs
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 20 16" fill="currentColor">' +
            // Ears (triangular)
            '<rect x="2" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/>' +
            '<rect x="2" y="1" width="2" height="1"/><rect x="5" y="1" width="2" height="1"/>' +
            // Head
            '<rect x="1" y="2" width="7" height="4"/>' +
            // Eyes
            '<rect x="2" y="3" width="1" height="1" fill="var(--bg)"/><rect x="6" y="3" width="1" height="1" fill="var(--bg)"/>' +
            // Nose
            '<rect x="4" y="5" width="1" height="1" fill="var(--bg)"/>' +
            // Body (longer, horizontal)
            '<rect x="5" y="6" width="10" height="4"/>' +
            // Tail (curving up from rear)
            '<rect x="15" y="5" width="1" height="2"/><rect x="16" y="4" width="1" height="2"/><rect x="17" y="3" width="2" height="1"/>' +
            // Front legs
            '<rect x="6" y="10" width="2" height="3"/><rect x="9" y="10" width="2" height="3"/>' +
            // Back legs
            '<rect x="12" y="10" width="2" height="3"/><rect x="14" y="10" width="2" height="3"/>' +
            '</svg>',
            // walk1 - front left and back right forward
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 20 16" fill="currentColor">' +
            // Ears
            '<rect x="2" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/>' +
            '<rect x="2" y="1" width="2" height="1"/><rect x="5" y="1" width="2" height="1"/>' +
            // Head
            '<rect x="1" y="2" width="7" height="4"/>' +
            // Eyes
            '<rect x="2" y="3" width="1" height="1" fill="var(--bg)"/><rect x="6" y="3" width="1" height="1" fill="var(--bg)"/>' +
            // Nose
            '<rect x="4" y="5" width="1" height="1" fill="var(--bg)"/>' +
            // Body
            '<rect x="5" y="6" width="10" height="4"/>' +
            // Tail (slightly different angle)
            '<rect x="15" y="4" width="1" height="3"/><rect x="16" y="3" width="1" height="2"/><rect x="17" y="2" width="2" height="1"/>' +
            // Front legs - left forward, right back
            '<rect x="5" y="10" width="2" height="3"/><rect x="10" y="10" width="2" height="3"/>' +
            // Back legs - right forward, left back
            '<rect x="13" y="10" width="2" height="3"/><rect x="11" y="10" width="2" height="2"/>' +
            '</svg>',
            // walk2 - front right and back left forward
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 20 16" fill="currentColor">' +
            // Ears
            '<rect x="2" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/>' +
            '<rect x="2" y="1" width="2" height="1"/><rect x="5" y="1" width="2" height="1"/>' +
            // Head
            '<rect x="1" y="2" width="7" height="4"/>' +
            // Eyes
            '<rect x="2" y="3" width="1" height="1" fill="var(--bg)"/><rect x="6" y="3" width="1" height="1" fill="var(--bg)"/>' +
            // Nose
            '<rect x="4" y="5" width="1" height="1" fill="var(--bg)"/>' +
            // Body
            '<rect x="5" y="6" width="10" height="4"/>' +
            // Tail (slightly different angle)
            '<rect x="15" y="6" width="1" height="2"/><rect x="16" y="5" width="1" height="2"/><rect x="17" y="4" width="2" height="1"/>' +
            // Front legs - right forward, left back
            '<rect x="7" y="10" width="2" height="3"/><rect x="9" y="10" width="2" height="2"/>' +
            // Back legs - left forward, right back
            '<rect x="12" y="10" width="2" height="3"/><rect x="14" y="10" width="2" height="2"/>' +
            '</svg>'
        ];

        cat.innerHTML = frames[0];
        document.body.appendChild(cat);

        var targetX = window.innerWidth / 2;
        var currentX = targetX;
        var velocity = 0;
        var frameIndex = 0;
        var frameTimer = 0;
        var isMoving = false;
        var facingDirection = 1;

        document.addEventListener("mousemove", function (e) {
            targetX = e.clientX - 16;
        });

        function animate() {
            var dx = targetX - currentX;

            // Smooth acceleration and deceleration (gentle easing)
            velocity += dx * 0.005;
            velocity *= 0.92; // damping for smooth stop
            currentX += velocity;

            var moving = Math.abs(velocity) > 0.3;

            // Flip cat to face the direction of cursor
            if (dx > 2) {
                facingDirection = -1; // face right (SVG head is on left)
            } else if (dx < -2) {
                facingDirection = 1; // face left
            }
            cat.style.transform = "translateX(" + currentX + "px) scaleX(" + facingDirection + ")";

            // Cycle walk frames when moving
            if (moving) {
                frameTimer++;
                if (frameTimer % 12 === 0) {
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