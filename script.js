// Portfolio JavaScript

// Track currently active project
let currentActiveProject = 'qurse';

// Track currently active section
let currentActiveSection = 'work';

// Project data
const projectsData = {
    qurse: {
        title: "Qurse",
        subtitle: "AI powered Search Platform",
        description: "Production-ready AI chat application featuring advanced web search capabilities, specialized research and science agents, with support for multiple AI model providers including OpenAI, Anthropic, Groq, and Grok. Specialized agents for research and science using arXiv, Wolfram Alpha as knowledge bases using the Exa and Tavilby web agents.\n\nOfficial launch soon, current deployment is for testing, development & proof of concept purposes.",
        techStack: ["React", "AI SDK", "Next.js", "Supabase", "Tailwind CSS", "Tavily", "Exa AI", "Vercel"],
        image: "public/qurse.jpg",
        mobileImage: "public/qurse_mob.jpg",
        demoLink: "https://qurse.site",
        sourceLink: "https://github.com/Srihar1-raman/qurseAI"
    },
    privateArch: {
        title: "Private & Portable Architecture for Local LLMs",
        subtitle: "Privacy First Architecture",
        description: "Built a privacy focused portable architecture for running local LLMs with multi-platform support. Enables secure user interactions, conversation history, and system state remain exclusively on the user device through localhost only communication.",
        techStack: ["Node.js", "Ollama", "Html", "CSS", "JavaScript", "JSON", "Restful API"],
        image: "public/private.jpg",
        mobileImage: "public/private_mob.jpg",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    twitterAnalyzer: {
        title: "Twitter Personality Analyser",
        subtitle: "AI-powered Social Analysis",
        description: "Built a Twitter user personality analyser using Groq for inference, Tavily web search for sourcing. Analyzes social media patterns and provides score on four different dimensions of personality traits and maps them on quadrant spectrum chart. \n\nOver 1500 site visitors and over 22000 views on twitter post.",
        techStack: ["Next.js", "Groq", "Tavily", "Vercel", "React", "Shadcn", "AI SDK"],
        image: "public/twitter.jpg",
        mobileImage: "public/twitter_mob.jpg",
        demoLink: "https://oomf-analyzer.vercel.app/",
        sourceLink: "https://github.com/Srihar1-raman/oomfs"
    },
    uberDashboard: {
        title: "Interactive Uber Data Dashboard",
        subtitle: "Data Visualization Platform",
        description: "Developed a comprehensive data visualization dashboard using Google Cloud Platform providing actionable insights about Uber ride patterns, pricing trends, and geographic demand distribution.",
        techStack: ["Google Cloud Platform", "BigQuery", "Mage", "Python", "Pandas", "Plotly"],
        image: "public/uber.jpg",
        mobileImage: "public/uber_mob.jpg",
        demoLink: "https://lookerstudio.google.com/u/1/reporting/0680b350-5367-4a50-84e6-5f1319a0a1ed/page/ze7hD",
        sourceLink: "#"
    },
    pdfReader: {
        title: "FLight Tracker",
        subtitle: "Live flight tracking monitor",
        description: "Built a live flight tracking monitor using Opensky Network API. Displays real-time flight information, including call sign, altitude, and current location using the live ADS-B data.",
        techStack: ["Python", "OpenSky Network API", "Pandas", "NumPy", "Bokeh"],
        image: "public/flight.jpg",
        mobileImage: "public/flight_mob.jpg",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman/flight_tracker"
    },
    localAI: {
        title: "Local AI Chat Interfaces:",
        subtitle: "A Privacy-First Architecture for Personal AI Assistance",
        description: "Research paper exploring private & portable architectures for personal AI assistance. Examines the intersection of local LLMs, privacy concerns, and accessible deployment strategies. \n\n Yet to be published.",
        techStack: ["Research"],
        image: "public/local.jpg",
        mobileImage: "public/local_mob.jpg",
        demoLink: "#",
        sourceLink: "#"
    },
    lstmStock: {
        title: "Stock Price Prediction",
        subtitle: "Long Short-Term Memory (LSTM)",
        description: "Research paper implementing Long Short-Term Memory networks for stock price prediction. Analyzes financial time series data and evaluates predictive performance across different market conditions. \n\n Yet to be published.",
        techStack: ["Research"],
        image: "public/lstm.jpg",
        mobileImage: "public/lstm_mob.jpg",
        demoLink: "#",
        sourceLink: "#"
    },
    deskvr: {
        title: "DeskVR",
        subtitle: "Cross-Device VR Platform",
        description: "Hackathon project securing top 10 placement out of 500 teams. PC-to-phone VR platform enabling seamless cross-device streaming and immersive virtual reality experiences.",
        techStack: ["WebXR", "Three.js", "React", "Socket"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "#"
    },
    navonmesh: {
        title: "Navonmesh",
        subtitle: "Technical Magazine",
        description: "Conceptualized, built, and designed Navonmesh, the annual technical magazine for the Computer Science Department. Features cutting-edge technology articles, student research, and industry insights.",
        techStack: ["Adobe Creative Suite", "Express", "Wikimedia"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "#",
        isCarousel: true,
        carouselType: 'book',
        carouselImages: Array.from({length: 24}, (_, i) => `public/Navonmesh-page-${String(i + 1).padStart(2, '0')}.png`)
    }
};

// Function to check if we're on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Function to update project details
function updateProjectDetails(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    // Track the currently active project
    currentActiveProject = projectKey;

    if (isMobile()) {
        // Mobile: update work item details
        updateMobileProjectDetails(projectKey);
    } else {
        // Desktop: update right section
        const projectDetails = document.querySelector('.project-details');
        if (!projectDetails) return;

        // Check if mobile
        const isMobile = window.innerWidth <= 768;
        const imageSrc = isMobile && project.mobileImage ? project.mobileImage : project.image;
        
        // Check if this is DeskVR project to use video instead of image
        const isDeskVR = projectKey === 'deskvr';
        // Check if this is Navonmesh project to use carousel
        const isCarousel = project.isCarousel;
        
        projectDetails.innerHTML = `
            ${isCarousel ? 
                `<div class="project-carousel">
                    <div class="carousel-container ${project.carouselType === 'book' ? 'book-spread' : ''}">
                        <div class="carousel-images-wrapper">
                            <img src="${project.carouselImages[0]}" alt="${project.title} - Page 1" class="carousel-image" data-page="0">
                        </div>
                        <button class="carousel-btn carousel-prev" aria-label="Previous page">‹</button>
                        <button class="carousel-btn carousel-next" aria-label="Next page">›</button>
                        <div class="carousel-counter">Page 1</div>
                    </div>
                    <div class="carousel-dots"></div>
                </div>` :
                `<div class="project-image">
                    <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                        ${isDeskVR ? 
                            `<video src="public/deskVR.mp4" class="project-screenshot" autoplay muted loop playsinline>
                                Your browser does not support the video tag.
                            </video>` :
                            `<img src="${imageSrc}" alt="${project.title} - ${project.subtitle}" class="project-screenshot">`
                        }
                    </a>
                </div>`
            }
            <div class="project-info">
                <h3 class="project-title active">${project.title}</h3>
                <p class="project-subtitle">${project.subtitle}</p>
                <div class="project-description">
                    <p>${project.description.replace(/\n\n/g, '</p><p>')}</p>
                </div>
                <div class="tech-stack">
                    <h4>Tech Stack:</h4>
                    <div class="tech-tags">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                        <div class="project-links">
                            ${project.demoLink !== '#' ? `<a href="${project.demoLink}" class="project-link" target="_blank">View Demo</a>` : ''}
                            ${project.sourceLink !== '#' ? `<a href="${project.sourceLink}" target="_blank" class="project-link">Source Code</a>` : ''}
                        </div>
            </div>
        `;
        
        // Initialize carousel if this project has one
        if (isCarousel) {
            initializeCarousel(project.carouselImages);
        }
    }
}

// Function to update mobile project details within work items
function updateMobileProjectDetails(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    // Find all work items and remove expanded class
    document.querySelectorAll('.work-item').forEach(item => {
        item.classList.remove('expanded');
        // Remove any existing details
        const existingDetails = item.querySelector('.work-item-details');
        if (existingDetails) {
            existingDetails.remove();
        }
    });

    // Find the work item that matches this project
    const projectKeyMap = {
        'Qurse - AI powered Search Platform': 'qurse',
        'Private & Portable architecture for local LLMs': 'privateArch',
        'Twitter Personality Analyser': 'twitterAnalyzer',
        'Interactive Uber Data Dashboard': 'uberDashboard',
        'FLight Tracker': 'pdfReader',
        'Local AI Chat Interfaces: A Privacy-First Architecture for Personal AI Assistance': 'localAI',
        'Stock Price Prediction Using Long Short-Term Memory (LSTM)': 'lstmStock',
        'DeskVR - Hackathon Project': 'deskvr',
        'Navonmesh - Technical Magazine': 'navonmesh'
    };

    const workItemTitle = Object.keys(projectKeyMap).find(title => projectKeyMap[title] === projectKey);
    const workItems = document.querySelectorAll('.work-item');

    for (const item of workItems) {
        const titleElement = item.querySelector('.work-item-title');
        if (titleElement && titleElement.textContent.trim() === workItemTitle) {
            // Add expanded class
            item.classList.add('expanded');

            // Create and append details
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'work-item-details';
            
            // Check if mobile for work item image
            const isMobile = window.innerWidth <= 768;
            const workImageSrc = isMobile && project.mobileImage ? project.mobileImage : project.image;
            
            // Check if this is DeskVR project to use video instead of image
            const isDeskVR = projectKey === 'deskvr';
            // Check if this is Navonmesh project to use carousel
            const isCarousel = project.isCarousel;
            
            detailsDiv.innerHTML = `
                ${isCarousel ? 
                    `<div class="project-carousel">
                        <div class="carousel-container ${project.carouselType === 'book' ? 'book-spread' : ''}">
                            <div class="carousel-images-wrapper">
                                <img src="${project.carouselImages[0]}" alt="${project.title} - Page 1" class="carousel-image" data-page="0">
                            </div>
                            <button class="carousel-btn carousel-prev" aria-label="Previous page">‹</button>
                            <button class="carousel-btn carousel-next" aria-label="Next page">›</button>
                            <div class="carousel-counter">Page 1</div>
                        </div>
                        <div class="carousel-dots"></div>
                    </div>` :
                    `<div class="work-item-image">
                        <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                            ${isDeskVR ? 
                                `<video src="public/deskVR.mp4" autoplay muted loop playsinline>
                                    Your browser does not support the video tag.
                                </video>` :
                                `<img src="${workImageSrc}" alt="${project.title} - ${project.subtitle}">`
                            }
                        </a>
                    </div>`
                }
                <div class="work-item-info">
                    <h4>${project.title}</h4>
                    <p>${project.subtitle}</p>
                    <p>${project.description.replace(/\n\n/g, '</p><p>')}</p>
                    <div class="work-item-tech">
                        <h5>Tech Stack:</h5>
                        <div class="tech-tags">
                            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="work-item-links">
                        ${project.demoLink !== '#' ? `<a href="${project.demoLink}" class="work-item-link">View Demo</a>` : ''}
                        ${project.sourceLink !== '#' ? `<a href="${project.sourceLink}" target="_blank" class="work-item-link">Source Code</a>` : ''}
                    </div>
                </div>
            `;
            item.appendChild(detailsDiv);
            
            // Initialize carousel if this project has one
            if (isCarousel) {
                initializeCarousel(project.carouselImages);
            }
            
            break;
        }
    }
}

// Function to handle work item clicks
function handleWorkItemClick(event) {
    const workItem = event.currentTarget;
    const titleElement = workItem.querySelector('.work-item-title');

    if (!titleElement) return;

    const title = titleElement.textContent.trim();

    // Map work item titles to project keys
    const projectKeyMap = {
        'Qurse - AI powered Search Platform': 'qurse',
        'Private & Portable architecture for local LLMs': 'privateArch',
        'Twitter Personality Analyser': 'twitterAnalyzer',
        'Interactive Uber Data Dashboard': 'uberDashboard',
        'FLight Tracker': 'pdfReader',
        'Local AI Chat Interfaces: A Privacy-First Architecture for Personal AI Assistance': 'localAI',
        'Stock Price Prediction Using Long Short-Term Memory (LSTM)': 'lstmStock',
        'DeskVR - Hackathon Project': 'deskvr',
        'Navonmesh - Technical Magazine': 'navonmesh'
    };

    const projectKey = projectKeyMap[title];
    if (projectKey) {
        updateProjectDetails(projectKey);

        // Update active state
        document.querySelectorAll('.work-item').forEach(item => {
            item.classList.remove('active');
        });
        workItem.classList.add('active');
    }
}

// Gallery functionality - Future-proof photo list
// Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP, TIFF, TIF, HEIC, HEIF, AVIF, SVG
const galleryPhotos = [
    '1.JPG',
    '747.JPG',
    '777.JPG',
    'anand restaurant.JPG',
    'art school .gif',
    'aut.jpg',
    'auto 2.gif',
    'auto.gif',
    'bandra.JPG',
    'bangalore rain.jpg',
    'benne dosa.jpeg',
    'bird is a word.GIF',
    'blr 2025.jpg',
    'blr.gif',
    'blr.jpeg',
    'churchstreet.gif',
    'connaught place.gif',
    'd-aalr.jpeg',
    'dadar .jpg',
    'dag.gif',
    'del-ccj.jpg',
    'delhi 2024.jpg',
    'delhi 25.JPEG',
    'delhi 6.jpg',
    'dory.jpeg',
    'earphones.JPG',
    'film.JPG',
    'fun.JPG',
    'hill road.jpeg',
    'jaipur sunset.JPG',
    'jaipur.JPG',
    'jalori.jpg',
    'janpat.JPG',
    'jibhi.jpg',
    'kashi.JPG',
    'kerala sundown.jpg',
    'kerala.jpg',
    'kitchen.jpeg',
    'landour sunset.JPG',
    'leaf.gif',
    'lifafa.jpeg',
    'lunar eclipse.gif',
    'malai temple delhi.GIF',
    'mcleodganj.jpeg',
    'metro.gif',
    'minto bridge.JPG',
    'minto road.jpg',
    'mumbai 2023.jpg',
    'mumbai central area.JPG',
    'mussoorie.jpg',
    'night.jpg',
    'old delhi.jpg',
    'qurse.jpg',
    'ride after qaab show.jpeg',
    'sabz burj.JPG',
    'safdarjang.gif',
    'saket alley.jpg',
    'saket.JPEG',
    'september 2025.JPG',
    'shoja moon light.jpg',
    'shoja.JPEG',
    'south mumbai.jpg',
    'sun2.GIF',
    'taj.JPG',
    'tree web.jpeg',
    'varanasi.JPG',
    'varsova.JPG'
];

// Function to add new photos to the gallery (call this when you add new photos)
function addPhotosToGallery(newPhotos) {
    galleryPhotos.push(...newPhotos);
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to load gallery photos dynamically
function loadGalleryPhotos() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    // Randomize the order of photos on each load
    const randomizedPhotos = shuffleArray(galleryPhotos);

    randomizedPhotos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item loading';
        galleryItem.setAttribute('data-index', index);

        // Support all major image formats
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|tif|heic|heif|avif|svg)$/i;
        const isImage = imageExtensions.test(photo);
        
        const mediaElement = document.createElement('img');
        mediaElement.src = `public/etc/${photo}`;
        mediaElement.alt = photo.replace(imageExtensions, '').replace(/[-_]/g, ' ');
        mediaElement.loading = 'lazy';

        mediaElement.onload = () => {
            galleryItem.classList.remove('loading');
        };

        mediaElement.onerror = () => {
            galleryItem.classList.remove('loading');
            galleryItem.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #ffffff; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; text-align: center; padding: 1rem;">
                    <div>Failed to load</div>
                    <div style="font-size: 0.6rem; opacity: 0.7; margin-top: 0.5rem;">${photo}</div>
                </div>
            `;
        };

        galleryItem.appendChild(mediaElement);
        // Store original index for modal lookup
        const originalIndex = galleryPhotos.indexOf(photo);
        galleryItem.addEventListener('click', () => openGalleryModal(originalIndex));
        galleryGrid.appendChild(galleryItem);
    });
}

// Function to open gallery modal
function openGalleryModal(index) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal active';
    modal.setAttribute('data-current-index', index);
    
    const photo = galleryPhotos[index];
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|tif|heic|heif|avif|svg)$/i;
    
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-modal-close">&times;</span>
            <img src="public/etc/${photo}" alt="${photo.replace(imageExtensions, '').replace(/[-_]/g, ' ')}">
            <div class="gallery-modal-info">
                ${photo.replace(imageExtensions, '').replace(/[-_]/g, ' ')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Function to update modal content
    function updateModalContent(newIndex) {
        const newPhoto = galleryPhotos[newIndex];
        const modalContent = modal.querySelector('.gallery-modal-content');
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|tif|heic|heif|avif|svg)$/i;
        
        modalContent.innerHTML = `
            <span class="gallery-modal-close">&times;</span>
            <img src="public/etc/${newPhoto}" alt="${newPhoto.replace(imageExtensions, '').replace(/[-_]/g, ' ')}">
            <div class="gallery-modal-info">
                ${newPhoto.replace(imageExtensions, '').replace(/[-_]/g, ' ')}
            </div>
        `;
        
        modal.setAttribute('data-current-index', newIndex);
        
        // Re-attach close button event
        const closeBtn = modal.querySelector('.gallery-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    // Close modal functionality
    const closeBtn = modal.querySelector('.gallery-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function handleKeydown(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleKeydown);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const currentIndex = parseInt(modal.getAttribute('data-current-index'));
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryPhotos.length - 1;
            updateModalContent(prevIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const currentIndex = parseInt(modal.getAttribute('data-current-index'));
            const nextIndex = currentIndex < galleryPhotos.length - 1 ? currentIndex + 1 : 0;
            updateModalContent(nextIndex);
        }
    });
}

// Function to show section
function showSection(sectionName) {
    // Hide all sections
    document.getElementById('work-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).style.display = 'block';
    
    // Update navigation active state
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav a[href="#${sectionName}"]`).classList.add('active');
    
    // Update current section
    currentActiveSection = sectionName;
}

// Function to handle navigation clicks
function handleNavigationClick(event) {
    const href = event.target.getAttribute('href');
    
    // If it's an external link (like etc.html), let it navigate normally
    if (href.includes('.html') || href.includes('http')) {
        return;
    }
    
    // Otherwise, handle internal navigation
    event.preventDefault();
    const target = href.substring(1);
    showSection(target);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', handleWorkItemClick);
        item.style.cursor = 'pointer';
    });

    // Add navigation click listeners
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', handleNavigationClick);
    });

    // Auto-expand Qurse project on mobile
    if (isMobile()) {
        updateMobileProjectDetails('qurse');
    }

    // Handle window resize to switch between mobile and desktop modes
    window.addEventListener('resize', function() {
        // Clear any mobile expansions when switching to desktop
        if (!isMobile()) {
            document.querySelectorAll('.work-item').forEach(item => {
                item.classList.remove('expanded');
                const existingDetails = item.querySelector('.work-item-details');
                if (existingDetails) {
                    existingDetails.remove();
                }
            });
            // Re-show the currently active project in right section for desktop
            updateProjectDetails(currentActiveProject);
        }
    });

    // Set Qurse as default active project
    const qurseItem = Array.from(workItems).find(item =>
        item.querySelector('.work-item-title')?.textContent.includes('Qurse')
    );
    if (qurseItem) {
        qurseItem.classList.add('active');
    }

    // Initialize with Qurse details
    updateProjectDetails('qurse');

    // Set work as default active section
    showSection('work');
    
    // Carousel functionality
    window.initializeCarousel = function(images) {
        const isBookSpread = document.querySelector('.book-spread');
        const wrapper = document.querySelector('.carousel-images-wrapper');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const counter = document.querySelector('.carousel-counter');
        const dotsContainer = document.querySelector('.carousel-dots');
        const container = document.querySelector('.carousel-container');
        
        // For book spread: create spreads array
        // [0] = page 1 (cover), [1] = pages 2-3, [2] = pages 4-5, ... [11] = page 24 (back)
        let spreads = [];
        let currentSpreadIndex = 0;
        
        if (isBookSpread) {
            // First page alone (cover)
            spreads.push([0]);
            // Middle pages in pairs
            for (let i = 1; i < images.length - 1; i += 2) {
                if (i + 1 < images.length - 1) {
                    spreads.push([i, i + 1]);
                } else {
                    spreads.push([i]);
                }
            }
            // Last page alone (back cover)
            spreads.push([images.length - 1]);
            
            // Create dots for each spread
            spreads.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            });
        } else {
            // Regular carousel
            images.forEach((_, i) => {
                spreads.push([i]);
                const dot = document.createElement('span');
                dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        function updateCarousel(spreadIndex) {
            currentSpreadIndex = spreadIndex;
            wrapper.style.opacity = '0';
            
            setTimeout(() => {
                const spread = spreads[currentSpreadIndex];
                wrapper.innerHTML = '';
                
                if (spread.length === 1) {
                    // Single page
                    const img = document.createElement('img');
                    img.src = images[spread[0]];
                    img.alt = `Page ${spread[0] + 1}`;
                    img.className = 'carousel-image single-page';
                    wrapper.appendChild(img);
                    counter.textContent = `Page ${spread[0] + 1}`;
                } else {
                    // Two pages (spread)
                    spread.forEach((pageIndex, i) => {
                        const img = document.createElement('img');
                        img.src = images[pageIndex];
                        img.alt = `Page ${pageIndex + 1}`;
                        img.className = `carousel-image ${i === 0 ? 'left-page' : 'right-page'}`;
                        wrapper.appendChild(img);
                    });
                    counter.textContent = `Pages ${spread[0] + 1}-${spread[1] + 1}`;
                }
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSpreadIndex);
                });
                
                wrapper.style.opacity = '1';
            }, 150);
        }
        
        function nextSlide() {
            const newIndex = (currentSpreadIndex + 1) % spreads.length;
            updateCarousel(newIndex);
        }
        
        function prevSlide() {
            const newIndex = (currentSpreadIndex - 1 + spreads.length) % spreads.length;
            updateCarousel(newIndex);
        }
        
        // Button click handlers
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
        
        // Dot click handlers
        dots.forEach((dot) => {
            dot.addEventListener('click', () => updateCarousel(parseInt(dot.dataset.index)));
        });
        
        // Keyboard navigation
        const keyHandler = function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        document.addEventListener('keydown', keyHandler);
        
        // Click left/right halves of image
        container.addEventListener('click', function(e) {
            if (e.target === prevBtn || e.target === nextBtn) return;
            
            const rect = container.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const halfWidth = rect.width / 2;
            
            if (clickX < halfWidth) {
                prevSlide();
            } else {
                nextSlide();
            }
        });
    };

    // Auto-load gallery if we're on the ETC page
    const isEtcPage = window.location.pathname.includes('etc.html') || 
                     window.location.pathname.endsWith('/etc.html') ||
                     window.location.href.includes('etc.html');
    
    if (isEtcPage) {
        loadGalleryPhotos();
    }
});
