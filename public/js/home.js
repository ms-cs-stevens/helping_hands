$(document).ready(function () {
  new get_recent_donations();
});

function get_recent_donations() {
  let requestParams = {
    method: 'GET',
    url: '/donations/recent',
  };
  $.ajax({
    ...requestParams,
    success: function (result) {
      let donations = result.donations;
      let element = $('.most-recent-donation');

      donations.forEach((donation) => {
        let col = document.createElement('div');

        let link = document.createElement('a');
        link.href = `/donations/${donation._id}`;

        let img = document.createElement('img');
        img.class = 'card-img-top';
        img.src =
          'https://www.staples-3p.com/s7/is/image/Staples/sp82712270_sc7?wid=200&hei=250';
        img.alt = donation.name;

        link.append(img);
        link.append(document.createElement('br'));

        let p = document.createElement('p');
        p.className = 'recent-p';
        p.append(`${donation.name}`);
        p.append(`(${donation.quantity})`);
        link.append(p);
        col.className = 'recent-donation col';
        col.append(link);

        element.append(col);
      });
      console.log(element);
    },
  });
}

// <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src="..." alt="Card image cap">
//   <div class="card-body">
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
