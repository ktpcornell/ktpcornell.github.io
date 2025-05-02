
  (function ($) {
  
  "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    $('click', function (event) {
      document.querySelectorAll('.member-card').forEach(card => {
        if (!card.contains(event.target)) {
          card.classList.remove('flipped');
        }
      });
    });

    $('.member-card').forEach(card => {
      card.addEventListener('click', function (e) {
        e.stopPropagation();
        card.classList.toggle('flipped');
      });
    });

    // CUSTOM LINK 
    $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
  }
});
    
  })(window.jQuery);


