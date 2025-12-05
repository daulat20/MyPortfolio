// Set global variables from environment (if available)
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        // --- Utility Functions ---

        // Open form when clicking Email button
        function openContactForm() {
            const contactBox = document.getElementById("emailContactBox");
            contactBox.style.display = "block";
            contactBox.scrollIntoView({ behavior: "smooth" });
        }

        // Simulate notification popup 
        function sendNotification(e) {
            e.preventDefault();

            const popup = document.getElementById("notifyPopup");
            popup.innerHTML = "🔔 Message Sent! (Simulated)";
            popup.style.display = "block";

            setTimeout(() => {
                popup.style.display = "none";
            }, 3000);

            document.getElementById("notifyForm").reset();
        }
        
        // ---------- Preloader ----------
        window.addEventListener('load', () => {
            const pre = document.getElementById('preloader');
            if (pre) {
                pre.style.opacity = '0';
                pre.style.transition = 'opacity 0.45s ease';
                setTimeout(() => pre.remove(), 500);
            }
        });

        // ---------- Mobile menu ----------
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    navLinks.classList.remove('show');
                    menuBtn.setAttribute('aria-expanded', 'false');
                } else {
                    navLinks.classList.add('show');
                    menuBtn.setAttribute('aria-expanded', 'true');
                }
            });

            // Close mobile menu when a link is clicked
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 767) {
                        navLinks.classList.remove('show');
                        menuBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Handle resize to hide/show button
            window.addEventListener('resize', () => {
                if (window.innerWidth > 767) {
                     navLinks.classList.remove('show');
                     menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // ---------- Typing animation (Option A: rotating titles) ----------
        const titles = [
            "Java Full Stack Developer",
            "Backend Developer | Spring Boot",
            "Frontend Developer | JavaScript",
            "REST API • SQL • Clean Code"
        ];
        const typed = document.getElementById('typedTitle');
        let tIndex = 0, cIndex = 0, deleting = false;
        const typeSpeed = 70, pauseAfter = 1400;

        function typeLoop() {
            if (!typed) return;
            const txt = titles[tIndex];
            if (!deleting) {
                typed.textContent = txt.slice(0, cIndex + 1);
                cIndex++;
                if (cIndex === txt.length) {
                    deleting = true;
                    setTimeout(typeLoop, pauseAfter);
                } else setTimeout(typeLoop, typeSpeed);
            } else {
                typed.textContent = txt.slice(0, cIndex - 1);
                cIndex--;
                if (cIndex === 0) {
                    deleting = false;
                    tIndex = (tIndex + 1) % titles.length;
                    setTimeout(typeLoop, 350);
                } else setTimeout(typeLoop, typeSpeed / 1.2);
            }
        }
        document.addEventListener('DOMContentLoaded', () => { setTimeout(typeLoop, 600); });

        // ---------- Skill progress animation (on scroll into view) ----------
        const bars = document.querySelectorAll('.bar');
        
        // Use Intersection Observer for efficient animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const b = entry.target;
                    const target = b.dataset.progress || 60;
                    b.querySelector('i').style.width = target + '%';
                    observer.unobserve(b); // Stop observing once animated
                }
            });
        }, { threshold: 0.8 }); // Trigger when 80% visible

        window.addEventListener('load', () => {
            bars.forEach(b => observer.observe(b));
        });


        // ---------- Project modal popups ----------
        const projectCards = document.querySelectorAll('.project-card');
        const modalBackdrop = document.getElementById('modalBackdrop');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalClose = document.getElementById('modalClose');

        projectCards.forEach(pc => {
            pc.addEventListener('click', () => openProject(pc));
            pc.addEventListener('keyup', (e) => { if (e.key === 'Enter' || e.key === ' ') openProject(pc); });
        });

        function openProject(pc) {
            const data = JSON.parse(pc.getAttribute('data-project'));
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            modalImg.src = data.img;
            modalImg.alt = data.title + " screenshot";
            modalBackdrop.style.display = 'flex';
            modalBackdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // lock scroll
        }

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop.style.display === 'flex') {
                closeModal();
            }
        });

        function closeModal() {
            modalBackdrop.style.display = 'none';
            modalBackdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        // ---------- Highlight Nav Item While Scrolling ----------
        const navAnchors = document.querySelectorAll('.nav-links a');
        const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute('href')));
        
        function highlightNav() {
            let current = '';

            sections.forEach(sec => {
                if (!sec) return;
                const sectionTop = sec.offsetTop - 100; // Offset for header height
                if (pageYOffset >= sectionTop) {
                    current = '#' + sec.getAttribute('id');
                }
            });

            navAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === current) {
                    a.classList.add('active');
                }
            });

            // Ensure 'Home' is active when at the very top
            if (pageYOffset < 100 && navAnchors.length > 0) {
                navAnchors.forEach(a => a.classList.remove('active'));
                navAnchors[0].classList.add('active');
            }
        }
        window.addEventListener('scroll', highlightNav);
        window.addEventListener('load', highlightNav);
