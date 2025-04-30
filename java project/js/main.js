// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu-open')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu-open';
                
                // Clone navigation links and auth buttons
                const navLinksClone = navLinks.cloneNode(true);
                const authButtonsClone = authButtons.cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(authButtonsClone);
                
                document.body.appendChild(mobileMenu);
                
                // Prevent scrolling when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                const mobileMenu = document.querySelector('.mobile-menu-open');
                mobileMenu.remove();
                
                // Restore scrolling
                document.body.style.overflow = '';
            }
        });
    }
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    if (nav && !nav.classList.contains('nav-scrolled')) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }
    
    // Admin sidebar toggle for mobile
    const adminMobileToggle = document.querySelector('.admin-mobile-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const adminOverlay = document.querySelector('.admin-overlay');
    
    if (adminMobileToggle && adminSidebar && adminOverlay) {
        adminMobileToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('open');
            adminOverlay.classList.toggle('open');
        });
        
        adminOverlay.addEventListener('click', function() {
            adminSidebar.classList.remove('open');
            adminOverlay.classList.remove('open');
        });
    }
});