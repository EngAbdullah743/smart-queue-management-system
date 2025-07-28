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

        // Handle responsive behavior for menu
        window.addEventListener('resize', function() {
            const nav = document.querySelector('nav ul');
            if (window.innerWidth >= 768) {
                nav.style.display = 'flex';
                nav.style.flexDirection = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.right = '';
                nav.style.backgroundColor = '';
                nav.style.padding = '';
                nav.style.boxShadow = '';
            } else {
                nav.style.display = 'none';
            }
        });
        // Add this to your existing script at the bottom of the HTML
    document.addEventListener('DOMContentLoaded', function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle the answer visibility
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
                
                // Close other open questions
                faqQuestions.forEach(item => {
                    if (item !== question && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.nextElementSibling.classList.remove('active');
                    }
                });
            });
        });
    });
