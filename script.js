// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close the mobile menu if it's open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery Section
const galleryImages = [
    {
        url: 'https://source.unsplash.com/featured/800x600/?indian-wedding',
        category: 'wedding',
        caption: 'Beautiful Wedding Moments'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?indian-marriage',
        category: 'wedding',
        caption: 'Traditional Wedding Photography'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?indian-family',
        category: 'portrait',
        caption: 'Professional Portrait Photography'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?family-portrait',
        category: 'portrait',
        caption: 'Family Portraits'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?indian-festival',
        category: 'event',
        caption: 'Event Photography'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?corporate-event-india',
        category: 'event',
        caption: 'Corporate Events'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?hindu-ceremony',
        category: 'traditional',
        caption: 'Traditional Ceremonies'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?diwali-celebration',
        category: 'traditional',
        caption: 'Festival Photography'
    },
    {
        url: 'https://source.unsplash.com/featured/800x600/?cinematic-wedding',
        category: 'all',
        caption: 'Professional Cinematography'
    }
];

const galleryGrid = document.querySelector('.gallery-grid');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create Gallery Items with Animation
function createGalleryItems(images) {
    galleryGrid.innerHTML = '';
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        galleryItem.style.opacity = '0';
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.caption;
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `
            <h3>${image.caption}</h3>
            <p>Click to view larger</p>
            <span class="view-icon"><i class="fas fa-search-plus"></i></span>
        `;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
        
        // Open Modal on Click with Animation
        galleryItem.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = image.url;
            modalCaption.textContent = image.caption;
            setTimeout(() => modal.classList.add('active'), 10);
            
            // Add zoom-in animation to the modal image
            modalImg.style.transform = 'scale(0.8)';
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.style.transition = 'all 0.3s ease';
                modalImg.style.transform = 'scale(1)';
                modalImg.style.opacity = '1';
            }, 50);
        });
    });
}

// Add mouse hover effect for gallery items
galleryGrid.addEventListener('mousemove', (e) => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            item.querySelector('img').style.transform = `scale(1.1) translate(${(x - rect.width / 2) / 20}px, ${(y - rect.height / 2) / 20}px)`;
        }
    });
});

galleryGrid.addEventListener('mouseleave', () => {
    const items = document.querySelectorAll('.gallery-item img');
    items.forEach(img => {
        img.style.transform = '';
    });
});

// Filter Gallery with Animation
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const filteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(image => image.category === filter);
        
        createGalleryItems(filteredImages);
    });
});

// Initialize gallery with all images
createGalleryItems(galleryImages);

// Close Modal with Animation
closeModal.addEventListener('click', () => {
    modalImg.style.transform = 'scale(0.8)';
    modalImg.style.opacity = '0';
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modalImg.style.transform = 'scale(0.8)';
        modalImg.style.opacity = '0';
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
});

// Navbar Background Change on Scroll with color change
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    let scrollTop;
    
    if (!document.querySelector('.scroll-top')) {
        scrollTop = document.createElement('div');
        scrollTop.className = 'scroll-top';
        scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTop);
        
        // Add event listener for scroll-to-top button
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        scrollTop = document.querySelector('.scroll-top');
    }
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('active');
    }
});

// Form Submission with Enhanced Animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your message! We will get back to you soon.</p>
    `;
    contactForm.appendChild(successMessage);
    
    // Remove form fields temporarily
    const formFields = contactForm.querySelectorAll('input, textarea, select, button');
    formFields.forEach(field => {
        field.style.transition = 'all 0.3s ease';
        field.style.opacity = '0';
        field.style.transform = 'translateY(-20px)';
    });
    
    // Restore form after 3 seconds and remove success message
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            successMessage.remove();
            formFields.forEach(field => {
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            });
            contactForm.reset();
        }, 300);
    }, 3000);
});

// Enhanced Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.service-card, .about-content, .contact-container, .video-item, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
            
            // Add extra animation for service cards
            if (element.classList.contains('service-card')) {
                setTimeout(() => {
                    element.querySelector('i').classList.add('pulse');
                }, 300);
            }
            
            // Add extra animation for stat numbers
            if (element.classList.contains('stat-item')) {
                const statNumber = element.querySelector('.stat-number');
                const targetNumber = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
                
                // Animate the number counting up
                let currentNumber = 0;
                const interval = setInterval(() => {
                    currentNumber += Math.ceil(targetNumber / 30);
                    if (currentNumber > targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(interval);
                    }
                    statNumber.textContent = currentNumber + '+';
                }, 30);
            }
        }
    });
};

// Initial check for elements in view on load
window.addEventListener('load', scrollReveal);
window.addEventListener('scroll', scrollReveal);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Add Ganesha image hover effect
const ganeshaImg = document.querySelector('.ganesha-img');
if (ganeshaImg) {
    const cameraContainer = document.querySelector('.camera-container');
    
    cameraContainer.addEventListener('mouseenter', () => {
        ganeshaImg.style.transform = 'scale(1.1)';
    });
    
    cameraContainer.addEventListener('mouseleave', () => {
        ganeshaImg.style.transform = 'scale(1)';
    });
}

// Add camera background animation
const cameraBg = document.querySelector('.camera-bg');
if (cameraBg) {
    const randomRotation = () => {
        const rotation = Math.random() * 5 - 2.5; // Random value between -2.5 and 2.5
        cameraBg.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        setTimeout(randomRotation, 3000);
    };
    
    randomRotation();
}

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .about-content, .contact-container, .video-item, .stat-item {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.6s ease;
    }
    
    .service-card.active, .about-content.active, .contact-container.active, 
    .video-item.active, .stat-item.active {
        opacity: 1;
        transform: translateY(0);
    }

    .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        color: white;
        padding: 2rem 1.5rem 1.5rem;
        transform: translateY(100%);
        transition: transform 0.4s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    .gallery-overlay h3 {
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .gallery-overlay p {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .view-icon {
        font-size: 2rem;
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.3s ease 0.1s;
    }

    .gallery-item:hover .gallery-overlay {
        transform: translateY(0);
    }
    
    .gallery-item:hover .view-icon {
        opacity: 1;
        transform: scale(1);
    }

    .success-message {
        background: linear-gradient(135deg, #4CAF50, #2196F3);
        color: white;
        padding: 2rem;
        border-radius: 10px;
        margin: 1rem 0;
        animation: slideIn 0.4s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
    }
    
    .success-message i {
        font-size: 2.5rem;
        color: white;
    }
    
    .success-message p {
        font-size: 1.1rem;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .pulse {
        animation: pulse 1s ease infinite;
    }
`;
document.head.appendChild(style);

// Preload images function
document.addEventListener('DOMContentLoaded', function() {
    // Preload gallery images
    const imageUrls = ['ganesha.jpeg', 'Family Potraits.jpg', 'camera.jpg'];
    
    // Create array to hold promises for all image loads
    const imagePromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(`Failed to load image: ${url}`);
            img.src = url;
        });
    });
    
    // When all images are loaded, make the gallery visible
    Promise.all(imagePromises)
        .then(() => {
            console.log('All gallery images loaded successfully');
            document.querySelector('.gallery-grid').style.opacity = '1';
        })
        .catch(error => {
            console.error(error);
            // Still show gallery even if some images fail to load
            document.querySelector('.gallery-grid').style.opacity = '1';
        });
});

// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery modal
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-content');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const captionText = this.querySelector('h3').innerText;
            
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            modalCaption.innerHTML = captionText;
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Add video rotation controls
document.addEventListener('DOMContentLoaded', function() {
    // Create rotation controls for each video
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach((container, index) => {
        const videoElement = container.querySelector('iframe, video');
        if (!videoElement) return;
        
        // Create rotation controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'video-controls';
        
        // Rotation buttons
        const rotateLeftBtn = document.createElement('button');
        rotateLeftBtn.className = 'rotate-btn rotate-left';
        rotateLeftBtn.innerHTML = '<i class="fas fa-undo"></i>';
        rotateLeftBtn.title = 'Rotate Left';
        
        const rotateRightBtn = document.createElement('button');
        rotateRightBtn.className = 'rotate-btn rotate-right';
        rotateRightBtn.innerHTML = '<i class="fas fa-redo"></i>';
        rotateRightBtn.title = 'Rotate Right';
        
        // Add buttons to controls
        controlsDiv.appendChild(rotateLeftBtn);
        controlsDiv.appendChild(rotateRightBtn);
        
        // Add controls to container
        container.appendChild(controlsDiv);
        
        // Track current rotation
        let currentRotation = 0;
        
        // Rotate left (counter-clockwise)
        rotateLeftBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentRotation = (currentRotation - 90) % 360;
            if (currentRotation < 0) currentRotation += 360;
            updateRotation();
        });
        
        // Rotate right (clockwise)
        rotateRightBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentRotation = (currentRotation + 90) % 360;
            updateRotation();
        });
        
        // Update the rotation class
        function updateRotation() {
            // Remove all rotation classes
            videoElement.classList.remove('video-rotate-90', 'video-rotate-180', 'video-rotate-270');
            
            // Add the appropriate rotation class
            if (currentRotation === 90) {
                videoElement.classList.add('video-rotate-90');
                container.style.paddingBottom = '56.25%'; // Reset to original aspect ratio
            } else if (currentRotation === 180) {
                videoElement.classList.add('video-rotate-180');
                container.style.paddingBottom = '56.25%'; // Reset to original aspect ratio
            } else if (currentRotation === 270) {
                videoElement.classList.add('video-rotate-270');
                container.style.paddingBottom = '56.25%'; // Reset to original aspect ratio
            } else {
                // Reset to original
                container.style.paddingBottom = '56.25%';
            }
        }
    });
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentSlide = 0;
    let slideInterval;
    const slideCount = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
        resetAutoSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
        resetAutoSlide();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Start auto sliding
    startAutoSlide();

    // Pause auto sliding on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto sliding when mouse leaves
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Initial update
    updateSlider();
});

// Image Showcase Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    
    // Function to update main image
    function updateMainImage(src, alt) {
        mainImage.src = src;
        mainImage.alt = alt;
        
        // Add animation class
        mainImage.classList.add('image-change');
        setTimeout(() => {
            mainImage.classList.remove('image-change');
        }, 300);
    }
    
    // Add click event to thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const src = this.src;
            const alt = this.alt;
            updateMainImage(src, alt);
        });
    });
    
    // Add hover effect to main image
    const mainImageContainer = document.querySelector('.main-image');
    const imageOverlay = document.querySelector('.image-overlay');
    
    mainImageContainer.addEventListener('mouseenter', () => {
        imageOverlay.style.transform = 'translateY(0)';
    });
    
    mainImageContainer.addEventListener('mouseleave', () => {
        imageOverlay.style.transform = 'translateY(100%)';
    });
}); 