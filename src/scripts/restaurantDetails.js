
$(document).ready(function () {

  var restaurantID = getParameterByName('restaurant_id');

  fetch('./assets/data/restaurants.json')
    .then(function(response){
      return response.json();
    }).catch(function(error){
      return error;
    }).then(function(response){
        var restaurant = response.restaurants.filter(function(entry){
          return entry.id === restaurantID;
        });
        console.log(restaurant);
        var myRestaurant = restaurant[0];
        var stars = 0;
        myRestaurant.reviews.forEach(function(review){
          stars += parseInt(review.stars);
        });
        myRestaurant.rating = stars/(myRestaurant.reviews.length);

       var reviews = myRestaurant.reviews;
       var theTemplateScript = $("#restaurant-details").html();
       var theTemplate = Handlebars.compile (theTemplateScript);
       $(".restaurantNav").append (theTemplate(myRestaurant));

       var ratingsTemplateScript = $("#ratings-list").html();
       var ratingsTemplate = Handlebars.compile (ratingsTemplateScript);
       $(".ratingsNav").append (ratingsTemplate(reviews));

    }).catch(function(error){
      console.log(error);
    });
   });
