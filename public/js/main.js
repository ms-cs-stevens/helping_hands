let basePath = location.origin;
$.getScript(`${basePath}/public/js/location.js`);
$.getScript(`${basePath}/public/js/auth.js`);
$.getScript(`${basePath}/public/js/home.js`);
$.getScript(`${basePath}/public/js/users.js`);

// autoclose the alert message
window.setTimeout(function () {
  $('.alert').fadeTo(550, 0, function () {
    $(this).remove();
  });
}, 3000);

$(document).ready(function () {
  $('#sidebar').mCustomScrollbar({
    theme: 'minimal',
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});
