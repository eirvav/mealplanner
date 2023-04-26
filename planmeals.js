

$.getJSON("https://gist.githubusercontent.com/isakmd/a5cfc2f513dfc58b4546310d66ad4b3b/raw/b0b6935a143b6484f31d3c8207d539af664141dc/mealplans.json", function (result) {
    console.log(result)
    titlemeal = document.getElementsByClassName("card-title")
    calories = document.getElementsByClassName("card-calories")
    for (i = 0; i < 2; i++) {
        titlemeal[i].innerHTML = result.Vegan.Breakfast[i].Meal
        calories[i].innerHTML = result.Vegan.Lunch[i].Nutrition.Calories + " Calories";

    }
})


