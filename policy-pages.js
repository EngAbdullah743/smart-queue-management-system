 // Mobile menu toggle
        document.querySelector('.menu-button').addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = 'white';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });

        // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Update URL with the selected policy
                history.replaceState(null, null, `#${tabId}`);
            });
        });
        
        // Handle tab navigation from anchors within policies
        document.querySelectorAll('.policy-tab-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                
                // Activate the correct tab
                tabButtons.forEach(btn => {
                    if (btn.getAttribute('data-tab') === tabId) {
                        btn.click();
                    }
                });
                
                // Scroll to the specified section if provided
                const hash = this.getAttribute('href').split('#')[1];
                if (hash && hash !== tabId) {
                    setTimeout(() => {
                        document.getElementById(hash).scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            });
        });
        
        document.addEventListener('DOMContentLoaded', function() {
    // Select all policy links in the footer
    const policyLinks = document.querySelectorAll('.policy-link');
    
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the policy ID from the data attribute
            const policyId = this.getAttribute('data-policy');
            
            // Find and click the corresponding tab button
            const tabButton = document.querySelector(`.tab-button[data-tab="${policyId}"]`);
            if (tabButton) {
                tabButton.click();
                
                // Scroll to the top of the policy content with offset for fixed header
                const policyElement = document.getElementById(policyId);
                if (policyElement) {
                    const headerHeight = document.querySelector('header').offsetHeight + 
                                        document.querySelector('.policy-nav').offsetHeight;
                    
                    const policyTop = policyElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: policyTop - headerHeight - 20, // Additional 20px padding
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Improved scroll handling for in-page links
    document.querySelectorAll('.toc-list a, .policy-tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (!href) return;
            
            // If it's a cross-policy link
            if (this.classList.contains('policy-tab-link')) {
                const tabId = this.getAttribute('data-tab');
                
                // Activate the correct tab
                const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
                if (tabButton) {
                    tabButton.click();
                }
                
                // Extract the section ID if any
                const sectionId = href.split('#')[1];
                if (sectionId && sectionId !== tabId) {
                    setTimeout(() => {
                        scrollToSection(sectionId);
                    }, 100);
                }
            } else {
                // Regular in-page link
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
    
    // Helper function to scroll to a section with offset
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const headerHeight = document.querySelector('header').offsetHeight + 
                            document.querySelector('.policy-nav').offsetHeight;
        
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: sectionTop - headerHeight - 20,
            behavior: 'smooth'
        });
    }
});

        // Handle responsive behavior for menu
//        window.addEventListener('resize', function() {
  //          const nav = document.querySelector('nav ul');
    //        if (window.innerWidth >= 768) {
      //          nav.style.display = 'flex';
        //        nav.style.flexDirection = '';
          //      nav.style.position = '';
            //    nav.style.top = '';
              //  nav.style.left = '';
            //    nav.style.right = '';
         //       nav.style.backgroundColor = '';
     //           nav.style.padding = '';
       //         nav.style.boxShadow = '';
         //   } else {
           //     nav.style.display = 'none';
   //         }
     //   }); //
