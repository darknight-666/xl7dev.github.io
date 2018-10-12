/* global NexT: true */

$(document).ready(function () {

  $(document).trigger('bootstrap:before');

  NexT.utils.isMobile() && window.FastClick.attach(document.body);

  NexT.utils.lazyLoadPostsImages();

<<<<<<< HEAD
  NexT.utils.registerBackToTop();

=======
  NexT.utils.registerESCKeyEvent();

  NexT.utils.registerBackToTop();

  // Mobile top menu bar.
>>>>>>> 5dc5056fd47ba6bea802305ebfdb4e4a62696895
  $('.site-nav-toggle button').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

<<<<<<< HEAD

  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
=======
  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.tabs && NexT.utils.registerTabsTag();

>>>>>>> 5dc5056fd47ba6bea802305ebfdb4e4a62696895
  NexT.utils.embeddedVideoTransformer();
  NexT.utils.addActiveClassToMenuItem();


  // Define Motion Sequence.
  NexT.motion.integrator
    .add(NexT.motion.middleWares.logo)
    .add(NexT.motion.middleWares.menu)
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar);

  $(document).trigger('motion:before');

  // Bootstrap Motion.
<<<<<<< HEAD
  CONFIG.motion && NexT.motion.integrator.bootstrap();
=======
  CONFIG.motion.enable && NexT.motion.integrator.bootstrap();
>>>>>>> 5dc5056fd47ba6bea802305ebfdb4e4a62696895

  $(document).trigger('bootstrap:after');
});
