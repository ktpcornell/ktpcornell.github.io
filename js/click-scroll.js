// Smooth scroll handler that only runs when a valid in-page anchor exists.
$(document).ready(function () {
  $('.click-scroll').on('click', function (e) {
    const href = $(this).attr('href');

    // Let normal navigation proceed for non-anchor links.
    if (!href || href.charAt(0) !== '#') {
      return;
    }

    const $target = $(href);
    if (!$target.length) {
      return;
    }

    e.preventDefault();
    const headerHeight = ($('.navbar').outerHeight() || 0) + 10;
    const targetOffset = $target.offset().top - headerHeight;

    $('html, body').animate({ scrollTop: targetOffset }, 300);
  });
});
