document.addEventListener('DOMContentLoaded', function() {
    // Admin login functionality
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }
            
            // In a real app, this would make an API call to verify credentials
            // For demo purposes, we'll use hardcoded credentials
            if (username === 'admin' && password === 'admin123') {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
        
        // Allow pressing Enter to login
        document.getElementById('password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
    }
    
    // Admin dashboard charts (in a real app, you'd use a library like Chart.js)
    
    // Admin mobile sidebar toggle
    const mobileToggle = document.querySelector('.admin-mobile-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const adminOverlay = document.querySelector('.admin-overlay');
    
    if (mobileToggle && adminSidebar && adminOverlay) {
        mobileToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('open');
            adminOverlay.classList.toggle('open');
        });
        
        adminOverlay.addEventListener('click', function() {
            adminSidebar.classList.remove('open');
            adminOverlay.classList.remove('open');
        });
    }
    
    // Table row actions
    const actionButtons = document.querySelectorAll('.admin-action-btn');
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const action = this.classList.contains('edit') ? 'edit' : 
                               this.classList.contains('view') ? 'view' : 'delete';
                
                // Get movie/item details from table row
                const row = this.closest('tr');
                const title = row.querySelector('.admin-movie-info h4')?.textContent || 'this item';
                
                if (action === 'edit') {
                    // In a real app, this would open an edit form or redirect to an edit page
                    alert(`Edit functionality for "${title}" would be implemented here.`);
                } else if (action === 'view') {
                    // In a real app, this would show details or redirect to a details page
                    alert(`View functionality for "${title}" would be implemented here.`);
                } else if (action === 'delete') {
                    // In a real app, this would show a confirmation dialog and then delete the item
                    if (confirm(`Are you sure you want to delete "${title}"?`)) {
                        // Simulating deletion by removing row from table
                        row.remove();
                    }
                }
            });
        });
    }
});