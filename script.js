$(document).ready(function () {

    var mealType
    var display

    //moment variables
    var zeroTest = 0
    var nineTime = moment().set("hour", 9).format("H");
    var tenTime = moment().set("hour", 10).format("H");
    var elevenTime = moment().set("hour", 11).format("H");
    var twelveTime = moment().set("hour", 12).format("H");
    var oneTime = moment().set("hour", 13).format("H");
    var twoTime = moment().set("hour", 14).format("H");
    var threeTime = moment().set("hour", 15).format("H");
    var fourTime = moment().set("hour", 16).format("H");
    var fiveTime = moment().set("hour", 17).format("H");
    var sixTime = moment().set("hour", 18).format("H");
    var sevenTime = moment().set("hour", 19).format("H");
    var eightTime = moment().set("hour", 20).format("H");
    var hourNow = moment().format('MMMM Do YYYY, HH:mm:ss a')
    var currentHour = moment().format('H')


    // Creates AJAX call for the recipes
    function recipeCall() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            display = response;
            displayRecipes(4)
        });
    }

    //see more and see less options on main page
    $("#seeMore").on("click", function () {
        $(this).hide()
        $("#seeLess").removeClass('is-hidden')
        $("#seeLess").show()
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            display = response;
            displayRecipes(12)
        });
    });

    $("#seeLess").on("click", function () {
        $(this).hide()
        $("#seeMore").show()
        displayRecipes(4)
    });

    //The page loads to display 4 or 16 popular breakfast lunch or dinner foods depending on the time and buttons pressed
    function displayRecipes(num) {
        $(".columns").empty();
        for (var i = 0; i < num; i++) {
            var recipes = JSON.stringify(display.hits[i].recipe.label);
            var imgSrc = JSON.stringify(display.hits[i].recipe.image);
            var link = JSON.stringify(display.hits[i].recipe.url);


            if (mealType === "breakfast") {

                $('.columns').append(`<div class="column is-one-quarter-desktop is-full-mobile has-addons-centered" data-attr="breakfast">
        <!--Img-->
             <img class="recipeImg has-addons-centered" src= ${imgSrc}>
         <!--text row-->
             <h2 class="recipeLabel has-text-weight-semibold is-uppercase has-text-danger has-text-centered">${recipes} </h2>
        <!--button row-->     
            <a class="buttons has-addons is-centered" href= ${link} target="_blank">
            <button class="popUp button is-warning is-light"> View Recipe </button>
            </a>`);


            } else if (mealType === "lunch") {
                $('.columns').append(`<div class="column is-one-quarter-desktop is-full-mobile" data-attr="lunch">
        <!--Img-->
             <img class="recipeImg" src= ${imgSrc}>
         <!--text row-->
             <h2 class="recipeLabel has-text-weight-semibold is-uppercase has-text-danger has-text-centered">${recipes} </h2>
        <!--button row-->     
            <a class="buttons has-addons is-centered" href= ${link} target="_blank">
            <button class="popUp button is-warning is-light"> View Recipe </button>
            </a>`);

            } else {
                $('.columns').append(`<div class="column is-one-quarter-desktop is-full-mobile" data-attr={"dinner"}>
        <!--Img-->
             <img class="recipeImg" src= ${imgSrc}>
         <!--text row-->
             <h2 class="recipeLabel has-text-weight-semibold is-uppercase has-text-danger has-text-centered">${recipes} </h2>
        <!--button row-->     
            <a class="buttons has-addons is-centered" href= ${link} target="_blank">
            <button class="popUp button is-warning is-light"> View Recipe </button>
            </a>`);
            }
        }
    }

    // use moment.js to determine which mealType is default displayed-->
    if (currentHour > 0 && currentHour < 11) {
        $(".subtitle").text("It's breakfast time! Click the buttons below for more options.")
        mealType = "breakfast"
        queryURL = "https://api.edamam.com/search?q=breakfast&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&mealType=" + mealType;
        recipeCall();
    } else if (currentHour >= 11 && currentHour < 16) {
        $(".subtitle").text("It's lunch time! Click the buttons below for more options.");
        mealType = "lunch"
        queryURL = "https://api.edamam.com/search?q=lunch&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&excluded=crudites&excluded=sack&excluded=picnic&excluded=Chipped&mealType=" + mealType;
        recipeCall();
    } else {
        $(".subtitle").text("It's dinner time! Click the buttons below for more options.");
        mealType = "dinner"
        queryURL = "https://api.edamam.com/search?q=dinner&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&excluded=rolls&excluded=cream&excluded=pancakes&mealType=" + mealType;
        recipeCall();
    }

    //I have the choice to switch from breakfast lunch dinner or snack manually and the default display will change to reflect my choice
    // add event listeners to change the defaul mealType to new mealType when button is clicked-->
    $("#breakfastBox").click(function () {
        $(".subtitle").text("It's breakfast time! Click the buttons below for more options.")
        mealType = "breakfast"
        queryURL = "https://api.edamam.com/search?q=breakfast&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&mealType=" + mealType;
        recipeCall();
    })


    $("#lunchBox").click(function () {
        $(".subtitle").text("It's lunch time! Click the buttons below for more options.");
        mealType = "lunch"
        queryURL = "https://api.edamam.com/search?q=lunch&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&excluded=crudites&excluded=sack&excluded=picnic&excluded=Chipped&mealType=" + mealType;
        recipeCall();
    })


    $("#dinnerBox").click(function () {
        $(".subtitle").text("It's dinner time! Click the buttons below for more options.");
        mealType = "dinner"
        queryURL = "https://api.edamam.com/search?q=dinner&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D&excluded=rolls&excluded=cream&excluded=pancakes&mealType=" + mealType;
        recipeCall();
    })

    // If one of the recipes looks good I can click the picture to see more details

    // add event listener to open the recipe card pop up within the display recipe function-->

});