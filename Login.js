 document.addEventListener('DOMContentLoaded', () => {
    // ─── 1) TAB SWITCHING ─────────────────────────────────────────────
    const loginTab      = document.getElementById('login-tab');
    const registerTab   = document.getElementById('register-tab');
    const loginForm     = document.getElementById('login-form');
    const registerForm  = document.getElementById('register-form');

    function showLogin() {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    }
    function showRegister() {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    }

    loginTab.addEventListener('click',  showLogin);
    registerTab.addEventListener('click', showRegister);

    // initialize
    showLogin();


    // ─── 2) USER-TYPE TOGGLING ────────────────────────────────────────
    const types = ['customer', 'staff', 'admin'];
    const btns  = {};
    const fields = {
      customer: null,  // no extra fields for customer
      staff:     null, // if you have staff-fields container
      admin:     null  // if you have admin-fields container
    };

    // grab buttons and their field-groups (only business in your HTML)
    types.forEach(type => {
      btns[type] = document.getElementById(type + '-type');
      fields[type] = document.getElementById(type + '-fields');
    });

    function clearActiveType() {
      types.forEach(type => {
        btns[type].classList.remove('active');
        if (fields[type]) fields[type].style.display = 'none';
      });
    }

    types.forEach(type => {
      btns[type].addEventListener('click', () => {
        clearActiveType();
        btns[type].classList.add('active');
        if (fields[type]) fields[type].style.display = 'block';
      });
    });

    // initialize to Customer
    clearActiveType();
    btns.customer.classList.add('active');
    // customer-fields is absent / hidden anyway

  });

        // Password visibility toggle
        const loginPasswordToggle = document.getElementById('login-password-toggle');
        const loginPassword = document.getElementById('login-password');
        
        loginPasswordToggle.addEventListener('click', function() {
            if (loginPassword.type === 'password') {
                loginPassword.type = 'text';
                loginPasswordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                loginPassword.type = 'password';
                loginPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
        
        const registerPasswordToggle = document.getElementById('register-password-toggle');
        const registerPassword = document.getElementById('register-password');
        
        registerPasswordToggle.addEventListener('click', function() {
            if (registerPassword.type === 'password') {
                registerPassword.type = 'text';
                registerPasswordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                registerPassword.type = 'password';
                registerPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
        
        // Form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the data to your server
            alert('Login form submitted!');
        });
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate passwords match
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would normally send the data to your server
            alert('Registration form submitted!');
        });
        
        
    // Select all policy links in the footer
    const policyLinks = document.querySelectorAll('.policy-link');
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


    const users = [    
  { email: "alice.admin@gmail.com", password: "admin123", redirect: "admin.html" },
  { email: "bob.staff@gmail.com", password: "staff123", redirect: "staff.html" },
  { email: "carol.customer@gmail.com", password: "customer123", redirect: "customer.html" },
];

 // grab the real IDs from your HTML
  const form     = document.getElementById("login-form");
  const inEmail  = document.getElementById("login-email");
  const inPass   = document.getElementById("login-password");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

  const email = inEmail.value.trim();
  const password = inPass.value;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    window.location.href = user.redirect;
  } else {
    alert("Invalid email or password");
  }
});
