$(document).ready(function () {

    var mealType
    var display
    var q
    var dishType
    var queryURL
    var cuisineType
    var dietLabels
    var health = ""

    // Creates AJAX call for the recipes
    function recipeCall() {
        console.log("recipe call called")
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
        displayRecipes(10)
    });

    $("#seeLess").on("click", function () {
        $(this).hide()
        $("#seeMore").show()
        displayRecipes(6)
    });

    //The page loads to display 4 or 12 popular breakfast lunch or dinner foods depending on the time and buttons pressed
    function displayRecipes(num) {
        $(".columns").empty();
        for (var i = 0; i < num; i++) {
            var recipes = JSON.stringify(display.hits[i].recipe.label);
            var imgSrc = JSON.stringify(display.hits[i].recipe.image);
            var link = JSON.stringify(display.hits[i].recipe.url);

            $('.columns').append(`<div class="column is-full-mobile is-one-quarter-desktop">
        <!--Img-->
             <img class="recipeImg" src= ${imgSrc}>
         <!--text row-->
             <h2 class="recipeLabel has-text-weight-semibold is-uppercase has-text-danger has-text-centered">${recipes} </h2>
        <!--button row-->     
            <a class="buttons has-addons is-centered" href= ${link} target="_blank">
            <button class="popUp button is-warning is-light"> View Recipe </button>
            </a>`);
            }
        $("#seeMore").removeClass('is-hidden')
        $("#seeMore").show()
        $("#seeLess").hide()
    }



    // build Query URL by checking for form inputs
    //find q
    $("#submit").click(function findQ() {
        //check for q
        if ($("#search").val() === "") {
            $("#searchError").html("*This feild is required.");
        } else {
            q = $("#search").val()
            findMealType()
        }
    });

    //find meal
    function findMealType() {
        mealType = $("#mealType").find("option:selected").val();
        findDish();
    }

    //find dishType
    function findDish() {
        dishType = $("#dishType").find("option:selected").val();
        findCuisine();
    }

    //find cuisineType
    function findCuisine() {
        cuisineType = $("#cuisineType").find("option:selected").val();
        findHealth();
    }

    function findHealth(){
        checkedArr = $( "input:checked" );
        if($( checkedArr.length) ){
            for(i=0;i<checkedArr.length;i++){
                health += checkedArr[i].name + "+"
            }
            //"Tree-Nut-Free+Kosher+Vegan+"
        }
        
        findDiet();
        //checkedArr[0].name
    }

    //find healthLabels
    function findDiet() {
        dietLabels = $("#dietLabels").find("option:selected").val();
        buildQuery();
    }

    //build query url based on form inputs
    function buildQuery() {
        queryURL = "https://api.edamam.com/search?q=" + q + "&app_id=$%7B12fc1523%7D&app_key=$%7B97aee21b6757a0b5b1eade0f194a5c24%7D"
        if (mealType === "null") {
            queryURL = queryURL
            recipeCall()
        }
        if (mealType !== "null") {
            queryURL = queryURL + "&mealType=" + mealType
            recipeCall()
        }
        if (dishType === "null") {
            queryURL = queryURL
            recipeCall()
        }
        if (dishType !== "null") {
            queryURL = queryURL + "&dishType=" + dishType
            console.log(dishType)
            recipeCall()
        }
        if (cuisineType === "null") {
            queryURL = queryURL
            recipeCall()
        }
        if (cuisineType !== "null") {
            queryURL = queryURL + "&cuisineType=" + cuisineType
            console.log(cuisineType)
            recipeCall()
        }
        if (dietLabels === "null") {
            queryURL = queryURL
            recipeCall()
        }
        if (dietLabels !== "null") {
            queryURL = queryURL + "&dietLabels=" + dietLabels
            recipeCall()
        }
        if (health){
            queryURL = queryURL + "&healthLabels=" + health;
            //queryURL += "&health=" + health
            recipeCall()
        }

        console.log(queryURL)
    }

});