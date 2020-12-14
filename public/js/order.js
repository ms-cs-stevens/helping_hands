$(function () {
  $('.quantity-right-plus').on('click', function (e) {
    e.preventDefault();
    var inputElement = $(this).closest('.card-body').find('#quantity');
    var quantity = parseInt(inputElement.val());
    var donationId = $(this).closest('.card').data('donationId');
    var max = parseInt(inputElement.attr('max'));

    if (quantity < max) {
      // Increment
      $.ajax({
        url: `donations/${donationId}/donate`,
        method: 'POST',
        success: function (response) {
          console.log(response);
          inputElement.val(quantity + 1);
          $('#cart').text(response.cart);
        },
        error: function (response) {
          console.log(response);
        },
      });
    }
  });

  $('.quantity-left-minus').on('click', function (e) {
    e.preventDefault();
    var inputElement = $(this).closest('.card-body').find('#quantity');
    var quantity = parseInt(inputElement.val());
    var donationId = $(this).closest('.card').data('donationId');

    // Decrement
    if (quantity > 0) {
      $.ajax({
        url: `donations/${donationId}/withdraw`,
        method: 'POST',
        success: function (response) {
          console.log(response);
          inputElement.val(quantity - 1);
          $('#cart').text(response.cart);
        },
      });
    }
  });
});
