/*IndexController.prototype.filterRestaurants = function(filterLocation, filterCuisine, filterRating) {

	var restaurantsEl = document.getElementById('restaurants');
	restaurantsEl.setAttribute('aria-busy', 'true');

	fetch('./data/restaurants.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		return Index._filter(response.restaurants, filterLocation, filterCuisine, filterRating);
	})
	.then(function(response) {

		restaurantsEl.removeAttribute('aria-busy');

		if ( response.restaurants.length == 0 ) {
			restaurantsEl.innerHTML = "Sorry, we couldn't find any restaurants matching that criteria";
			return;
		}

		restaurantsEl.innerHTML = MyApp.templates.restaurantSnippet(response);
	});
};
*/


$(document).ready(function  () {
  fetch('./assets/data/restaurants.json')
    .then(function(response){
      return response.json();
    }).catch(function(error){
      return error;
    }).then(function(restaurantData){
      console.log(restaurantData);
      restaurantData.restaurants.forEach(function(restaurant){
        var stars = 0;
        restaurant.reviews.forEach(function(review){
          stars += parseInt(review.stars);
        });
        restaurant.rating = stars/(restaurant.reviews.length);
      });
      //Get the HTML from the template   in the script tag​
       var theTemplateScript = $("#restaurant-card-template").html();

      //Compile the template​
       var theTemplate = Handlebars.compile (theTemplateScript);

       $(".restaurant-list").append (theTemplate(restaurantData.restaurants));
   // The function will insert all the values from the objects in their respective places in the HTML and returned HTML as a string. Then we use jQuery to append the resulting HTML string into the page​

 }).catch(function(error){
   console.log(error);
 });


   });
