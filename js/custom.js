
  (function ($) {

  "use strict";

    // Close mobile nav on link click
    $('.navbar-nav .nav-link').on('click', function(){
        $(".navbar-collapse").collapse('hide');
    });

    // Flip cards on click and reset when clicking outside
    $(document).on('click', function (event) {
      $('.member-card.flipped').each(function () {
        if (!this.contains(event.target)) {
          $(this).removeClass('flipped');
        }
      });
    });

    $(document).on('click', '.member-card', function (e) {
      e.stopPropagation();
      $(this).toggleClass('flipped');
    });

    // Smooth scroll only for same-page anchors, otherwise allow normal navigation
    $('.custom-link').on('click', function(event){
      const href = $(this).attr('href');
      if (!href || href.charAt(0) !== '#') {
        return;
      }

      const $target = $(href);
      if (!$target.length) {
        return;
      }

      event.preventDefault();

      const header_height = ($('.navbar').outerHeight() || 0) + 10;
      const offsetTop = $target.offset().top - header_height;

      $('body,html').animate({
        scrollTop: offsetTop
      }, 300);
    });

    // Ensure tabs and accordions respond to clicks (Bootstrap data API fallback)
    if (typeof bootstrap !== 'undefined') {
      document.querySelectorAll('#nav-tab button[data-bs-toggle="tab"]').forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const tab = bootstrap.Tab.getOrCreateInstance(button);
          tab.show();
        });
      });

      // Accordion open/close, single-item behavior, and aria/collapsed-class
      // state are all handled natively by Bootstrap via data-bs-toggle,
      // data-bs-target, and data-bs-parent on the markup -- no JS needed here.
    } else {
      // Fallback without Bootstrap: basic tab and accordion toggling
      const tabButtons = document.querySelectorAll('#nav-tab button[data-bs-target]');
      const tabPanes = document.querySelectorAll('#nav-tabContent .tab-pane');
      if (tabButtons.length && tabPanes.length) {
        tabButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSelector = button.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetSelector);
            if (!targetPane) return;

            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabPanes.forEach((pane) => pane.classList.remove('show', 'active'));

            button.classList.add('active');
            targetPane.classList.add('show', 'active');
          });
        });
      }

      const accordionButtons = document.querySelectorAll('#faqAccordion .accordion-button');
      if (accordionButtons.length) {
        accordionButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSelector = button.getAttribute('data-bs-target');
            if (!targetSelector) return;

            const targetEl = document.querySelector(targetSelector);
            if (!targetEl) return;

            const isOpen = targetEl.classList.contains('show');

            document.querySelectorAll('#faqAccordion .accordion-collapse').forEach((collapseEl) => {
              collapseEl.classList.remove('show');
            });
            accordionButtons.forEach((btn) => {
              btn.classList.add('collapsed');
              btn.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
              targetEl.classList.add('show');
              button.classList.remove('collapsed');
              button.setAttribute('aria-expanded', 'true');
            }
          });
        });
      }
    }
    
  })(window.jQuery);
