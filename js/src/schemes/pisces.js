$(document).ready(function () {
<<<<<<< HEAD
  var $headerInner = $('.header-inner');
  var $sidebar = $('#sidebar');
  var getSidebarTop = function(){
    return $headerInner.height() + 10;
  };
  var setSidebarMarginTop = function(sidebarTop){
    return $sidebar.css({ 'margin-top': sidebarTop });
  };
  var mql = window.matchMedia('(min-width: 991px)');
  setSidebarMarginTop(getSidebarTop()).show();
  mql.addListener(function(e){
    if(e.matches){
      setSidebarMarginTop(getSidebarTop());
    }
  });
=======

  var sidebarInner = $('.sidebar-inner');

  initAffix();
  resizeListener();

  function initAffix () {
    var headerOffset = getHeaderOffset(),
        footerOffset = getFooterOffset(),
        sidebarHeight = $('#sidebar').height() + NexT.utils.getSidebarb2tHeight(),
        contentHeight = $('#content').height();

    // Not affix if sidebar taller then content (to prevent bottom jumping).
    if (headerOffset + sidebarHeight < contentHeight) {
      sidebarInner.affix({
        offset: {
          top: headerOffset - CONFIG.sidebar.offset,
          bottom: footerOffset
        }
      });
    }

    setSidebarMarginTop(headerOffset).css({ 'margin-left': 'initial' });
  }

  function resizeListener () {
    var mql = window.matchMedia('(min-width: 991px)');
    mql.addListener(function(e){
      if(e.matches){
        recalculateAffixPosition();
      }
    });
  }

  function getHeaderOffset () {
    return $('.header-inner').height() + CONFIG.sidebar.offset;
  }

  function getFooterOffset () {
    var footerInner = $('.footer-inner'),
        footerMargin = footerInner.outerHeight(true) - footerInner.outerHeight(),
        footerOffset = footerInner.outerHeight(true) + footerMargin;
    return footerOffset;
  }

  function setSidebarMarginTop (headerOffset) {
    return $('#sidebar').css({ 'margin-top': headerOffset });
  }

  function recalculateAffixPosition () {
    $(window).off('.affix');
    sidebarInner.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
    initAffix();
  }

>>>>>>> 5dc5056fd47ba6bea802305ebfdb4e4a62696895
});
