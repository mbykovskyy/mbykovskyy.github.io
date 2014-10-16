$(document).ready(function() {    
  /**
   * Scrolls to the specified target. If the target is too low for scrollTop
   * to reach it then the lowest location that scrollTop can reach will be
   * calculated.
   *
   * @param $target the object to scroll to.
   * @param time the animation time in milliseconds.
   * @param hash the hash to add to the url.
   *
   * @return true if hash part of the url is included, otherwise false.
   */
  function simpleScroll($target, time, hash)
  {
    var $viewport = $(window);
    var $content = $(document);
    var viewportHeight = $viewport.height();
    var contentHeight = $content.height();
    
    // don't scroll when the page content is not bigger than the scroll area
    if (viewportHeight >= contentHeight) {
      return;
    }
    
    var $scrollable = $(jQuery.browser.webkit ? 'body': 'html');
    var targetTop = $target.offset().top;
    
    // the lowest location scrollTop can reach
    var lowestScrollTop = contentHeight - viewportHeight;
    
    // if scrollTop can not reach target then scroll to the lowest location we can get
    var offset = (targetTop > lowestScrollTop) ? lowestScrollTop : targetTop;
    
    // don't scroll when scrollTop is already at the target location
    if ($scrollable.scrollTop() != offset) {
      $scrollable.animate({scrollTop: offset}, time, function() {
          location.hash = hash;
      });
    }
  }

  /**
   * Horrible hack to handle Back/Forward buttons.
   */
  $.address.change(function(event) {
    if ('' == event.value) {
      // once again IE makes it difficult to do things the nice way!
      setTimeout(function() {$('body').scrollTop(0);}, 200);
    } else {
      // history remembers page states e.g. scroll position, before browser navigates to
      // a different location. if page scrolls to the target before location is changed
      // the scroll position will be off when going back to previous page. one way to fix
      // this is to reapply the hash. explicitly setting scroll position is another way to
      // fix it but IE does not behave as expected.
      location.hash = event.value;
    }
  });
  
  $('li.top a').click(function() {
    simpleScroll($('#top'), null, this.hash);
    return false;
  });
  
  $('li.about-me a').click(function() {
    simpleScroll($('#about-me'), null, this.hash);
    return false;
  });
  
  $('li.projects a').click(function() {
    simpleScroll($('#projects'), null, this.hash);
    return false;
  });
});
