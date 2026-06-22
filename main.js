import gsap from 'gsap';

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. Hero Section Animations Removed for Performance
     ========================================= */
  // The hero section now loads instantly via CSS to prevent render-blocking delays
  
  /* --- case_studies_section.html --- */
  {
    // Mobile Slider Logic
    const gridSlider = document.getElementById("uwCasesGrid");
    const btnNext = document.getElementById("uwCaseNext");
    const btnPrev = document.getElementById("uwCasePrev");

    if(btnNext && btnPrev && gridSlider) {
      btnNext.addEventListener('click', () => {
        // Scroll right by width of one card + gap
        gridSlider.scrollBy({ left: gridSlider.clientWidth, behavior: 'smooth' });
      });

      btnPrev.addEventListener('click', () => {
        // Scroll left
        gridSlider.scrollBy({ left: -gridSlider.clientWidth, behavior: 'smooth' });
      });
    }
  }

  /* --- faq_section.html --- */
  {
    /* ----------------------------------------------------------------------
       Accordion Interaction Logic
    ---------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.uw-faq-item');
    let activeItem = document.querySelector('.uw-faq-item.active');

    // Set initial states for all content areas
    faqItems.forEach(item => {
      const content = item.querySelector('.uw-faq-content');
      if (item !== activeItem) {
        gsap.set(content, { height: 0, opacity: 0 });
      } else {
        gsap.set(content, { height: 'auto', opacity: 1 });
      }
    });

    // Handle Clicks
    document.querySelectorAll('.uw-faq-header').forEach(header => {
      header.addEventListener('click', function() {
        const currentItem = this.parentElement;
        const currentContent = currentItem.querySelector('.uw-faq-content');
        const isOpen = currentItem.classList.contains('active');

        // If clicking an already open item, just close it
        if (isOpen) {
          gsap.to(currentContent, { 
            height: 0, 
            opacity: 0, 
            duration: 0.4, 
            ease: "power2.inOut" 
          });
          currentItem.classList.remove('active');
          this.setAttribute('aria-expanded', 'false');
          activeItem = null;
        } 
        // If clicking a closed item
        else {
          // Close the previously active item if it exists
          if (activeItem) {
            const prevContent = activeItem.querySelector('.uw-faq-content');
            const prevHeader = activeItem.querySelector('.uw-faq-header');
            
            gsap.to(prevContent, { 
              height: 0, 
              opacity: 0, 
              duration: 0.4, 
              ease: "power2.inOut" 
            });
            activeItem.classList.remove('active');
            prevHeader.setAttribute('aria-expanded', 'false');
          }

          // Open the new item
          currentItem.classList.add('active');
          this.setAttribute('aria-expanded', 'true');
          gsap.fromTo(currentContent, 
            { height: 0, opacity: 0 }, 
            { height: "auto", opacity: 1, duration: 0.4, ease: "power2.inOut" }
          );
          
          activeItem = currentItem;
        }
      });
    });
  }

  /* --- hero_form_section.html --- */
  {
    // Form Validation & Logic
    const form = document.getElementById("uwHeroForm");
    const phoneInput = document.getElementById("uwPhone");
    const emailInput = document.getElementById("uwEmail");

    if (form && phoneInput && emailInput) {
      // Phone - Allow numbers only
      phoneInput.addEventListener('input', function(e) {
        // Strip out non-digit characters
        this.value = this.value.replace(/\D/g, '');
      });

      // Helper: Reset Errors
      const resetErrors = () => {
        document.querySelectorAll('.uw-hero-input, .uw-hero-select').forEach(el => {
          el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.uw-hero-error-message').forEach(el => {
          el.style.display = 'none';
        });
      };

      // Helper: Show Error
      const showError = (inputElement) => {
        inputElement.classList.add('is-invalid');
        const errorMsg = inputElement.closest('.uw-hero-input-group').querySelector('.uw-hero-error-message');
        if(errorMsg) errorMsg.style.display = 'block';
      };

      // Submit Event
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        resetErrors();
        let isValid = true;

        // Validate required text fields
        const requiredInputs = form.querySelectorAll('input[required], select[required]');
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            showError(input);
            isValid = false;
          }
        });

        // Validate Email explicitly
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          showError(emailInput);
          isValid = false;
        }

        // Validate Phone explicitly (must have at least 10 digits)
        if (phoneInput.value && phoneInput.value.length < 10) {
          showError(phoneInput);
          isValid = false;
        }

        // If valid, submit logic here
        if (isValid) {
          // Success state / Animation
          const btn = form.querySelector('.uw-hero-submit');
          const originalText = btn.innerHTML;
          btn.innerHTML = 'Sending...';
          btn.style.backgroundColor = '#16a34a'; // Green success color
          
          setTimeout(() => {
            btn.innerHTML = 'Sent Successfully!';
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.style.backgroundColor = '';
              form.reset();
            }, 2000);
          }, 500);
        } else {
          // Shake animation for form on error
          gsap.fromTo(form, 
            { x: -5 }, 
            { x: 5, duration: 0.1, yoyo: true, repeat: 3, ease: "power1.inOut" }
          );
        }
      });
    }

    // Hero Top Form Validation & Logic
    const heroTopForm = document.getElementById("uwHeroTopForm");
    if(heroTopForm) {
      const topPhoneInput = heroTopForm.querySelector(".uw-phone-input");
      const topEmailInput = heroTopForm.querySelector(".uw-email-input");
      const topErrorMsg = heroTopForm.querySelector(".uw-hero-error-message");

      const resetTopErrors = () => {
        heroTopForm.querySelectorAll('.uw-hero-input, .uw-hero-select').forEach(el => {
          el.classList.remove('is-invalid');
        });
        if(topErrorMsg) topErrorMsg.style.display = 'none';
      };

      heroTopForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetTopErrors();
        let isValid = true;

        const requiredInputs = heroTopForm.querySelectorAll('input[required], select[required]');
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
          }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (topEmailInput && topEmailInput.value && !emailRegex.test(topEmailInput.value)) {
          topEmailInput.classList.add('is-invalid');
          isValid = false;
        }

        if (topPhoneInput && topPhoneInput.value && topPhoneInput.value.length < 10) {
          topPhoneInput.classList.add('is-invalid');
          isValid = false;
        }

        if (isValid) {
          const btn = heroTopForm.querySelector('.uw-hero-submit');
          const originalText = btn.innerHTML;
          btn.innerHTML = 'Sending...';
          btn.style.backgroundColor = '#16a34a'; 
          
          setTimeout(() => {
            btn.innerHTML = 'Sent Successfully!';
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.style.backgroundColor = '';
              heroTopForm.reset();
            }, 2000);
          }, 500);
        } else {
          if(topErrorMsg) topErrorMsg.style.display = 'block';
          gsap.fromTo(heroTopForm, 
            { x: -5 }, 
            { x: 5, duration: 0.1, yoyo: true, repeat: 3, ease: "power1.inOut" }
          );
        }
      });
    }
  }
});
