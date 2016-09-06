/**
Main javascript functions for Restaurant Reviews Project
Written by: Mary Sheahen
9/5/2016

**/

$(document).ready(function() {

  if(path == '/'){
    /* initialize our page with data from restaurants file, and build our template*/
    fetch('./assets/data/restaurants.json')
        .then(function(response) {
            return response.json();
        }).catch(function(error) {
            console.log(error);

        }).then(function(restaurantData) {

            restaurantData.restaurants.forEach(function(restaurant) {
                var stars = 0;
                restaurant.reviews.forEach(function(review) {
                    stars += parseInt(review.stars);
                });
                restaurant.rating = stars / (restaurant.reviews.length);
            });
            //Get the HTML from the template   in the script tag​
            var theTemplateScript = $("#restaurant-card-template").html();

            //Compile the template​
            var theTemplate = Handlebars.compile(theTemplateScript);

            $(".restaurant-list").append(theTemplate(restaurantData.restaurants));
            // The function will insert all the values from the objects in their respective places in the HTML and returned HTML as a string. Then we use jQuery to append the resulting HTML string into the page​

        }).catch(function(error) {
            console.log(error);
        });


    // Filtering restuarant results and re-printing templates
    $("#filter-restaurants").submit(function(e) {

        e.preventDefault();

        fetch('./assets/data/restaurants.json')
            .then(function(response) {
                return response.json();
            }).catch(function(error) {
                console.log(error);
            }).then(function(restaurantData) {

                restaurantData.restaurants.forEach(function(restaurant) {
                    var stars = 0;
                    restaurant.reviews.forEach(function(review) {
                        stars += parseInt(review.stars);
                    });
                    restaurant.rating = stars / (restaurant.reviews.length);
                });

                var price = $('#maximum-price').val();
                var rating = $('input[name="rating"]:checked').val();
                var cuisine = $("#cuisine-type").val();

                if (cuisine == 'all') {
                    return restaurantData.restaurants.filter(function(el) {
                        return el.price <= price &&
                            el.rating >= rating;
                    });
                } else {
                    return restaurantData.restaurants.filter(function(el) {
                        return el.price <= price &&
                            el.rating >= rating &&
                            el.cuisine == cuisine;
                    });
                }
            }).catch(function(error) {
                console.log(error);
            }).then(function(filteredRestaurantData) {
                $(".restaurant-list").html("");

                // Show the user an error if there's no results for their query
                if (filteredRestaurantData.length === 0) {
                    $(".restaurant-list").html('<div class="alert alert-danger">There are no restaurants that meet that criteria.  Please try again.</div>');
                } else {

                    //rebuild our list!
                    var theTemplateScript = $("#restaurant-card-template").html();
                    var theTemplate = Handlebars.compile(theTemplateScript);
                    $(".restaurant-list").append(theTemplate(filteredRestaurantData));

                }
            }).catch(function(error) {
                console.log(error);
            });

    });

  }


});
