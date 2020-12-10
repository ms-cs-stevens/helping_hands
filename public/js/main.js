let basePath = location.origin;
$.getScript(`${basePath}/public/js/location.js`);
$.getScript(`${basePath}/public/js/auth.js`);
$.getScript(`${basePath}/public/js/home.js`);
$.getScript(`${basePath}/public/js/dashboard.js`);

// autoclose the alert message
window.setTimeout(function () {
  $('.alert')
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove();
    });
}, 5000);

$(document).ready(function () {
  $('#sidebar').mCustomScrollbar({
    theme: 'minimal',
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $(this).find('i').toggleClass('fa-arrow-left fa-arrow-right');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});
