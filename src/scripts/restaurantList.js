
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