$(document).ready(function () {
  if ($('#home').length) {
    new get_recent_donations();
  }
});

function get_recent_donations() {
  let requestParams = {
    method: 'GET',
    url: '/donations/recent',
  };
  $.ajax({
    ...requestParams,
    success: function (result) {
      let element = $('.recent-donations');
      element.html(result);
    },
    complete: runEveryTenJob,
  });
}

function runEveryTenJob() {
  setTimeout(get_recent_donations, 10000);
}
