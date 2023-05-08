//Hides the meal selector before it displayed after "submit"
window.onload = function () {
  let hideresult = document.getElementById("mealplan-container");
  hideresult.style.visibility = "hidden";
};

document.querySelectorAll(".kort").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Remove the card-selected class from any previously selected card
    document.querySelectorAll(".card-selected").forEach((selectedCard) => {
      selectedCard.classList.remove("card-selected");
      selectedCard.style.backgroundColor = "";
      selectedCard.querySelector("p").style.color = "";
    });

    // Add the card-selected class to the clicked card
    e.currentTarget.classList.add("card-selected");
    e.currentTarget.style.backgroundColor = "#77C14B";
    e.currentTarget.querySelector("p").style.color = "#ffffff";
  });
});

// Set the "All" option as the default selected card on page load
document.addEventListener("DOMContentLoaded", function () {
  const allOptionCard = document.querySelector(".card[data-meal-type='All']");
  if (allOptionCard) {
    allOptionCard.classList.add("card-selected");
  }
});

var arrayRandom = [];

document
  .getElementById("meal-planner-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the selected meal type
    const selectedMealTypeCard = document.querySelector(".card-selected");
    const mealType = selectedMealTypeCard
      ? selectedMealTypeCard.querySelector("p").textContent
      : null;

    // Get the number of meals per day

    // Get the daily calorie intake

    // Log the values (you can replace this with your desired logic)
    // console.log("Meal Type:", mealType);
    // console.log("Number of Meals per Day:", numMeals);
    // console.log("Daily Calorie Intake:", dailyCalories);

    // GET THE JSON FOR WEB AND STARTS FUNCTION WITH ALL THE NESSESERY VARIABLES
    $.getJSON(
      "https://gist.githubusercontent.com/isakmd/9df9d3998ff0b5d2a13a5b6e92bb371c/raw/07ff585658989ebf9a3ba5b167bf32f7646c0f2c/gistfile1.json",
      function (result) {
        console.log(result);
        console.log(mealType);
        // Displays the hidden content
        let showresult = document.getElementById("mealplan-container");
        showresult.style.visibility = "visible";
        var randomDish1 = Math.floor(Math.random() * 4);
        var randomDish2 = Math.floor(Math.random() * 4);
        while (randomDish1 == randomDish2) {
          randomDish2 = Math.floor(Math.random() * 4);
        }
        arrayRandom = [];
        arrayRandom.push(randomDish1);
        arrayRandom.push(randomDish2);
        console.log(randomDish1);
        console.log(randomDish2);
        getBreakfast(result, mealType, randomDish1, randomDish2);
        getLunch(result, mealType, randomDish1, randomDish2);
        getDinner(result, mealType, randomDish1, randomDish2);
      }
    );
  });
//
// MEAL OPTIONS
//

function getBreakfast(result, mealType, randomDish1, randomDish2) {
  console.log(mealType);
  titlemeal = document.getElementsByClassName("title-meal-breakfast");
  calories = document.getElementsByClassName("calories-breakfast");
  imgchange = document.getElementsByClassName("img-breakfast");
  imgchange[0].src = result[mealType].Breakfast[randomDish1].Img;
  titlemeal[0].innerHTML = result[mealType].Breakfast[randomDish1].Meal;
  calories[0].innerHTML =
    result[mealType].Breakfast[randomDish1].Nutrition.Calories +
    " Calories | " +
    result[mealType].Breakfast[randomDish1].Nutrition.Protein +
    " Protein | " +
    result[mealType].Breakfast[randomDish1].Nutrition.Fat +
    " Fat";
  imgchange[1].src = result[mealType].Breakfast[randomDish2].Img;
  titlemeal[1].innerHTML = result[mealType].Breakfast[randomDish2].Meal;
  calories[1].innerHTML =
    result[mealType].Breakfast[randomDish2].Nutrition.Calories +
    " Calories | " +
    result[mealType].Breakfast[randomDish2].Nutrition.Protein +
    " Protein | " +
    result[mealType].Breakfast[randomDish2].Nutrition.Fat +
    " Fat";
}

function getLunch(result, mealType, randomDish1, randomDish2) {
  titlemeal = document.getElementsByClassName("title-meal-lunch");
  calories = document.getElementsByClassName("calories-lunch");
  imgchange = document.getElementsByClassName("img-lunch");

  imgchange[0].src = result[mealType].Lunch[randomDish1].Img;
  titlemeal[0].innerHTML = result[mealType].Lunch[randomDish1].Meal;
  calories[0].innerHTML =
    result[mealType].Lunch[randomDish1].Nutrition.Calories +
    " Calories | " +
    result[mealType].Lunch[randomDish1].Nutrition.Protein +
    " Protein | " +
    result[mealType].Lunch[randomDish1].Nutrition.Fat +
    " Fat";
  imgchange[1].src = result[mealType].Lunch[randomDish2].Img;
  titlemeal[1].innerHTML = result[mealType].Lunch[randomDish2].Meal;
  calories[1].innerHTML =
    result[mealType].Lunch[randomDish2].Nutrition.Calories +
    " Calories | " +
    result[mealType].Lunch[randomDish2].Nutrition.Protein +
    " Protein | " +
    result[mealType].Lunch[randomDish2].Nutrition.Fat +
    " Fat";
}

function getDinner(result, mealType, randomDish1, randomDish2) {
  titlemeal = document.getElementsByClassName("title-meal-dinner");
  calories = document.getElementsByClassName("calories-dinner");
  imgchange = document.getElementsByClassName("img-dinner");
  imgchange[0].src = result[mealType].Dinner[randomDish1].Img;
  titlemeal[0].innerHTML = result[mealType].Dinner[randomDish1].Meal;
  calories[0].innerHTML =
    result[mealType].Dinner[randomDish1].Nutrition.Calories +
    " Calories | " +
    result[mealType].Dinner[randomDish1].Nutrition.Protein +
    " Protein | " +
    result[mealType].Dinner[randomDish1].Nutrition.Fat +
    " Fat";
  imgchange[1].src = result[mealType].Dinner[randomDish2].Img;
  titlemeal[1].innerHTML = result[mealType].Dinner[randomDish2].Meal;
  calories[1].innerHTML =
    result[mealType].Dinner[randomDish2].Nutrition.Calories +
    " Calories | " +
    result[mealType].Dinner[randomDish2].Nutrition.Protein +
    " Protein | " +
    result[mealType].Dinner[randomDish2].Nutrition.Fat +
    " Fat";
}

// ADD MEALS TO RIGHT SIDE
var ingredientArray = [];
var finishedMealsArray = [];

function clickMeal(btnNumber, mealday, mealType) {
  const selectedMealTypeCard = document.querySelector(".card-selected");
  mealType = selectedMealTypeCard
    ? selectedMealTypeCard.querySelector("p").textContent
    : null;
  console.log(finishedMealsArray);

  $.getJSON(
    "https://gist.githubusercontent.com/isakmd/9df9d3998ff0b5d2a13a5b6e92bb371c/raw/07ff585658989ebf9a3ba5b167bf32f7646c0f2c/gistfile1.json",
    function (result) {
      if (mealday == "Lunch") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";
        if (btnNumber == 0) {
          newDiv.innerHTML = result[mealType].Lunch[arrayRandom[0]].Meal + "\n";
          finishedMealsArray.push(result[mealType].Lunch[arrayRandom[0]].Meal);
          for (
            var i = 0;
            i < result[mealType].Lunch[arrayRandom[0]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Lunch[arrayRandom[0]].Ingredients[i]
            );
          }
        } else if (btnNumber == 1) {
          newDiv.innerHTML = result[mealType].Lunch[arrayRandom[1]].Meal + "\n";
          finishedMealsArray.push(result[mealType].Lunch[arrayRandom[1]].Meal);
          for (
            var i = 0;
            i < result[mealType].Lunch[arrayRandom[1]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Lunch[arrayRandom[1]].Ingredients[i]
            );
          }
        }
        ingredients();
        document.getElementById("selected-meals").appendChild(newDiv);
      } else if (mealday == "Breakfast") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";

        if (btnNumber == 0) {
          newDiv.innerHTML =
            result[mealType].Breakfast[arrayRandom[0]].Meal + "\n";
          finishedMealsArray.push(
            result[mealType].Breakfast[arrayRandom[0]].Meal
          );
          for (
            var i = 0;
            i < result[mealType].Breakfast[arrayRandom[0]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Breakfast[arrayRandom[0]].Ingredients[i]
            );
          }
        } else if (btnNumber == 1) {
          newDiv.innerHTML =
            result[mealType].Breakfast[arrayRandom[1]].Meal + "\n";
          finishedMealsArray.push(
            result[mealType].Breakfast[arrayRandom[1]].Meal
          );
          for (
            var i = 0;
            i < result[mealType].Breakfast[arrayRandom[1]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Breakfast[arrayRandom[1]].Ingredients[i]
            );
          }
        }
        ingredients();
        document.getElementById("selected-meals").appendChild(newDiv);
      } else if (mealday == "Dinner") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";

        if (btnNumber == 0) {
          newDiv.innerHTML =
            result[mealType].Dinner[arrayRandom[0]].Meal + "\n";
          finishedMealsArray.push(result[mealType].Dinner[arrayRandom[0]].Meal);
          for (
            var i = 0;
            i < result[mealType].Dinner[arrayRandom[0]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Dinner[arrayRandom[0]].Ingredients[i]
            );
          }
        } else if (btnNumber == 1) {
          newDiv.innerHTML =
            result[mealType].Dinner[arrayRandom[1]].Meal + "\n";
          finishedMealsArray.push(result[mealType].Dinner[arrayRandom[1]].Meal);
          for (
            var i = 0;
            i < result[mealType].Dinner[arrayRandom[1]].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result[mealType].Dinner[arrayRandom[1]].Ingredients[i]
            );
          }
        }
        ingredients();
        document.getElementById("selected-meals").appendChild(newDiv);
      }
    }
  );
}

function ingredients() {
  sortedArray = [];
  let uniqueArr = ingredientArray.filter((item, index) => {
    return ingredientArray.indexOf(item) === index;
  });

  // Clean the divs so the new list dont stack over old ones
  document.getElementById("ingredients").innerHTML = "";
  for (var i = 0; i < uniqueArr.length; i++) {
    var divNew = document.createElement("div");
    divNew.className = "added-meals";
    divNew.innerHTML = uniqueArr[i];

    // Create a new button element
    var button = document.createElement("button");
    button.innerHTML = "X";

    // Add a class to the button
    button.classList.add("button-style-ingredients");

    // Add an onclick function to the button
    button.onclick = removeitem;

    // Append the button to the new div
    divNew.appendChild(button);

    // Append the new div to the existing container element
    document.getElementById("ingredients").appendChild(divNew);
  }
}

// Define the removeitem() function
function removeitem() {
  // This function will remove the parent div of the clicked button
  this.parentNode.remove();
}

function addToCalendar() {
  localStorage.setItem("meals", JSON.stringify(finishedMealsArray));
}
