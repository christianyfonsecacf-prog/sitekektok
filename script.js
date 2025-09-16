document.addEventListener('DOMContentLoaded', function() {

    // Main Carousel Functionality
    const mainTrack = document.getElementById('mainTrack');
    const mainPrev = document.getElementById('mainPrev');
    const mainNext = document.getElementById('mainNext');
    const mainIndicators = document.getElementById('mainIndicators');
    const indicators = mainIndicators.querySelectorAll('.indicator');

    let currentMainIndex = 0;
    const totalMainSlides = 6;

    // Auto-rotate main carousel
    let mainAutoRotate;

    function startMainAutoRotate() {
        mainAutoRotate = setInterval(() => {
            nextMainSlide();
        }, 15000);
    }

    function stopMainAutoRotate() {
        clearInterval(mainAutoRotate);
    }

    function updateMainCarousel() {
        const offset = currentMainIndex * -100;
        mainTrack.style.transform = `translateX(${offset}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentMainIndex);
        });
    }

    function nextMainSlide() {
        currentMainIndex = (currentMainIndex + 1) % totalMainSlides;
        updateMainCarousel();
    }

    function prevMainSlide() {
        currentMainIndex = (currentMainIndex - 1 + totalMainSlides) % totalMainSlides;
        updateMainCarousel();
    }

    function goToMainSlide(index) {
        currentMainIndex = index;
        updateMainCarousel();
    }

    // Main carousel event listeners
    mainNext.addEventListener('click', () => {
        stopMainAutoRotate();
        nextMainSlide();
        startMainAutoRotate();
    });

    mainPrev.addEventListener('click', () => {
        stopMainAutoRotate();
        prevMainSlide();
        startMainAutoRotate();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopMainAutoRotate();
            goToMainSlide(index);
            startMainAutoRotate();
        });
    });

    // Start auto-rotation only on desktop
    if (window.innerWidth > 768) {
        startMainAutoRotate();
    }

    // Pause auto-rotation on hover
    const featuredSection = document.querySelector('.featured-section');
    featuredSection.addEventListener('mouseenter', stopMainAutoRotate);
    featuredSection.addEventListener('mouseleave', startMainAutoRotate);

    // Projects Carousel Functionality
    const projectsContainer = document.getElementById('projectsContainer');
    const projectsLeft = document.getElementById('projectsLeft');
    const projectsRight = document.getElementById('projectsRight');

    const projectScrollAmount = 620; // 600px item width + 20px gap
    let projectsAutoScroll;
    let projectCurrentPosition = 0;
    const maxProjectScroll = projectsContainer.scrollWidth - projectsContainer.clientWidth;

    function scrollProjects(direction) {
        const scrollAmount = direction === 'left' ? -projectScrollAmount : projectScrollAmount;
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    function autoScrollProjects() {
        projectCurrentPosition += projectScrollAmount;
        
        // Reset to beginning if reached the end
        if (projectCurrentPosition >= maxProjectScroll) {
            projectCurrentPosition = 0;
        }
        
        projectsContainer.scrollTo({
            left: projectCurrentPosition,
            behavior: 'smooth'
        });
    }

    function startProjectsAutoScroll() {
        projectsAutoScroll = setInterval(autoScrollProjects, 4000); // Every 4 seconds
    }

    function stopProjectsAutoScroll() {
        clearInterval(projectsAutoScroll);
    }

    projectsLeft.addEventListener('click', () => {
        stopProjectsAutoScroll();
        scrollProjects('left');
        startProjectsAutoScroll();
    });

    projectsRight.addEventListener('click', () => {
        stopProjectsAutoScroll();
        scrollProjects('right');
        startProjectsAutoScroll();
    });

    // Start auto-scroll for projects only on desktop
    if (window.innerWidth > 768) {
        startProjectsAutoScroll();
    }

    // Pause auto-scroll on hover only on desktop
    if (window.innerWidth > 768) {
        const projectsSection = document.querySelector('.projects-section');
        const projectsCarouselWrapper = document.querySelector('.projects-section .carousel-wrapper');
        
        projectsCarouselWrapper.addEventListener('mouseenter', stopProjectsAutoScroll);
        projectsCarouselWrapper.addEventListener('mouseleave', startProjectsAutoScroll);
    }

    // Auto-scroll projects when mouse wheel is used
    projectsContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollAmount = e.deltaY > 0 ? projectScrollAmount : -projectScrollAmount;
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll-triggered horizontal movement for projects carousel
    let lastScrollY = 0;
    let isProjectsInView = false;

    function checkProjectsInView() {
        const projectsSection = document.querySelector('.projects-section');
        const rect = projectsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if projects section is in viewport
        isProjectsInView = rect.top < windowHeight && rect.bottom > 0;
    }

    function handleScrollBasedMovement() {
        const currentScrollY = window.pageYOffset;
        const scrollDiff = currentScrollY - lastScrollY;
        
        if (isProjectsInView && Math.abs(scrollDiff) > 2) {
            // Convert vertical scroll to horizontal movement
            const horizontalMovement = scrollDiff * 0.8; // Adjust multiplier for sensitivity
            projectsContainer.scrollBy({
                left: horizontalMovement,
                behavior: 'auto' // Use 'auto' for immediate response
            });
        }
        
        lastScrollY = currentScrollY;
    }

    // Add scroll event listener for projects auto-movement
    window.addEventListener('scroll', () => {
        checkProjectsInView();
        handleScrollBasedMovement();
    });

    // Initial check
    checkProjectsInView();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project and reel items
    const projectItems = document.querySelectorAll('.project-item');
    const reelItems = document.querySelectorAll('.reel-item');

    [...projectItems, ...reelItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Enhanced hover effects for project items
    projectItems.forEach(item => {
        const iframe = item.querySelector('iframe');

        item.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            item.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(45,45,45,0.1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
        });
    });

    // Enhanced hover effects for reel items
    reelItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(45,45,45,0.1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
        });
    });

    // Header background opacity on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset;

        if (scrollTop > 50) {
            header.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)';
            header.style.boxShadow = 'none';
        }
    });

    // Keyboard navigation for main carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopMainAutoRotate();
            prevMainSlide();
            startMainAutoRotate();
        } else if (e.key === 'ArrowRight') {
            stopMainAutoRotate();
            nextMainSlide();
            startMainAutoRotate();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    mainTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            stopMainAutoRotate();
            if (diff > 0) {
                nextMainSlide();
            } else {
                prevMainSlide();
            }
            startMainAutoRotate();
        }
    }

    // Preload next video for smoother transitions
    function preloadNextVideo() {
        const nextIndex = (currentMainIndex + 1) % totalMainSlides;
        const nextItem = mainTrack.children[nextIndex];
        const nextIframe = nextItem.querySelector('iframe');

        if (nextIframe && !nextIframe.dataset.loaded) {
            nextIframe.dataset.loaded = 'true';
        }
    }

    // Preload first next video
    setTimeout(preloadNextVideo, 2000);

    // Preload on each transition
    mainTrack.addEventListener('transitionend', preloadNextVideo);

    // Video Modal Functionality
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Add click event to all project items
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.dataset.video;
            if (videoUrl) {
                // Add autoplay and muted parameters for the modal
                modalVideo.src = videoUrl + '?autoplay=1&muted=0';
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal functionality
    function closeModal() {
        videoModal.classList.remove('active');
        modalVideo.src = ''; // Stop the video
        document.body.style.overflow = ''; // Restore scrolling
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    console.log('Portfolio website initialized successfully!');
});