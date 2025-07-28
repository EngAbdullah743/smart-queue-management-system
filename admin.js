        // Tab Navigation
        const tabLinks = {
            'dashboard-link': 'dashboard-tab',
            'businesses-link': 'businesses-tab',
            'staff-link': 'staff-tab',
            'analytics-link': 'analytics-tab',
            'settings-link': 'settings-tab'
        };
        
        // Initialize tab functionality
        Object.keys(tabLinks).forEach(linkId => {
            const link = document.getElementById(linkId);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide all tabs
                Object.values(tabLinks).forEach(tabId => {
                    document.getElementById(tabId).style.display = 'none';
                });
                
                // Remove active class from all links
                Object.keys(tabLinks).forEach(id => {
                    document.getElementById(id).classList.remove('active');
                });
                
                // Show the selected tab and mark link as active
                document.getElementById(tabLinks[linkId]).style.display = 'block';
                link.classList.add('active');
            });
        });
        
        // Delete business handler
        const deleteBusinessBtns = document.querySelectorAll('#businesses-tab .action-btn.delete');
        deleteBusinessBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this business?')) {
                    // In a real app, this would call an API
                    const row = this.closest('tr');
                    row.remove();
                }
            });
        });
        
        // Delete staff handler
        const deleteStaffBtns = document.querySelectorAll('#staff-tab .action-btn.delete');
        deleteStaffBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this staff member?')) {
                    // In a real app, this would call an API
                    const row = this.closest('tr');
                    row.remove();
                }
            });
        });

        // Business Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Business data (in a real app, this would come from a database)
    const businessData = {
        'City Salon': {
            owner: 'Sarah Johnson',
            type: 'Salon',
            email: 'info@citysalon.com',
            phone: '(555) 123-4567'
        },
        'Metro Clinic': {
            owner: 'Dr. Emily Martinez',
            type: 'Healthcare',
            email: 'contact@metroclinic.com',
            phone: '(555) 987-6543'
        },
        'Tech Repair Shop': {
            owner: 'Michael Chen',
            type: 'Repair',
            email: 'support@techrepair.com',
            phone: '(555) 456-7890'
        },
        'Gourmet Bistro': {
            owner: 'Chef Antonio',
            type: 'Restaurant',
            email: 'reservations@gourmetbistro.com',
            phone: '(555) 789-0123'
        },
        'Wellness Spa': {
            owner: 'Jessica Williams',
            type: 'Spa',
            email: 'appointments@wellnessspa.com',
            phone: '(555) 321-6540'
        }
    };

    // Get modal elements
    const modal = document.getElementById('business-modal');
    const modalBusinessName = document.getElementById('modal-business-name');
    const modalName = document.getElementById('modal-name');
    const modalOwner = document.getElementById('modal-owner');
    const modalType = document.getElementById('modal-type');
    const modalEmail = document.getElementById('modal-email');
    const modalPhone = document.getElementById('modal-phone');
    
    // Get all view buttons
    const viewButtons = document.querySelectorAll('#businesses-tab .action-btn.view');
    
    // Add click event to each view button
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get the business name from the row
            const row = this.closest('tr');
            const businessName = row.querySelector('.td-name').textContent.trim();
            
            // Get business data
            const business = businessData[businessName];
            if (business) {
                // Populate modal with business data
                modalBusinessName.textContent = businessName;
                modalName.textContent = businessName;
                modalOwner.textContent = business.owner;
                modalType.textContent = business.type;
                modalEmail.textContent = business.email;
                modalPhone.textContent = business.phone;
                
                // Show the modal
                modal.style.display = 'block';
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking the X
    const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Business Edit Modal Functionality
setTimeout(function() {
    // Business data in array format (matching the order in the table)
    // If businessData is not already defined, initialize it with the businesses from the table
    if (typeof window.businessData === 'undefined') {
        window.businessData = [
            {
                name: "City Salon",
                owner: "Sarah Johnson",
                type: "Salon",
                email: "info@citysalon.com",
                phone: "(555) 123-4567",
                activeQueues: 12,
                status: "Active"
            },
            {
                name: "Metro Clinic",
                owner: "Dr. Emily Martinez",
                type: "Healthcare",
                email: "contact@metroclinic.com",
                phone: "(555) 987-6543",
                activeQueues: 8,
                status: "Active"
            },
            {
                name: "Tech Repair Shop",
                owner: "Michael Chen",
                type: "Repair",
                email: "support@techrepair.com",
                phone: "(555) 456-7890",
                activeQueues: 5,
                status: "Inactive"
            },
            {
                name: "Gourmet Bistro",
                owner: "Chef Antonio",
                type: "Restaurant",
                email: "reservations@gourmetbistro.com",
                phone: "(555) 789-0123",
                activeQueues: 9,
                status: "Active"
            },
            {
                name: "Wellness Spa",
                owner: "Jessica Williams",
                type: "Spa",
                email: "appointments@wellnessspa.com",
                phone: "(555) 321-6540",
                activeQueues: 0,
                status: "Inactive"
            }
        ];
    }
    
    // Get DOM elements
    const businessEditModal = document.getElementById('business-edit-modal');
    const closeBusinessEdit = document.getElementById('close-business-edit');
    const businessEditCancel = document.getElementById('business-edit-cancel');
    const businessEditSave = document.getElementById('business-edit-save');
    const editBusinessIndex = document.getElementById('edit-business-index');
    const editBusinessName = document.getElementById('edit-business-name');
    const editBusinessOwner = document.getElementById('edit-business-owner');
    const editBusinessType = document.getElementById('edit-business-type');
    const editBusinessEmail = document.getElementById('edit-business-email');
    const editBusinessPhone = document.getElementById('edit-business-phone');
    
    // Function to close the modal
    function closeEditBusinessModal() {
        if (businessEditModal) {
            businessEditModal.style.display = 'none';
        }
    }
    
    // Add click handlers to close buttons
    if (closeBusinessEdit) {
        closeBusinessEdit.addEventListener('click', closeEditBusinessModal);
    }
    
    if (businessEditCancel) {
        businessEditCancel.addEventListener('click', closeEditBusinessModal);
    }
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === businessEditModal) {
            closeEditBusinessModal();
        }
    });
    
    // Find all edit buttons in the businesses tab
    const businessesTab = document.getElementById('businesses-tab');
    if (businessesTab) {
        const editButtons = businessesTab.querySelectorAll('.action-btn.edit');
        
        // Add click handler to each edit button
        editButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get business data and populate form
                if (index < window.businessData.length) {
                    const business = window.businessData[index];
                    
                    // Populate form fields
                    editBusinessIndex.value = index;
                    editBusinessName.value = business.name;
                    editBusinessOwner.value = business.owner;
                    editBusinessType.value = business.type;
                    editBusinessEmail.value = business.email || '';
                    editBusinessPhone.value = business.phone || '';
                    
                    // Show the modal
                    businessEditModal.style.display = 'block';
                }
            });
        });
        
        // Handle save button click
        if (businessEditSave) {
            businessEditSave.addEventListener('click', function() {
                // Get form values
                const index = parseInt(editBusinessIndex.value);
                const name = editBusinessName.value.trim();
                const owner = editBusinessOwner.value.trim();
                const type = editBusinessType.value.trim();
                const email = editBusinessEmail.value.trim();
                const phone = editBusinessPhone.value.trim();
                
                // Basic validation
                if (!name || !owner || !type) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Make sure index is valid
                if (index >= 0 && index < window.businessData.length) {
                    // Update businessData
                    window.businessData[index].name = name;
                    window.businessData[index].owner = owner;
                    window.businessData[index].type = type;
                    window.businessData[index].email = email;
                    window.businessData[index].phone = phone;
                    
                    // Update the table row
                    const rows = businessesTab.querySelectorAll('table tbody tr');
                    if (index < rows.length) {
                        const row = rows[index];
                        const cells = row.querySelectorAll('td');
                        
                        // Update business name cell
                        if (cells[0]) {
                            // This assumes the business name is a direct text node
                            // If it's wrapped in a div or span, you might need to adjust this
                            cells[0].querySelector('.td-name').textContent = name;
                        }
                        
                        // Update owner cell
                        if (cells[1]) cells[1].textContent = owner;
                        
                        // Update type cell
                        if (cells[2]) cells[2].textContent = type;
                    }
                    
                    // Update businessInfo if it exists (for consistency with view modal)
                    if (window.businessInfo) {
                        // Update the corresponding business info
                        window.businessInfo[name] = {
                            owner: owner,
                            type: type,
                            email: email,
                            phone: phone
                        };
                    }
                    
                    // Show success message
                    alert('Business information updated successfully!');
                    
                    // Close the modal
                    closeEditBusinessModal();
                }
            });
        }
    }
}, 1500); // 1.5 second delay to ensure everything is loaded

// Add Business Modal Functionality
setTimeout(function() {
    // Get DOM elements
    const addBusinessBtn = document.querySelector('#businesses-tab .table-action');
    const addBusinessModal = document.getElementById('add-business-modal');
    const closeAddBusiness = document.getElementById('close-add-business');
    const cancelAddBusiness = document.getElementById('cancel-add-business');
    const saveAddBusiness = document.getElementById('save-add-business');
    const togglePasswordBtn = document.getElementById('toggle-add-business-password');
    
    // Exit if elements don't exist yet
    if (!addBusinessBtn || !addBusinessModal) return;
    
    // Add click event to the "Add Business" button
    addBusinessBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addBusinessModal.style.display = 'block';
    });
    
    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const passwordField = document.getElementById('add-business-password');
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Function to close and reset modal
    function closeAddBusinessModal() {
        // Hide modal
        addBusinessModal.style.display = 'none';
        
        // Reset form fields
        document.getElementById('add-business-name').value = '';
        document.getElementById('add-business-owner').value = '';
        document.getElementById('add-business-type').value = '';
        document.getElementById('add-business-email').value = '';
        document.getElementById('add-business-phone').value = '';
        
        // Reset password field
        const passwordField = document.getElementById('add-business-password');
        if (passwordField) {
            passwordField.value = '';
            passwordField.type = 'password';
        }
        
        // Reset eye icon
        const icon = document.querySelector('#toggle-add-business-password i');
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Setup close button handlers
    if (closeAddBusiness) {
        closeAddBusiness.addEventListener('click', closeAddBusinessModal);
    }
    
    if (cancelAddBusiness) {
        cancelAddBusiness.addEventListener('click', closeAddBusinessModal);
    }
    
    // Close when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === addBusinessModal) {
            closeAddBusinessModal();
        }
    });
    
    // Handle save button click
    if (saveAddBusiness) {
        saveAddBusiness.addEventListener('click', function() {
            // Get form values
            const name = document.getElementById('add-business-name').value.trim();
            const owner = document.getElementById('add-business-owner').value.trim();
            const type = document.getElementById('add-business-type').value.trim();
            const email = document.getElementById('add-business-email').value.trim();
            const password = document.getElementById('add-business-password').value.trim();
            const phone = document.getElementById('add-business-phone').value.trim();
            
            // Basic validation
            if (!name || !owner || !type || !email || !password || !phone) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Initialize businessData if it doesn't exist
            if (typeof window.businessData === 'undefined') {
                window.businessData = [];
            }
            
            // Add the new business to businessData
            window.businessData.push({
                name: name,
                owner: owner,
                type: type,
                email: email,
                password: password,
                phone: phone,
                activeQueues: 0,
                status: "Active"
            });
            
            // Update businessInfo if it exists (for view modal)
            if (typeof window.businessInfo !== 'undefined') {
                window.businessInfo[name] = {
                    owner: owner,
                    type: type,
                    email: email,
                    phone: phone,
                    password: password
                };
            }
            
            // Find business table
            const businessTable = document.querySelector('#businesses-tab table tbody');
            if (businessTable) {
                // Create new row
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="td-name">${name}</td>
                    <td class="td-text">${owner}</td>
                    <td class="td-text">${type}</td>
                    <td class="td-text">0</td>
                    <td>
                        <span class="status-pill active">Active</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn view" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                // Add to table
                businessTable.appendChild(newRow);
                
                // Attach event handlers to new buttons
                const viewBtn = newRow.querySelector('.action-btn.view');
                const editBtn = newRow.querySelector('.action-btn.edit');
                const deleteBtn = newRow.querySelector('.action-btn.delete');
                
                // View button handler
                if (viewBtn) {
                    viewBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const modal = document.getElementById('business-modal');
                        if (modal) {
                            // Update modal content based on your business modal structure
                            document.getElementById('modal-business-name').textContent = name;
                            document.getElementById('modal-name').textContent = name;
                            document.getElementById('modal-owner').textContent = owner;
                            document.getElementById('modal-type').textContent = type;
                            document.getElementById('modal-email').textContent = email;
                            document.getElementById('modal-phone').textContent = phone;
                            
                            // Show modal
                            modal.style.display = 'block';
                        }
                    });
                }
                
                // Edit button handler
                if (editBtn) {
                    editBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const editModal = document.getElementById('business-edit-modal');
                        if (editModal) {
                            // Get the last index of the businessData array
                            const newIndex = window.businessData.length - 1;
                            
                            // Update form fields
                            document.getElementById('edit-business-index').value = newIndex;
                            document.getElementById('edit-business-name').value = name;
                            document.getElementById('edit-business-owner').value = owner;
                            document.getElementById('edit-business-type').value = type;
                            document.getElementById('edit-business-email').value = email;
                            document.getElementById('edit-business-phone').value = phone;
                            
                            // Show modal
                            editModal.style.display = 'block';
                        }
                    });
                }
                
                // Delete button handler
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this business?')) {
                            newRow.remove();
                        }
                    });
                }
                
                // Show success message
                alert('Business added successfully!');
                
                // Close the modal
                closeAddBusinessModal();
            }
        });
    }
}, 2000); // Using a longer delay to ensure all other scripts have loaded

 // Staff Edit Modal Functionality
setTimeout(function() {
    // Staff data in array format (matching the order in the table)
    // If staffData is not already defined, initialize it with the staff members from the table
    if (typeof window.staffData === 'undefined') {
        window.staffData = [
            {
                name: "John Smith",
                email: "john@cityhairstudio.com",
                role: "Staff",
                business: "City Salon",
                phone: "(555) 234-5678",
                password: "Js123456"
            },
            {
                name: "Maria Garcia",
                email: "maria@cityhairstudio.com", 
                role: "Manager",
                business: "City Salon",
                phone: "(555) 345-6789",
                password: "Mg789012"
            },
            {
                name: "Dr. Alex Johnson",
                email: "alex@metroclinic.com",
                role: "Staff", 
                business: "Metro Clinic",
                phone: "(555) 456-7890",
                password: "Aj456789"
            },
            {
                name: "Emma Wilson",
                email: "emma@techrepair.com",
                role: "Staff",
                business: "Tech Repair Shop",
                phone: "(555) 567-8901",
                password: "Ew567890"
            },
            {
                name: "Robert Brown",
                email: "robert@gourmetbistro.com",
                role: "Manager",
                business: "Gourmet Bistro",
                phone: "(555) 678-9012",
                password: "Rb678901"
            }
        ];
    }
    
    // Get DOM elements
    const staffEditModal = document.getElementById('staff-edit-modal');
    const closeStaffEditModal = document.getElementById('close-staff-edit-modal');
    const staffEditCancel = document.getElementById('staff-edit-cancel');
    const staffEditSave = document.getElementById('staff-edit-save');
    const editStaffName = document.getElementById('edit-staff-name');
    const editStaffIndex = document.getElementById('edit-staff-index');
    const editStaffEmail = document.getElementById('edit-staff-email');
    const editStaffRole = document.getElementById('edit-staff-role');
    const editStaffBusiness = document.getElementById('edit-staff-business');
    const editStaffPhone = document.getElementById('edit-staff-phone');
    
    // Function to close the modal
    function closeEditModal() {
        if (staffEditModal) {
            staffEditModal.style.display = 'none';
        }
    }
    
    // Add click handlers to close buttons
    if (closeStaffEditModal) {
        closeStaffEditModal.addEventListener('click', closeEditModal);
    }
    
    if (staffEditCancel) {
        staffEditCancel.addEventListener('click', closeEditModal);
    }
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === staffEditModal) {
            closeEditModal();
        }
    });
    
    // Find all edit buttons in the staff tab
    const staffTab = document.getElementById('staff-tab');
    if (staffTab) {
        const editButtons = staffTab.querySelectorAll('.action-btn.edit');
        
        // Add click handler to each edit button
        editButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get staff data and populate form
                if (index < window.staffData.length) {
                    const staff = window.staffData[index];
                    
                    // Populate form fields
                    editStaffName.textContent = staff.name;
                    editStaffIndex.value = index;
                    editStaffEmail.value = staff.email;
                    editStaffRole.value = staff.role;
                    editStaffBusiness.value = staff.business;
                    editStaffPhone.value = staff.phone;
                    
                    // Show the modal
                    staffEditModal.style.display = 'block';
                }
            });
        });
        
        // Handle save button click
        if (staffEditSave) {
            staffEditSave.addEventListener('click', function() {
                // Get form values
                const index = parseInt(editStaffIndex.value);
                const email = editStaffEmail.value.trim();
                const role = editStaffRole.value.trim();
                const business = editStaffBusiness.value.trim();
                const phone = editStaffPhone.value.trim();
                
                // Basic validation
                if (!email || !role || !business || !phone) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Make sure index is valid
                if (index >= 0 && index < window.staffData.length) {
                    // Update staffData
                    window.staffData[index].email = email;
                    window.staffData[index].role = role;
                    window.staffData[index].business = business;
                    window.staffData[index].phone = phone;
                    
                    // Update the table row
                    const rows = staffTab.querySelectorAll('table tbody tr');
                    if (index < rows.length) {
                        const row = rows[index];
                        const cells = row.querySelectorAll('td');
                        
                        // Update email cell
                        if (cells[1]) cells[1].textContent = email;
                        
                        // Update role cell
                        if (cells[2]) cells[2].textContent = role;
                        
                        // Update business cell
                        if (cells[3]) cells[3].textContent = business;
                    }
                    
                    // Update staffInfo if it exists (for consistency with your View modal)
                    if (window.staffInfo) {
                        // Find the correct key
                        const keys = Object.keys(window.staffInfo);
                        if (index < keys.length) {
                            const key = keys[index];
                            window.staffInfo[key].email = email;
                            window.staffInfo[key].role = role;
                            window.staffInfo[key].business = business;
                            window.staffInfo[key].phone = phone;
                        }
                    }
                    
                    // Show success message
                    alert('Staff information updated successfully!');
                    
                    // Close the modal
                    closeEditModal();
                }
            });
        }
    }
}, 1500); // 1.5 second delay to ensure everything is loaded

// Add Staff Member Modal Functionality
    document.addEventListener('DOMContentLoaded', function() {
            const addStaffModal = document.getElementById('add-staff-modal');
            const addStaffButton = document.getElementById('add-staff-button');
            const closeAddStaffButton = document.getElementById('close-add-staff');
            const cancelAddStaffButton = document.getElementById('add-staff-cancel');
            const submitAddStaffButton = document.getElementById('add-staff-submit');
            
            // Open the modal when clicking the add staff button
            addStaffButton.addEventListener('click', function() {
                addStaffModal.style.display = 'block';
            });
            
            // Close modal function
            function closeAddStaffModal() {
                addStaffModal.style.display = 'none';
                // Clear form inputs
                document.getElementById('add-staff-name').value = '';
                document.getElementById('add-staff-email').value = '';
                document.getElementById('add-staff-role').value = '';
                document.getElementById('add-staff-business').value = '';
                document.getElementById('add-staff-phone').value = '';
                document.getElementById('add-staff-password').value = '';
            }
            
            // Close on X button click
            closeAddStaffButton.addEventListener('click', closeAddStaffModal);
            
            // Close on Cancel button click
            cancelAddStaffButton.addEventListener('click', closeAddStaffModal);
            
            // Close when clicking outside the modal
            window.addEventListener('click', function(event) {
                if (event.target === addStaffModal) {
                    closeAddStaffModal();
                }
            });
            
            // Close when pressing ESC key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && addStaffModal.style.display === 'block') {
                    closeAddStaffModal();
                }
            });
            
            // Handle form submission
            submitAddStaffButton.addEventListener('click', function() {
                // Get form values
                const name = document.getElementById('add-staff-name').value.trim();
                const email = document.getElementById('add-staff-email').value.trim();
                const role = document.getElementById('add-staff-role').value.trim();
                const business = document.getElementById('add-staff-business').value.trim();
                const phone = document.getElementById('add-staff-phone').value.trim();
                const password = document.getElementById('add-staff-password').value.trim();
                
                // Validate form
                if (!name || !email || !role || !business || !phone || !password) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Create table row
                const staffTable = document.querySelector('#staff-tab table tbody');
                const newRow = document.createElement('tr');
                
                // Get initials for avatar
                const initials = name.split(' ')
                    .map(part => part.charAt(0))
                    .join('')
                    .toUpperCase();
                
                newRow.innerHTML = `
                    <td class="td-name">
                        <div class="flex items-center">
                            <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem; color: #4b5563; font-weight: 600;">
                                ${initials}
                            </div>
                            ${name}
                        </div>
                    </td>
                    <td class="td-text">${email}</td>
                    <td class="td-text">${role}</td>
                    <td class="td-text">${business}</td>
                    <td>
                        <span class="status-pill active">Active</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn view" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                // Add the new row to the table
                staffTable.appendChild(newRow);
                
                // Add delete event handler to the new row
                const deleteBtn = newRow.querySelector('.action-btn.delete');
                deleteBtn.addEventListener('click', function() {
                    if (confirm('Are you sure you want to delete this staff member?')) {
                        newRow.remove();
                    }
                });
                
                alert('Staff member added successfully!');
                closeAddStaffModal();
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const addStaffModal = document.getElementById('add-staff-modal');
    const addStaffBtn = document.querySelector('#staff-tab .table-action');
    const closeAddStaffBtn = document.getElementById('close-add-staff');
    const cancelAddStaffBtn = document.getElementById('cancel-add-staff');
    const submitAddStaffBtn = document.getElementById('submit-add-staff');
    const togglePasswordBtn = document.getElementById('toggle-add-password');
    
    // Add click event to the "Add Staff Member" button
    if (addStaffBtn) {
        addStaffBtn.addEventListener('click', function() {
            addStaffModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const passwordField = document.getElementById('add-staff-password');
            if (passwordField) {
                const type = passwordField.type === 'password' ? 'text' : 'password';
                passwordField.type = type;
                
                // Toggle icon
                const icon = togglePasswordBtn.querySelector('i');
                if (icon) {
                    if (type === 'password') {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    } else {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                }
            }
        });
    }
    
    // Function to close modal and reset fields
    function closeAddStaffModal() {
        if (addStaffModal) {
            addStaffModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
            
            // Reset form fields
            document.getElementById('add-staff-name').value = '';
            document.getElementById('add-staff-email').value = '';
            document.getElementById('add-staff-role').selectedIndex = 0;
            document.getElementById('add-staff-business').selectedIndex = 0;
            document.getElementById('add-staff-phone').value = '';
            document.getElementById('add-staff-password').value = '';
            
            // Reset password field to type password
            const passwordField = document.getElementById('add-staff-password');
            if (passwordField) {
                passwordField.type = 'password';
            }
            
            // Reset eye icon
            const icon = document.querySelector('#toggle-add-password i');
            if (icon) {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    }
    
    // Close buttons functionality
    if (closeAddStaffBtn) {
        closeAddStaffBtn.addEventListener('click', closeAddStaffModal);
    }
    
    if (cancelAddStaffBtn) {
        cancelAddStaffBtn.addEventListener('click', closeAddStaffModal);
    }
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === addStaffModal) {
            closeAddStaffModal();
        }
    });
    
    // Handle submit button click
    if (submitAddStaffBtn) {
        submitAddStaffBtn.addEventListener('click', function() {
            // Get form values
            const name = document.getElementById('add-staff-name').value.trim();
            const email = document.getElementById('add-staff-email').value.trim();
            const role = document.getElementById('add-staff-role').value;
            const business = document.getElementById('add-staff-business').value;
            const phone = document.getElementById('add-staff-phone').value.trim();
            const password = document.getElementById('add-staff-password').value.trim();
            
            // Validate form
            if (!name || !email || !phone || !password) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Get initials for avatar
            const initials = name.split(' ')
                .filter(part => part.length > 0)
                .map(part => part.charAt(0).toUpperCase())
                .join('');
            
            // Create new table row
            const staffTable = document.querySelector('#staff-tab table tbody');
            if (staffTable) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="td-name">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem; color: #4b5563; font-weight: 600;">
                                ${initials}
                            </div>
                            ${name}
                        </div>
                    </td>
                    <td class="td-text">${email}</td>
                    <td class="td-text">${role}</td>
                    <td class="td-text">${business}</td>
                    <td>
                        <span class="status-pill active">Active</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn view" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                // Add new row to table
                staffTable.appendChild(newRow);
                
                // Add delete event handler to new row
                const deleteBtn = newRow.querySelector('.action-btn.delete');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this staff member?')) {
                            newRow.remove();
                        }
                    });
                }
                
                // Close modal
                closeAddStaffModal();
                
                // Show success message
                alert('Staff member added successfully!');
            }
        });
    }
});

    document.addEventListener('DOMContentLoaded', function() {
        // Show only dashboard tab on initial load, hide others
        const initialTab = 'dashboard-tab';
        const allTabs = ['dashboard-tab', 'businesses-tab', 'staff-tab', 'analytics-tab', 'settings-tab'];
        
        allTabs.forEach(tabId => {
            if (tabId === initialTab) {
                document.getElementById(tabId).style.display = 'block';
            } else {
                document.getElementById(tabId).style.display = 'none';
            }
        });
        
        // Make sure the correct sidebar link is active
        document.getElementById('dashboard-link').classList.add('active');
    });
   
        // Staff View Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Staff data in array format (matching the order in the table)
    if (typeof window.staffData === 'undefined') {
        window.staffData = [
            {
                name: "Bob Staff",
                email: "bob.staff@gmail.com",
                role: "Staff",
                business: "City Salon",
                phone: "(555) 234-5678",
                password: "staff123"
            },
            {
                name: "Maria Garcia",
                email: "maria@cityhairstudio.com", 
                role: "Manager",
                business: "City Salon",
                phone: "(555) 345-6789",
                password: "Mg789012"
            },
            {
                name: "Dr. Alex Johnson",
                email: "alex@metroclinic.com",
                role: "Staff", 
                business: "Metro Clinic",
                phone: "(555) 456-7890",
                password: "Aj456789"
            },
            {
                name: "Emma Wilson",
                email: "emma@techrepair.com",
                role: "Staff",
                business: "Tech Repair Shop",
                phone: "(555) 567-8901",
                password: "Ew567890"
            },
            {
                name: "Robert Brown",
                email: "robert@gourmetbistro.com",
                role: "Manager",
                business: "Gourmet Bistro",
                phone: "(555) 678-9012",
                password: "Rb678901"
            }
        ];
    }
    
    // Get DOM elements
    const staffModal = document.getElementById('staff-modal');
    const closeStaffModalBtn = document.getElementById('close-staff-modal');
    const staffModalCloseBtn = document.getElementById('staff-modal-close');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordField = document.getElementById('staff-password');
    
    // Find all view buttons in the staff tab
    const staffTab = document.getElementById('staff-tab');
    if (staffTab) {
        const viewButtons = staffTab.querySelectorAll('.action-btn.view');
        
        // Add click handler to each view button
        viewButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get staff data and populate modal
                if (index < window.staffData.length) {
                    const staff = window.staffData[index];
                    
                    // Populate modal fields
                    document.getElementById('staff-name').textContent = staff.name;
                    document.getElementById('staff-email').textContent = staff.email;
                    document.getElementById('staff-role').textContent = staff.role;
                    document.getElementById('staff-business').textContent = staff.business;
                    document.getElementById('staff-phone').textContent = staff.phone;
                    
                    // Set password value (but display as asterisks)
                    if (passwordField) {
                        passwordField.value = staff.password;
                        passwordField.type = 'password'; // Ensure it's displayed as password
                    }
                    
                    // Show the modal
                    staffModal.style.display = 'block';
                }
            });
        });
    }
    
    // Function to close the modal
    function closeStaffModal() {
        staffModal.style.display = 'none';
        // Reset password field to password type
        if (passwordField) {
            passwordField.type = 'password';
        }
    }
    
    // Add click handlers to close buttons
    if (closeStaffModalBtn) {
        closeStaffModalBtn.addEventListener('click', closeStaffModal);
    }
    
    if (staffModalCloseBtn) {
        staffModalCloseBtn.addEventListener('click', closeStaffModal);
    }
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === staffModal) {
            closeStaffModal();
        }
    });
    
    // Handle password toggle
    if (togglePasswordBtn && passwordField) {
        togglePasswordBtn.addEventListener('click', function() {
            passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
            
            // Update icon
            const icon = this.querySelector('i');
            if (icon) {
                if (passwordField.type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            }
        });
    }
    
    // Close with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && staffModal.style.display === 'block') {
            closeStaffModal();
        }
    });
});
   
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();

  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const body = await res.json();

  if (res.ok && body.redirect) {
    // this line actually changes the page in the browser
    window.location.href = body.redirect;
  } else {
    alert(body.error || 'Login failed');
  }
});
