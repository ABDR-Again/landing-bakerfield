import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. Hero Section Animations Removed for Performance
     ========================================= */
  // The hero section now loads instantly via CSS to prevent render-blocking delays


  
/* --- problem_section.html --- */
{

const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-problem-section",
        start: "top 75%", 
      }
    });

    tl.fromTo(".uw-problem-badge", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )
    .fromTo(".uw-problem-title", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.3"
    )
    .fromTo(".uw-problem-desc", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 
      "-=0.4"
    )
    .fromTo(".uw-problem-image-wrapper", 
      { opacity: 0, scale: 0.95, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.4"
    )
    .fromTo(".uw-problem-card", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
      "-=0.4"
    )
    .fromTo(".uw-problem-banner", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.2"
    );


}
/* --- solution_section (3).html --- */
{

// Initialize GSAP ScrollTrigger
    

    // Create Main Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-sol-section",
        start: "top 75%", // Triggers when top of section hits 75% viewport height
      }
    });

    /* 
      Animation Sequence:
      1. Heading/Badge
      2. Subheading
      3. Button
      4. Services (one by one, including inner text)
      5. Image 
    */

    // 1-3. Intro elements (Badge, Title, Desc, Button)
    tl.fromTo(".uw-anim-intro", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );

    // 4. Services (Outer container fades/slides in)
    tl.fromTo(".uw-sol-step", 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" },
      "-=0.2" // Overlap slightly with the button animation
    );

    // 4b. Inner Text of Services animates in slightly after the step container
    tl.fromTo(".uw-sol-step-content h3, .uw-sol-step-content p",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      "-=0.5"
    );

    // 5. Image Reveal
    tl.fromTo(".uw-anim-image", 
      { opacity: 0, scale: 0.9, x: 40 }, 
      { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );


}
/* --- case_studies_section.html --- */
{

// 1. Initialize GSAP
    

    // 2. Main fromTo Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-cases-section",
        start: "top 75%",
      }
    });

    // Heading elements
    tl.fromTo(".uw-anim-header", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    )
    // Left Grid Cards
    .fromTo(".uw-anim-card", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }, 
      "-=0.3"
    )
    // Right Sidebar (if visible)
    .fromTo(".uw-anim-sidebar .uw-cases-side-box", 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
      "-=0.5"
    )
    // Mobile bottom controls (if visible)
    .fromTo(".uw-anim-mobile",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // 3. Mobile Slider Logic
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
/* --- reviews_section.html --- */
{
    // Animations kept for headers/cards.
  
    // 6. Initial GSAP Reveal Animations
    

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-rev-section",
        start: "top 75%",
      }
    });

    // Header & Controls
    tl.fromTo(".uw-anim-header", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    )
    // Cards appearing one by one
    .fromTo(".uw-anim-card",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    )
    // Inner text of cards fading in
    .fromTo(".uw-rev-card-inner-text",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, stagger: 0.02, ease: "power1.out" },
      "-=0.3"
    )
    // Bottom Banner
    .fromTo(".uw-anim-banner",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    );


}
/* --- how_we_compare_section.html --- */
{

// 1. Initialize GSAP ScrollTrigger
    

    // 2. Timeline Sequence: Heading -> Subheading -> Left Cards -> Table Box -> Rows -> CTA Banner
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-comp2-section",
        start: "top 75%",
      }
    });

    // Heading elements
    tl.fromTo(".uw-comp2-badge", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )
    .fromTo(".uw-comp2-title", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.3"
    )
    .fromTo(".uw-comp2-desc", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 
      "-=0.4"
    )
    
    // Left Cards
    .fromTo(".uw-comp2-card", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
      "-=0.4"
    )
    
    // Table Wrapper Header
    .fromTo(".uw-comp2-table-wrapper",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    
    // Table Rows appearing one by one
    .fromTo(".uw-comp2-row",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      "-=0.2"
    )

    // Bottom CTA
    .fromTo(".uw-comp2-cta",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    );


}
/* --- team_section.html --- */
{

// Initialize GSAP ScrollTrigger
    

    /* -------------------------------------------------------------
       1. INITIAL SCROLL ANIMATIONS (fromTo sequence)
    ------------------------------------------------------------- */
    const isMobile = window.innerWidth <= 767;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-team-section",
        start: "top 75%", // Starts when section is 75% in viewport
      }
    });

    // Animate Header (Handle both mobile and desktop headers gracefully)
    const headerSelector = isMobile ? ".uw-team-header-mobile > *" : ".uw-anim-header";
    
    tl.fromTo(headerSelector, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    // Animate Large Image First
    tl.fromTo(".uw-team-card.large", 
      { opacity: 0, scale: 0.95, y: 40 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.2"
    );

    // Animate Small Images One by One
    tl.fromTo(".uw-team-card.small", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    // Animate Bottom Banner
    tl.fromTo(".uw-anim-banner", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    /* -------------------------------------------------------------
       2. HOVER REVEAL ANIMATIONS (from bottom of image)
    ------------------------------------------------------------- */
    const cards = document.querySelectorAll('.uw-team-card');

    cards.forEach(card => {
      const details = card.querySelector('.uw-team-details');
      
      // Initial state: Pushed down completely (100% of its own height) and invisible
      gsap.set(details, { yPercent: 100, opacity: 0 });

      // Mouse Enter: Slide up smoothly to original position
      card.addEventListener('mouseenter', () => {
        gsap.to(details, { 
          yPercent: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: "power3.out" 
        });
      });

      // Mouse Leave: Slide back down
      card.addEventListener('mouseleave', () => {
        gsap.to(details, { 
          yPercent: 100, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in" 
        });
      });
    });


}
/* --- faq_section.html --- */
{

// Wait for DOM to load
    // Initialize GSAP ScrollTrigger
    

    /* ----------------------------------------------------------------------
       1. Initial Reveal Animations using ScrollTrigger
    ---------------------------------------------------------------------- */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-faq-section",
        start: "top 75%", // Triggers when top of section hits 75% of viewport
      }
    });

    // Sequence: Heading elements -> Image -> FAQ items
    tl.fromTo(".uw-faq-badge", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(".uw-faq-title", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 
        "-=0.4"
      )
      .fromTo(".uw-faq-desc", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 
        "-=0.4"
      )
      .fromTo(".uw-faq-image-wrapper", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.3"
      )
      .fromTo(".uw-faq-item", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" }, 
        "-=0.5"
      );


    /* ----------------------------------------------------------------------
       2. Accordion Interaction Logic
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

// 1. Initialize GSAP ScrollTrigger
    

    // Initial Animation Sequence: Heading -> Subheading -> Form
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".uw-hero-section",
        start: "top 80%", 
      }
    });

    tl.fromTo(".uw-hero-badge", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".uw-hero-title", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.4"
    )
    .fromTo(".uw-hero-desc", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 
      "-=0.5"
    )
    .fromTo(".uw-hero-image-wrapper", 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 
      "-=0.4"
    )
    .fromTo(".uw-hero-form-wrapper", 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.6"
    )
    .fromTo(".uw-hero-right", 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 
      "-=0.5"
    );

    // 2. Form Validation & Logic
    const form = document.getElementById("uwHeroForm");
    const phoneInput = document.getElementById("uwPhone");
    const emailInput = document.getElementById("uwEmail");

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

    // 3. Hero Top Form Validation & Logic
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

    // Refresh ScrollTrigger after all assets are loaded
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

}
});
