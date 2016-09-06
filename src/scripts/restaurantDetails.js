/* fetch our details from the json and build templates for
restaurant and reviewer cards. */

function initRestaurantDetails() {
    var restaurantID = getParameterByName('restaurant_id');

    fetch('./assets/data/restaurants.json')
        .then(function(response) {
            return response.json();
        }).catch(function(error) {
            return error;
        }).then(function(response) {
            var restaurant = response.restaurants.filter(function(entry) {
                return entry.id === restaurantID;
            });
            console.log(restaurant);
            var myRestaurant = restaurant[0];
            var stars = 0;
            myRestaurant.reviews.forEach(function(review) {
                stars += parseInt(review.stars);
            });
            myRestaurant.rating = stars / (myRestaurant.reviews.length);

            var reviews = myRestaurant.reviews;
            var theTemplateScript = $("#restaurant-details").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            $(".restaurantNav").append(theTemplate(myRestaurant));

            var ratingsTemplateScript = $("#ratings-list").html();
            var ratingsTemplate = Handlebars.compile(ratingsTemplateScript);
            $(".ratingsNav").append(ratingsTemplate(reviews));


        }).catch(function(error) {
            console.log(error);
        });
}


/* print stars not from a template but from our user imput.*/
function printStars(number){
  var starDom = "";
  for(var i = 0; i < number; i++){
    starDom += "<span class='star-icon'>★</span>";
  }
  for(i = number; i < 5; i++){
    starDom += "<span class='star-icon'>☆</span>";
  }
  return starDom;
}



$(document).ready(function() {


    initRestaurantDetails();

    /* listener for submitting new review form.
    create div in html, no modification to data file.*/
    $("#new-review").submit(function(e){

      e.preventDefault();

      var reviewComments = $("#review-comments").val();
      var reviewerName = $("#reviewer-name").val();
      var reviewStars = $('input[name="rating"]:checked').val();
      if (!reviewStars || !reviewerName || !reviewComments) {
        return;

      } else {
          var today = new Date();

          var newReview = '<div class="row"><div class="col-xs-12 col-md-6"><div class="card"><div class="review-masthead"><h4 class="card-title review-title text-center">' + reviewerName + '</h4><p class="card-text text-center" aria-description="' + reviewStars + ' out of 5 stars">' + printStars(reviewStars) + '</p></div><div class="card-block"><p class="card-text date-text">' + today.toLocaleDateString() + '</p><p class="card-text">' + reviewComments + '</p></div></div></div></div>';

          $(".ratingsNav").append(newReview);

          $('#review-modal').modal('hide');
      }
    });

    /* when we open the modal, remove the aria hidden attribute and focus on first form element*/
  $('#review-modal').on('shown.bs.modal', function () {
    $("#review-modal").removeAttr('aria-hidden');
    $('#reviewer-name').focus();
  });

});
