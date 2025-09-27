// Portfolio JavaScript

// Track currently active project
let currentActiveProject = 'qurse';

// Project data
const projectsData = {
    qurse: {
        title: "Qurse",
        subtitle: "AI powered Search Platform",
        description: "Production-ready AI chat application featuring advanced web search capabilities, specialized research and science agents, with support for multiple AI model providers including OpenAI, Anthropic, Groq, and Grok. Specialized agents for research and science using arXiv, Wolfram Alpha as knowledge bases using the Exa and Tavilby web agents.\n\nOfficial launch soon, current deployment is for testing, development & proof of concept purposes.",
        techStack: ["React", "AI SDK", "Next.js", "Supabase", "Tailwind CSS", "Tavily", "Exa AI", "Vercel"],
        image: "public/qurse.png",
        mobileImage: "public/qurse_mob.png",
        demoLink: "https://qurse.site",
        sourceLink: "https://github.com/Srihar1-raman/qurseAI"
    },
    privateArch: {
        title: "Private & Portable Architecture for Local LLMs",
        subtitle: "Privacy First Architecture",
        description: "Built a privacy focused portable architecture for running local LLMs with multi-platform support. Enables secure user interactions, conversation history, and system state remain exclusively on the user device through localhost only communication.",
        techStack: ["Node.js", "Ollama", "Html", "CSS", "JavaScript", "JSON", "Restful API"],
        image: "public/private.png",
        mobileImage: "public/private_mob.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    twitterAnalyzer: {
        title: "Twitter Personality Analyser",
        subtitle: "AI-powered Social Analysis",
        description: "Built a Twitter user personality analyser using Groq, Tavily web search, and Vercel for deployment deployment. Analyzes social media patterns and provides score on four different dimensions of personality traits and maps them on quadrant spectrum chart. \n\nOver 1500 site visitors and over 22000 views on twiiter post.",
        techStack: ["Next.js", "Groq", "Tavily", "Vercel", "React", "Shadcn", "AI SDK"],
        image: "public/twitter.png",
        mobileImage: "public/twitter_mob.png",
        demoLink: "https://oomf-analyzer.vercel.app/",
        sourceLink: "https://github.com/Srihar1-raman/oomfs"
    },
    uberDashboard: {
        title: "Interactive Uber Data Dashboard",
        subtitle: "Data Visualization Platform",
        description: "Developed a comprehensive data visualization dashboard using Google Cloud Platform providing actionable insights about Uber ride patterns, pricing trends, and geographic demand distribution.",
        techStack: ["Google Cloud Platform", "BigQuery", "Data Studio", "Python", "Pandas", "Plotly"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    pdfReader: {
        title: "LLM Chatbot PDF Reader",
        subtitle: "Document Intelligence Tool",
        description: "Implemented a real-time chat interface where users can interact with PDF documents. Features natural language querying, context-aware responses, and document summarization capabilities.",
        techStack: ["React", "Node.js", "OpenAI API", "PDF.js", "Socket.io", "MongoDB"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    localAI: {
        title: "Local AI Chat Interfaces",
        subtitle: "Privacy-First Architecture",
        description: "Research paper exploring private & portable architectures for personal AI assistance. Examines the intersection of local LLMs, privacy concerns, and cross-platform deployment strategies.",
        techStack: ["Research", "Academic Writing", "Literature Review", "Technical Analysis"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    lstmStock: {
        title: "Stock Price Prediction",
        subtitle: "LSTM Time Series Analysis",
        description: "Research paper implementing Long Short-Term Memory networks for stock price prediction. Analyzes financial time series data and evaluates predictive performance across different market conditions.",
        techStack: ["Python", "TensorFlow", "LSTM", "Pandas", "NumPy", "Matplotlib"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    deskvr: {
        title: "DeskVR",
        subtitle: "Cross-Device VR Platform",
        description: "Hackathon project securing top 10 placement out of 500 teams. PC-to-phone VR platform enabling seamless cross-device streaming and immersive virtual reality experiences.",
        techStack: ["Unity", "C#", "WebRTC", "Android", "VR/AR", "Networking"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
    },
    navonmesh: {
        title: "Navonmesh",
        subtitle: "Technical Magazine",
        description: "Conceptualized, built, and designed Navonmesh, the annual technical magazine for the Computer Science Department. Features cutting-edge technology articles, student research, and industry insights.",
        techStack: ["Adobe Creative Suite", "InDesign", "Photoshop", "Content Strategy", "Editorial Design"],
        image: "public/placeholder.png",
        demoLink: "#",
        sourceLink: "https://github.com/Srihar1-raman"
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
        
        projectDetails.innerHTML = `
            <div class="project-image">
                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                    ${isDeskVR ? 
                        `<video src="public/deskVR.mp4" class="project-screenshot" autoplay muted loop playsinline>
                            Your browser does not support the video tag.
                        </video>` :
                        `<img src="${imageSrc}" alt="${project.title} - ${project.subtitle}" class="project-screenshot">`
                    }
                </a>
            </div>
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
                    <a href="${project.demoLink}" class="project-link">View Demo</a>
                    <a href="${project.sourceLink}" target="_blank" class="project-link">Source Code</a>
                </div>
            </div>
        `;
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
        'LLM Chatbot Pdf Reader': 'pdfReader',
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
            
            detailsDiv.innerHTML = `
                <div class="work-item-image">
                    <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                        ${isDeskVR ? 
                            `<video src="public/deskVR.mp4" autoplay muted loop playsinline>
                                Your browser does not support the video tag.
                            </video>` :
                            `<img src="${workImageSrc}" alt="${project.title} - ${project.subtitle}">`
                        }
                    </a>
                </div>
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
                        <a href="${project.demoLink}" class="work-item-link">View Demo</a>
                        <a href="${project.sourceLink}" target="_blank" class="work-item-link">Source Code</a>
                    </div>
                </div>
            `;
            item.appendChild(detailsDiv);
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
        'LLM Chatbot Pdf Reader': 'pdfReader',
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', handleWorkItemClick);
        item.style.cursor = 'pointer';
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

    console.log('Portfolio loaded with interactive project details');
});