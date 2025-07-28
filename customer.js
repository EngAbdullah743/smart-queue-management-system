 // Navigation between tabs
        const navItems = {
            'dashboard-nav': 'dashboard-content',
            'appointments-nav': 'appointments-content',
            'history-nav': 'history-content',
            'favorites-nav': 'favorites-content',
            'notifications-nav': 'notifications-content',
            'settings-nav': 'settings-content'
        };
        
        // Initialize event listeners for navigation
        Object.keys(navItems).forEach(navId => {
            const navElement = document.getElementById(navId);
            navElement.addEventListener('click', function() {
                // Hide all content sections
                Object.values(navItems).forEach(contentId => {
                    document.getElementById(contentId).style.display = 'none';
                });
                
                // Remove active class from all nav items
                Object.keys(navItems).forEach(id => {
                    document.getElementById(id).classList.remove('active');
                });
                
                // Show the selected content and mark nav as active
                document.getElementById(navItems[navId]).style.display = 'block';
                navElement.classList.add('active');
            });
        });
        
        // Setup View All links
        document.getElementById('view-all-appointments').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('appointments-nav').click();
        });
        
        document.getElementById('view-all-history').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('history-nav').click();
        });
        
        // Simulate cancel appointment functionality
        const cancelButtons = document.querySelectorAll('.appointment-action');
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel this appointment?')) {
                    // In a real app, this would call an API
                    const appointmentCard = this.closest('.appointment-card');
                    if (appointmentCard) {
                        appointmentCard.style.display = 'none';
                    }
                }
            });
        });
        
        // Simulate bookmark functionality
        const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
        bookmarkButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Remove this business from your favorites?')) {
                    // In a real app, this would call an API
                    const favoriteCard = this.closest('.favorite-card');
                    if (favoriteCard) {
                        favoriteCard.style.display = 'none';
                    }
                }
            });
        });
 
        
              // Dropdown toggle
    const userDropdownBtn = document.getElementById('userDropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    userDropdownBtn.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
        dropdownMenu.style.flexDirection = 'column';
    });
    
    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    profileBtn.addEventListener('click', function() {
        openPopup('profilePopup');
        dropdownMenu.style.display = 'none';
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        openPopup('logoutPopup');
        dropdownMenu.style.display = 'none';
    });
    
    // Popup controls
    function openPopup(id) {
        document.getElementById(id).classList.add('show');
    }
    
    function closePopup(id) {
        document.getElementById(id).classList.remove('show');
    }
    
    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('passwordField');
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function() {
            passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
        });
    }
    
    // Fake logout function
    function logout() {
        alert("Logged out!");
        closePopup('logoutPopup');
    }

// Replace your existing notification JavaScript with this complete version

document.addEventListener('DOMContentLoaded', function() {
    // Define the closePopup function globally
    window.closePopup = function(id) {
        const popup = document.getElementById(id);
        if (popup) {
            popup.classList.remove('show');
            popup.style.display = 'none';
        }
    };

    // Open popup function
    window.openPopup = function(id) {
        const popup = document.getElementById(id);
        if (popup) {
            popup.classList.add('show');
            popup.style.display = 'flex';
        }
    };

    // Notification button click handler
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            openPopup('notificationPopup');
        });
    }

    // Get all close buttons and add click handlers
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
        });
    });

    // Close popup when clicking outside the modal
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // Only close if the click is directly on the overlay, not its children
            if (event.target === overlay) {
                overlay.classList.remove('show');
                overlay.style.display = 'none';
            }
        });
    });

    // Additional specific handler for notification close button
    const notificationCloseButton = document.querySelector('#notificationPopup .modal-close');
    if (notificationCloseButton) {
        notificationCloseButton.addEventListener('click', function() {
            closePopup('notificationPopup');
        });
    }
});

 // Add this JavaScript to connect the sidebar logout button to the confirmation popup
document.addEventListener('DOMContentLoaded', function() {
    // Get the sidebar logout button
    const sidebarLogoutBtn = document.querySelector('.logout-container .nav-item');
    
    // Add click event listener to show the logout confirmation popup
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', function() {
            openPopup('logoutPopup');
        });
    }
    
    // Make sure the logout function exists (if not already defined elsewhere)
    if (typeof logout !== 'function') {
        window.logout = function() {
            alert("Logged out!");
            closePopup('logoutPopup');
            // In a real app, you would redirect to login page or perform actual logout
            // window.location.href = 'login.html';
        };
    }
    
    // Make sure popup functions are defined (if not already defined elsewhere)
    if (typeof openPopup !== 'function') {
        window.openPopup = function(id) {
            const popup = document.getElementById(id);
            if (popup) {
                popup.classList.add('show');
                popup.style.display = 'flex';
            }
        };
    }
    
    if (typeof closePopup !== 'function') {
        window.closePopup = function(id) {
            const popup = document.getElementById(id);
            if (popup) {
                popup.classList.remove('show');
                popup.style.display = 'none';
            }
        };
    }
    
    // Add click outside to close functionality for all popups
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                overlay.classList.remove('show');
                overlay.style.display = 'none';
            }
        });
    });
});
   
        // Add this at the start of your script to verify the notifications tab has content
document.addEventListener('DOMContentLoaded', function() {
  // Let's check the structure of the notifications tab
  const notificationsContent = document.getElementById('notifications-content');
  
  // Check if the notifications content area is empty or has no meaningful content
  if (notificationsContent) {
    const notificationsBody = notificationsContent.querySelector('.appointments-header + *');
    
    // If there's no content after the header, add some sample notifications
    if (!notificationsBody || notificationsBody.children.length === 0) {
      console.log('Adding sample notifications content');
      
      // Create a container for notifications
      const notificationsContainer = document.createElement('div');
      notificationsContainer.className = 'panel';
      
      // Add some sample notifications
      notificationsContainer.innerHTML = `
        <div style="padding: 1.5rem;">
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <i class="fas fa-calendar" style="color: #2563eb; margin-right: 0.75rem; font-size: 1.25rem;"></i>
              <span style="font-weight: 500; color: #111827;">Upcoming Appointment</span>
            </div>
            <p style="margin-left: 2.5rem; color: #4b5563; font-size: 0.875rem;">
              Your appointment at City Salon is tomorrow at 2:00 PM.
            </p>
            <p style="margin-left: 2.5rem; color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem;">
              April 24, 2025 • 10:15 AM
            </p>
          </div>
          
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <i class="fas fa-clock" style="color: #f59e0b; margin-right: 0.75rem; font-size: 1.25rem;"></i>
              <span style="font-weight: 500; color: #111827;">Wait Time Update</span>
            </div>
            <p style="margin-left: 2.5rem; color: #4b5563; font-size: 0.875rem;">
              The estimated wait time for your appointment at Dental Clinic has been updated to 10 minutes.
            </p>
            <p style="margin-left: 2.5rem; color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem;">
              April 23, 2025 • 3:45 PM
            </p>
          </div>
          
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <i class="fas fa-check-circle" style="color: #10b981; margin-right: 0.75rem; font-size: 1.25rem;"></i>
              <span style="font-weight: 500; color: #111827;">Appointment Confirmed</span>
            </div>
            <p style="margin-left: 2.5rem; color: #4b5563; font-size: 0.875rem;">
              Your appointment with Dental Clinic on May 3, 2025 has been confirmed.
            </p>
            <p style="margin-left: 2.5rem; color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem;">
              April 22, 2025 • 9:30 AM
            </p>
          </div>
          
          <div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <i class="fas fa-tag" style="color: #8b5cf6; margin-right: 0.75rem; font-size: 1.25rem;"></i>
              <span style="font-weight: 500; color: #111827;">Special Promotion</span>
            </div>
            <p style="margin-left: 2.5rem; color: #4b5563; font-size: 0.875rem;">
              City Salon is offering 20% off all services for returning customers this week.
            </p>
            <p style="margin-left: 2.5rem; color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem;">
              April 20, 2025 • 11:20 AM
            </p>
          </div>
        </div>
      `;
      
      // Add the notifications container after the header
      const headerElement = notificationsContent.querySelector('.appointments-header');
      if (headerElement) {
        headerElement.after(notificationsContainer);
      } else {
        notificationsContent.appendChild(notificationsContainer);
      }
    }
  }
});
   
        // Add this code to make the "Mark all as read" button work
document.addEventListener('DOMContentLoaded', function() {
  // Find the "Mark all as read" button
  const markAllReadBtn = document.querySelector('#notifications-content .btn');
  
  if (markAllReadBtn) {
    // Add click event listener
    markAllReadBtn.addEventListener('click', function() {
      // Find all notification items
      const notificationItems = document.querySelectorAll('#notifications-content .panel > div > div');
      
      // Process each notification
      notificationItems.forEach(item => {
        // Add a "read" class to mark it as read
        item.classList.add('read');
        
        // Change the styling to indicate it's been read
        item.style.opacity = '0.65';
        
        // Find the icon and change its color
        const icon = item.querySelector('i.fas');
        if (icon) {
          icon.style.color = '#9ca3af'; // Change to a lighter gray color
        }
      });
      
      // Update notification count in the sidebar
      const notificationBadge = document.querySelector('.notification-badge');
      if (notificationBadge) {
        notificationBadge.style.display = 'none';
        // Or alternatively set it to zero:
        // notificationBadge.textContent = '0';
      }
      
      // Provide visual feedback that the action was completed
      markAllReadBtn.textContent = 'All marked as read';
      markAllReadBtn.style.backgroundColor = '#10b981'; // Green color for success
      
      // After a delay, change it back
      setTimeout(() => {
        markAllReadBtn.textContent = 'Mark all as read';
        markAllReadBtn.style.backgroundColor = ''; // Revert to original color
      }, 2000);
    });
  }
});
