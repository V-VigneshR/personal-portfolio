// Toggle mobile menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  // Add scroll animation
  document.addEventListener("DOMContentLoaded", function() {
    // Add fixed navbar on scroll
    const navbar = document.querySelector("nav");
    
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        navbar.style.padding = "0 5%";
        navbar.style.height = "60px";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.padding = "0 5%";
        navbar.style.height = "70px";
        navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
      }
    });
    
    // Add active state for navigation links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    window.addEventListener("scroll", function() {
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 70) {
          current = section.getAttribute("id");
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active");
        }
      });
    });
    
    // Add smooth animation for elements
    const animateElements = document.querySelectorAll(".section__text, .section__pic-container, .details-container, .project-card, .contact-method");
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    animateElements.forEach(element => {
      element.classList.add("animate-hidden");
      observer.observe(element);
    });
    
    // Add form validation
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        if (name.value.trim() === "") {
          showError(name, "Please enter your name");
          return;
        }
        
        if (email.value.trim() === "") {
          showError(email, "Please enter your email");
          return;
        }
        
        if (message.value.trim() === "") {
          showError(message, "Please enter your message");
          return;
        }
        
        // Show success message (in a real scenario, this would send the form data)
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fa-solid fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for your message. I'll get back to you soon.</p>
          </div>
        `;
      });
    }
    
    function showError(field, message) {
      const formGroup = field.parentElement;
      const errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.textContent = message;
      
      formGroup.appendChild(errorElement);
      field.classList.add("error");
      
      setTimeout(() => {
        errorElement.remove();
        field.classList.remove("error");
      }, 3000);
    }
    
    // Add CSS for animations and error messages
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
      .animate-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate {
        opacity: 1;
        transform: translateY(0);
      }
      
      .nav-links a.active {
        color: var(--accent-color);
      }
      
      .nav-links a.active:after {
        width: 100%;
      }
      
      .error-message {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
      }
      
      .form-group input.error,
      .form-group textarea.error {
        border-color: #ef4444;
      }
      
      .success-message {
        text-align: center;
        padding: 2rem;
      }
      
      .success-message i {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
      }
      
      .success-message h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
    `;
    document.head.appendChild(styleSheet);
  });