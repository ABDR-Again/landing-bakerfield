import gsap from 'gsap';

document.addEventListener("DOMContentLoaded", () => {

  function fillTrackingFields() {
    const params = new URLSearchParams(window.location.search);

    const setField = (name, value) => {
      // Find all fields with this name (for both forms)
      const fields = document.querySelectorAll(`[name="${name}"]`);
      fields.forEach(field => {
        field.value = value || "";
      });
    };

    setField("page_url", window.location.href);
    setField("page_title", document.title);
    setField("page_referrer", document.referrer);

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
      "fbclid"
    ].forEach((key) => {
      setField(key, params.get(key));
    });
  }

  fillTrackingFields();


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
    // US Phone Formatter Helper
    const formatUSPhone = (value) => {
      if (!value) return value;
      const phoneNumber = value.replace(/[^\d]/g, '');
      const phoneNumberLength = phoneNumber.length;
      if (phoneNumberLength < 4) return phoneNumber;
      if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    // Attach to all phone inputs
    const phoneInputs = document.querySelectorAll('.uw-phone-input, #uwPhone');
    phoneInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        this.value = formatUSPhone(this.value);
      });
    });

    // Helper: Reset Errors
    const resetErrors = (formElement) => {
      formElement.querySelectorAll('.uw-hero-input, .uw-hero-select').forEach(el => {
        el.classList.remove('is-invalid');
      });
      formElement.querySelectorAll('.uw-field-error-message, .uw-general-error-message').forEach(el => {
        el.style.display = 'none';
      });
    };

    // Helper: Show Error
    const showError = (inputElement) => {
      inputElement.classList.add('is-invalid');
      // Look for the next sibling or an element in the closest wrapper
      let errorMsg = inputElement.parentElement.querySelector('.uw-field-error-message');
      if (!errorMsg && inputElement.closest('div')) {
        errorMsg = inputElement.closest('div').querySelector('.uw-field-error-message');
      }
      if(errorMsg) errorMsg.style.display = 'block';
    };

    // Bind validation for a given form
    const bindValidation = (form) => {
      if (!form) return;
      const phoneInput = form.querySelector('input[type="tel"]');
      const emailInput = form.querySelector('input[type="email"]');
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        resetErrors(form);
        let isValid = true;

        // Validate required fields
        const requiredInputs = form.querySelectorAll('input[required], select[required]');
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            showError(input);
            isValid = false;
          }
        });

        // Validate Email explicitly
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && emailInput.value && !emailRegex.test(emailInput.value)) {
          showError(emailInput);
          isValid = false;
        }

        // Validate Phone explicitly (US format requires 14 chars exactly: (XXX) XXX-XXXX)
        if (phoneInput && phoneInput.value && phoneInput.value.length !== 14) {
          showError(phoneInput);
          isValid = false;
        }

                if (isValid) {
          const btn = form.querySelector('button[type="submit"]');
          const originalText = btn ? btn.innerHTML : "";
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = 'Submitting...';
            btn.style.backgroundColor = '#16a34a'; 
          }

          // Use FormData to grab all fields, including hidden tracking fields
          const formData = Object.fromEntries(new FormData(form).entries());

          fetch("https://bakersfield-followupboss-worker.YOUR-SUBDOMAIN.workers.dev", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
          .then(res => res.json().then(data => ({ status: res.status, ok: res.ok, body: data })))
          .then(result => {
            if (!result.ok || !result.body.success) {
              throw new Error(result.body.error || "Submission failed");
            }
            if (btn) {
              btn.innerHTML = 'Sent Successfully!';
            }
            setTimeout(() => {
              window.location.href = 'lead-submitted-thank-you.html';
            }, 500);
          })
          .catch(error => {
            console.error("Form submission error:", error);
            alert("Something went wrong. Please try again.");
            if (btn) {
              btn.disabled = false;
              btn.innerHTML = originalText;
              btn.style.backgroundColor = '';
            }
          });
        } else {
          // Show general error
          const generalError = form.querySelector('.uw-general-error-message');
          if (generalError) generalError.style.display = 'block';
          
          gsap.fromTo(form, 
            { x: -5 }, 
            { x: 5, duration: 0.1, yoyo: true, repeat: 3, ease: "power1.inOut" }
          );
        }
      });
    };

    bindValidation(document.getElementById("uwHeroForm"));
    bindValidation(document.getElementById("uwHeroTopForm"));
  }
});
