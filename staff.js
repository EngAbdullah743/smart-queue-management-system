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
  
        // DOM Elements
        const addCustomerBtn = document.getElementById('add-customer-btn');
        const addCustomerModal = document.getElementById('add-customer-modal');
        const addModalClose = document.getElementById('add-modal-close');
        const cancelAddBtn = document.getElementById('cancel-add');
        const addCustomerForm = document.getElementById('add-customer-form');
        
        const notifyModal = document.getElementById('notify-modal');
        const notifyModalClose = document.getElementById('notify-modal-close');
        const cancelNotifyBtn = document.getElementById('cancel-notify');
        const sendNotificationBtn = document.getElementById('send-notification');
        const notifyCustomerName = document.getElementById('notify-customer-name');
        const notifyCustomerPhone = document.getElementById('notify-customer-phone');
        
        const businessStatusToggle = document.getElementById('business-status-toggle');
        const statusLabel = document.getElementById('status-label');
        
        const serveNextBtn = document.getElementById('serve-next-btn');
        const queueTable = document.getElementById('queue-table');
        const queueBody = document.getElementById('queue-body');
        const emptyQueue = document.getElementById('empty-queue');
        const activeCustomersCount = document.getElementById('active-customers');
        const customersServedCount = document.getElementById('customers-served');
        const searchInput = document.getElementById('search-input');
        
        // Sample queue data
        let queueEntries = [
            { id: 1, token: "A-12", name: "John Davis", service: "Haircut", waitTime: "Current", status: "current", phone: "(123) 456-7890", notes: "" },
            { id: 2, token: "A-13", name: "Emily Wilson", service: "Hair Coloring", waitTime: "15 min", status: "waiting", priority: true, phone: "(234) 567-8901", notes: "First time customer" },
            { id: 3, token: "A-14", name: "Michael Brown", service: "Consultation", waitTime: "30 min", status: "waiting", phone: "(345) 678-9012", notes: "" },
            { id: 4, token: "A-15", name: "Jessica Lee", service: "Facial", waitTime: "45 min", status: "waiting", phone: "(456) 789-0123", notes: "Allergic to nuts" },
            { id: 5, token: "A-16", name: "Robert Smith", service: "Haircut", waitTime: "60 min", status: "waiting", phone: "(567) 890-1234", notes: "" }
        ];
        
        // Stats
        let stats = {
            activeQueues: queueEntries.length,
            avgWaitTime: 18,
            servedToday: 42,
            serviceDuration: 15
        };
        
        // Business status toggle
        businessStatusToggle.addEventListener('change', function() {
            if (this.checked) {
                statusLabel.textContent = 'Open';
                statusLabel.classList.remove('closed');
                statusLabel.classList.add('open');
            } else {
                statusLabel.textContent = 'Closed';
                statusLabel.classList.remove('open');
                statusLabel.classList.add('closed');
            }
        });
        
        // Add Customer Modal
        addCustomerBtn.addEventListener('click', function() {
            addCustomerModal.style.display = 'flex';
        });
        
        function closeAddModal() {
            addCustomerModal.style.display = 'none';
            addCustomerForm.reset();
        }
        
        addModalClose.addEventListener('click', closeAddModal);
        cancelAddBtn.addEventListener('click', closeAddModal);
        
        // Close modal when clicking outside
        addCustomerModal.addEventListener('click', function(e) {
            if (e.target === addCustomerModal) {
                closeAddModal();
            }
        });
        
        // Submit Add Customer Form
        addCustomerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const notes = document.getElementById('notes').value;
            const priority = document.getElementById('priority').checked;
            
            // Create new customer entry
            const newId = queueEntries.length > 0 ? Math.max(...queueEntries.map(entry => entry.id)) + 1 : 1;
            const newToken = `A-${17 + queueEntries.length}`; // Simple token generation
            const newWaitTime = `${queueEntries.length * 15} min`;
            const newStatus = queueEntries.length === 0 || !queueEntries.some(entry => entry.status === 'current') ? "current" : "waiting";
            
            const newEntry = {
                id: newId,
                token: newToken,
                name: name,
                service: service,
                waitTime: newStatus === 'current' ? 'Current' : newWaitTime,
                status: newStatus,
                priority: priority,
                phone: phone,
                notes: notes
            };
            
            // Add to queue data
            queueEntries.push(newEntry);
            
            // Update stats
            stats.activeQueues += 1;
            updateStats();
            
            // Update UI
            renderQueueTable();
            
            // Close modal
            closeAddModal();
        });
        
        // Notify Customer Modal
        function openNotifyModal(customer) {
            notifyCustomerName.textContent = customer.name;
            notifyCustomerPhone.textContent = customer.phone;
            notifyModal.style.display = 'flex';
        }
        
        function closeNotifyModal() {
            notifyModal.style.display = 'none';
        }
        
        notifyModalClose.addEventListener('click', closeNotifyModal);
        cancelNotifyBtn.addEventListener('click', closeNotifyModal);
        
        // Close notify modal when clicking outside
        notifyModal.addEventListener('click', function(e) {
            if (e.target === notifyModal) {
                closeNotifyModal();
            }
        });
        
        // Send notification
        sendNotificationBtn.addEventListener('click', function() {
            alert(`Notification sent to ${notifyCustomerName.textContent}`);
            closeNotifyModal();
        });
        
        // Handle Serve Next
        serveNextBtn.addEventListener('click', function() {
            const currentIndex = queueEntries.findIndex(entry => entry.status === 'current');
            
            // Mark current customer as completed and remove from queue
            if (currentIndex !== -1) {
                queueEntries.splice(currentIndex, 1);
                
                // Update the served count
                stats.servedToday += 1;
                stats.activeQueues -= 1;
            }
            
            // Find the next customer (priority customers first)
            const priorityIndex = queueEntries.findIndex(entry => entry.priority);
            const nextIndex = priorityIndex !== -1 ? priorityIndex : 0;
            
            // Update the next customer to current if there are any left
            if (queueEntries.length > 0) {
                queueEntries[nextIndex].status = 'current';
                queueEntries[nextIndex].waitTime = 'Current';
            }
            
            // Update UI
            updateStats();
            renderQueueTable();
        });
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            renderQueueTable();
        });
        
        // Complete customer service (removes them from queue)
        function completeCustomer(id) {
            const index = queueEntries.findIndex(entry => entry.id === id);
            
            if (index !== -1) {
                queueEntries.splice(index, 1);
                
                // Update stats
                stats.activeQueues -= 1;
                stats.servedToday += 1;
                
                // Update UI
                updateStats();
                renderQueueTable();
            }
        }
        
        // Setup action buttons
        function setupActionButtons() {
            // Complete buttons
            document.querySelectorAll('.action-btn.complete').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const id = parseInt(row.dataset.id);
                    completeCustomer(id);
                });
            });
            
            // Notify buttons
            document.querySelectorAll('.action-btn.notify, .action-btn.notify-amber').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const id = parseInt(row.dataset.id);
                    const customer = queueEntries.find(entry => entry.id === id);
                    if (customer) {
                        openNotifyModal(customer);
                    }
                });
            });
            
            // Serve now buttons
            document.querySelectorAll('.action-btn.serve').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const id = parseInt(row.dataset.id);
                    
                    // Find current customer and change back to waiting
                    const currentIndex = queueEntries.findIndex(entry => entry.status === 'current');
                    if (currentIndex !== -1) {
                        queueEntries[currentIndex].status = 'waiting';
                        queueEntries[currentIndex].waitTime = '15 min';
                    }
                    
                    // Set the selected customer as current
                    const selectedIndex = queueEntries.findIndex(entry => entry.id === id);
                    if (selectedIndex !== -1) {
                        queueEntries[selectedIndex].status = 'current';
                        queueEntries[selectedIndex].waitTime = 'Current';
                    }
                    
                    // Update UI
                    renderQueueTable();
                });
            });
        }
        
        // Update stats display
        function updateStats() {
            activeCustomersCount.textContent = stats.activeQueues;
            customersServedCount.textContent = stats.servedToday;
        }
        
        // Render queue table
        function renderQueueTable() {
            // Filter queue entries based on search
            const searchTerm = searchInput.value.toLowerCase();
            const filteredEntries = queueEntries.filter(entry => 
                entry.name.toLowerCase().includes(searchTerm) ||
                entry.token.toLowerCase().includes(searchTerm) ||
                entry.phone.includes(searchTerm)
            );
            
            // Show empty state if no entries
            if (filteredEntries.length === 0) {
                queueTable.style.display = 'none';
                emptyQueue.style.display = 'block';
                return;
            }
            
            // Otherwise show table and hide empty state
            queueTable.style.display = 'table';
            emptyQueue.style.display = 'none';
            
            // Clear existing rows
            queueBody.innerHTML = '';
            
            // Add filtered entries
            filteredEntries.forEach(entry => {
                const row = document.createElement('tr');
                row.dataset.id = entry.id;
                
                if (entry.status === 'current') {
                    row.classList.add('current-customer');
                } else if (entry.priority) {
                    row.classList.add('priority-customer');
                }
                
                row.innerHTML = `
                    <td>${entry.token}</td>
                    <td>
                        <div class="customer-name">${entry.name}</div>
                        <div class="customer-phone">${entry.phone}</div>
                        ${entry.notes ? `<div class="customer-notes">${entry.notes}</div>` : ''}
                    </td>
                    <td>${entry.service}</td>
                    <td>
                        ${entry.status === 'current' 
                            ? `<span class="status-badge current">Current</span>` 
                            : entry.waitTime}
                    </td>
                    <td>
                        ${entry.status === 'current' 
                            ? `<span class="status-badge current">Serving</span>`
                            : entry.priority 
                                ? `<span class="status-badge priority">Priority</span>`
                                : `<span class="status-badge waiting">Waiting</span>`}
                    </td>
                    <td>
                        <div class="action-buttons">
                            ${entry.status === 'current' 
                                ? `
                                    <button class="action-btn complete" title="Complete">
                                        <i class="fas fa-user-check"></i>
                                    </button>
                                    <button class="action-btn notify" title="Notify">
                                        <i class="fas fa-bell"></i>
                                    </button>
                                `
                                : `
                                    <button class="action-btn serve" title="Serve Now">
                                        <i class="fas fa-user"></i>
                                    </button>
                                    <button class="action-btn notify-amber" title="Notify">
                                        <i class="fas fa-bell"></i>
                                    </button>
                                `}
                        </div>
                    </td>
                `;
                
                queueBody.appendChild(row);
            });
            
            // Setup action buttons for the new rows
            setupActionButtons();
        }
        
        // Initialize
        updateStats();
        setupActionButtons();
   
    // Notification button click
    const notificationBtn = document.getElementById('notificationBtn');
    notificationBtn.addEventListener('click', function() {
        openPopup('notificationPopup');
    });
   
        // Add this JavaScript code to toggle the performance analytics section

document.addEventListener('DOMContentLoaded', function() {
    // Get the dropdown button and analytics content
    const actionDropdownBtn = document.querySelector('.action-dropdown');
    const performanceAnalyticsContent = document.getElementById('performance-analytics-content');
    
    // Add click event to dropdown button
    if (actionDropdownBtn && performanceAnalyticsContent) {
        actionDropdownBtn.addEventListener('click', function() {
            // Toggle the active class on the button
            this.classList.toggle('active');
            
            // Toggle the display of the analytics content
            if (performanceAnalyticsContent.style.display === 'none' || performanceAnalyticsContent.style.display === '') {
                performanceAnalyticsContent.style.display = 'block';
                
                // Add subtle animation
                performanceAnalyticsContent.style.opacity = '0';
                performanceAnalyticsContent.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    performanceAnalyticsContent.style.opacity = '1';
                    performanceAnalyticsContent.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Add subtle closing animation
                performanceAnalyticsContent.style.opacity = '0';
                performanceAnalyticsContent.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    performanceAnalyticsContent.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add hover effect to service bars
    const serviceBars = document.querySelectorAll('.service-bar-inner');
    serviceBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add hover effect to hour bars
    const hourBars = document.querySelectorAll('.hour-bar-inner');
    hourBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

// File Import Functionality
const importBtn = document.getElementById('import-btn');
    const fileInput = document.getElementById('file-import-input');
    
    if (importBtn && fileInput) {
        importBtn.addEventListener('click', function() {
            fileInput.click(); // Trigger the hidden file input
        });
        
        fileInput.addEventListener('change', function(event) {
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                
                // Show file name in a notification or alert
                const fileName = file.name;
                
                // You could replace this with a more sophisticated notification
                alert(`Importing file: ${fileName}`);
                
                // In a real application, you would process the file here
                // For example, read CSV data and update the charts
                
                // Reset the input so the same file can be selected again
                fileInput.value = '';
            }
        });
    }
    
    // Improved Busy Hour Bars Interaction
    const busyHourBars = document.querySelectorAll('.busy-hour-bar');
    
    if (busyHourBars) {
        busyHourBars.forEach(bar => {
            // Add glow effect on hover
            bar.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.5)';
                this.style.opacity = '0.8';
                
                // Get height percentage for tooltip
                const height = this.style.height;
                const percent = height.replace('%', '');
                
                // Show tooltip with exact percentage
                const item = this.closest('.busy-hour-item');
                const label = item.querySelector('.busy-hour-label').textContent;
                
                // You can create a custom tooltip here if needed
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
                this.style.opacity = '1';
            });
        });
    }
    
    // Time Period Select Interaction
    const timePeriodSelect = document.getElementById('time-period-select');
    
    if (timePeriodSelect) {
        timePeriodSelect.addEventListener('change', function() {
            const selectedPeriod = this.value;
            
            // In a real application, you would update the analytics data here
            // based on the selected time period
            
            // For demonstration purposes, just show what was selected
            console.log(`Selected time period: ${selectedPeriod}`);
        });
    }
;