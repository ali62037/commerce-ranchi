/* ============================================
   COMMERCE FUTURE POINT - Premium Coaching Institute Website
   JavaScript File
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = document.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // ===== STICKY HEADER ON SCROLL =====
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===== FLOATING BUTTONS TOGGLE =====
    const floatingToggle = document.getElementById('floatingToggle');
    const floatingButtons = document.querySelector('.floating-buttons');
    
    if (floatingToggle && floatingButtons) {
        floatingToggle.addEventListener('click', function() {
            floatingButtons.classList.toggle('active');
        });
        
        // Close floating buttons when clicking outside
        document.addEventListener('click', function(event) {
            if (!floatingButtons.contains(event.target)) {
                floatingButtons.classList.remove('active');
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation class to elements in viewport
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.animate-card, .animate-left, .animate-right');
        
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Add a small delay for staggered animation
                const index = Array.from(animateElements).indexOf(element);
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // Set initial state for animated elements
    const animateElements = document.querySelectorAll('.animate-card, .animate-left, .animate-right');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== SUBJECTS PAGE TAB FUNCTIONALITY =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // ===== FAQ ACCORDION FUNCTIONALITY =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
                
                // Close other FAQ items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset error messages
            resetErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const course = document.getElementById('course').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Please enter your full name');
                isValid = false;
            } else if (name.length < 3) {
                showError('nameError', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
            if (phone === '') {
                showError('phoneError', 'Please enter your phone number');
                isValid = false;
            } else if (!phoneRegex.test(phone)) {
                showError('phoneError', 'Please enter a valid 10-digit mobile number');
                isValid = false;
            }
            
            // Validate email (optional)
            if (email !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showError('emailError', 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Validate course
            if (course === '') {
                showError('courseError', 'Please select a course');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                const formSuccess = document.getElementById('formSuccess');
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
        
        // Helper function to show error messages
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Helper function to reset all error messages
        function resetErrors() {
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
                element.style.display = 'none';
            });
            
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'none';
            }
        }
        
        // Add input event listeners to clear errors when user starts typing
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            });
        });
    }
    
    // ===== RIPPLE EFFECT FOR BUTTONS =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            // Calculate position
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set styles for ripple
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process anchor links (not empty or #)
            if (href !== '#' && href !== '') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Calculate header height for offset
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== ADMISSION BANNER ANIMATION =====
    const admissionBanner = document.querySelector('.admission-banner');
    if (admissionBanner) {
        // Create a pulsing animation for the admission banner
        setInterval(() => {
            admissionBanner.style.transform = 'scale(1.01)';
            setTimeout(() => {
                admissionBanner.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
    
    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add styles to toast
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '15px 20px';
        toast.style.borderRadius = '5px';
        toast.style.color = '#ffffff';
        toast.style.fontWeight = '500';
        toast.style.zIndex = '10000';
        toast.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        
        // Set background color based on type
        if (type === 'success') {
            toast.style.backgroundColor = '#4caf50';
        } else if (type === 'error') {
            toast.style.backgroundColor = '#f44336';
        } else if (type === 'info') {
            toast.style.backgroundColor = '#2196f3';
        }
        
        // Add toast to body
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
    
    // ===== PAGE LOAD ANIMATION =====
    // Add a fade-in animation for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // ===== CURRENT YEAR IN FOOTER =====
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // ===== INITIALIZE ANIMATIONS ON LOAD =====
    // Trigger scroll animation once on page load
    setTimeout(animateOnScroll, 100);
    
    // Show a welcome message on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setTimeout(() => {
            showToast('Welcome to Commerce Future Point!', 'info');
        }, 1500);
    }
});

// ===== ADDITIONAL CSS FOR RIPPLE EFFECT =====
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: #ffffff;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .toast-success {
        background-color: #4caf50;
    }
    
    .toast-error {
        background-color: #f44336;
    }
    
    .toast-info {
        background-color: #2196f3;
    }
`;

document.head.appendChild(rippleStyle);

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop size
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const bars = document.querySelectorAll('.bar');
        if (bars.length > 0) {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
});