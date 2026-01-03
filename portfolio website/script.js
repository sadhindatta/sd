// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const icon = themeBtn.querySelector('i');

// Current theme state (already applied to documentElement in index.html)
let currentTheme = localStorage.getItem('theme') || 'dark';

// Function to update the toggle icon based on theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // Sun icon implies "Click to switch to Light"
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon'); // Moon icon implies "Click to switch to Dark"
    }
}

// Initial icon sync
updateThemeIcon(currentTheme);

themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');

    if (isDark) {
        // Switch to Light
        document.documentElement.removeAttribute('data-theme');
        updateThemeIcon('light');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to Dark
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-content, .container > div, .contact-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Skill Modal Logic
const skillModal = document.getElementById('skill-modal');
const closeSkillModal = document.querySelector('.close-skill-modal');
const modalName = document.getElementById('modal-skill-name');
const modalFill = document.getElementById('modal-progress-fill');
const modalPercent = document.getElementById('modal-skill-percent');

// Certs Modal Logic
const certsModal = document.getElementById('certs-modal');
const viewMoreCertsBtn = document.getElementById('view-more-certs-btn');
const closeCertsModal = document.querySelector('.close-certs-modal');

// Close modals
closeSkillModal.addEventListener('click', () => {
    skillModal.style.display = 'none';
});

closeCertsModal.addEventListener('click', () => {
    certsModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === skillModal) {
        skillModal.style.display = 'none';
    }
    if (e.target === certsModal) {
        certsModal.style.display = 'none';
    }
});

// Open Certs Modal
if (viewMoreCertsBtn) { // Check if exists to avoid error
    viewMoreCertsBtn.addEventListener('click', () => {
        certsModal.style.display = 'flex';
    });
}

// Skill Mapping Data (estimated based on expertise level)
const skillData = {
    // Networking
    'Cisco IOS': 95,
    'routing/Switching': 95,
    'VLANs': 90,
    'OSPF/BGP': 85,
    'Wireshark': 90,
    'VPN (IPSec/SSL)': 90,
    // Cybersecurity
    'Firewalls (Palo Alto/Fortinet)': 90,
    'SIEM': 85,
    'Penetration Testing': 75,
    'Endpoint Protection': 90,
    'Access Control (IAM)': 85,
    // SysAdmin
    'Windows Server 2019/2022': 80,
    'Active Directory': 85,
    'Linux (RHEL/Ubuntu)': 75,
    'VMware ESXi': 80,
    'Office 365': 90
};

// Add click event to all tags
document.querySelectorAll('.tags span').forEach(tag => {
    tag.addEventListener('click', function () {
        const skillName = this.innerText;
        const percent = skillData[skillName] || 80; // Default to 80 if not found

        modalName.innerText = skillName;
        modalPercent.innerText = percent + "%";
        skillModal.style.display = 'flex';

        // Reset width to 0 first for animation effect
        modalFill.style.width = '0%';
        setTimeout(() => {
            modalFill.style.width = percent + "%";
        }, 100);
    });
});

// Digital Clock Logic
function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        clockElement.innerText = timeString;
    }
}

setInterval(updateClock, 1000);
updateClock(); // Initial call
